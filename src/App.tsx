import React, { useState, useEffect } from "react";
import { AppBar, Typography, CssBaseline, Grid, Toolbar, IconButton, Card, CardContent, Chip, List, ListItem, ListItemIcon, ListItemText, CardHeader, Button, CircularProgress, Link } from "@material-ui/core"; //tslint:disable-line
import ServiceRunnerClient from "@etclabscore/jade-service-runner-client";
import useDarkMode from "use-dark-mode";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import { ThemeProvider } from "@material-ui/styles";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import CloudDownload from "@material-ui/icons/CloudDownloadOutlined";
import { darkTheme, lightTheme } from "./themes/jadeTheme";
import useInterval from "@rooks/use-interval";
import "./App.css";

declare var window: Window;
interface Window { //tslint:disable-line
  require: any;
}

const { ipcRenderer } = window.require("electron");

const App: React.FC = () => {
  const darkMode = useDarkMode();
  const theme = darkMode.value ? darkTheme : lightTheme;
  const [services, setServices] = useState<any[]>([]);
  const [serviceRunnerClient, setServiceRunnerClient] = useState<ServiceRunnerClient>();
  const [runningServices, setRunningServices] = useState<any[]>([]);
  const [installedServices, setInstalledServices] = useState<any[]>([]);
  const [downloadingServices, setDownloadingServices] = useState<any[]>([]);

  const handleInstallService = async (name: string, version: string) => {
    setDownloadingServices([...downloadingServices, name]);
    if (serviceRunnerClient) {
      await serviceRunnerClient.installService(name, version);
      setDownloadingServices(downloadingServices);
    }
  };

  useEffect(() => {
    setServiceRunnerClient(new ServiceRunnerClient({
      transport: {
        type: "http",
        host: "localhost",
        port: 8002,
      },
    }));
  }, []);

  useInterval(() => {
    if (serviceRunnerClient) {
      serviceRunnerClient.listServices("available").then(setServices);
      serviceRunnerClient.listServices("running").then(setRunningServices);
      serviceRunnerClient.listServices("installed").then(setInstalledServices);
    }
  }, 1000, true);

  function handleStart(name: string, version: string, env: string) {
    if (serviceRunnerClient) {
      serviceRunnerClient.startService(name, version, env);
    }
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar color="default" elevation={0} position="sticky">
          <Toolbar>
            <Grid container>
              {darkMode.value ?
                <img
                  alt="jade-explorer"
                  height="30"
                  style={{ marginRight: "5px" }}
                  src="https://github.com/etclabscore/jade-media-assets/blob/master/jade-logo-dark/jade-logo-dark%20(PNG)/32x32.png?raw=true" //tslint:disable-line
                />
                :
                <img
                  alt="jade-explorer"
                  height="30"
                  style={{ marginRight: "5px" }}
                  src="https://github.com/etclabscore/jade-media-assets/blob/master/jade-logo-light/jade-logo-light%20(PNG)/32x32.png?raw=true" //tslint:disable-line
                />
              }
              <Typography variant="h6" color="textSecondary">Jade Service Runner</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={darkMode.toggle}>
                {darkMode.value ? <Brightness3Icon /> : <WbSunnyIcon />}
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container justify="space-around" style={{ marginBottom: "-20px" }}>
          <Card style={{ background: "transparent" }}>
            <CardContent>
              <Typography variant="h6">Available</Typography>
              <Typography variant="h3">{services ? services.length : 0}</Typography>
            </CardContent>
          </Card>
          <Card style={{ background: "transparent" }}>
            <CardContent>
              <Typography variant="h6">Installed</Typography>
              <Typography variant="h3">{installedServices ? installedServices.length : 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <div>
          {services.map((service) => {
            const installedService = installedServices.find((s) => {
              return s.name === service.name;
            });
            const downloadingService = downloadingServices.find((s: string) => s === service.name);
            return (
              <Card style={{ background: "transparent" }}>
                <CardContent>
                  <Card style={{ background: "transparent" }}>
                    <CardHeader
                      title={service.name}
                      subheader={
                        installedService
                          ? "installed"
                          : downloadingService
                            ? "installing"
                            : service.state
                      }
                      action={
                        <Grid container direction="column" alignItems="flex-end">
                          <Chip label={service.version} />
                          {
                            downloadingService ?
                              <CircularProgress style={{ marginTop: "5px" }} />
                              :
                              installedService ?
                                null
                                :
                                <IconButton onClick={() => handleInstallService(service.name, service.version)}>
                                  <CloudDownload />
                                </IconButton>
                          }
                        </Grid>
                      }
                    >
                    </CardHeader>
                  </Card>
                  {installedService && <List component="nav" aria-label="main list services">
                    {service.environments.map((e: any) => {
                      const runningService = runningServices.find((s) => {
                        return s.name === service.name && s.environments.includes(e);
                      });
                      return (
                        <ListItem>
                          <ListItemText primary={
                            <Link target="_blank" href={`https://playground.open-rpc.org?schemaUrl=http://localhost:8002/${service.name}/${e}/${service.version}&uiSchema[appBar][ui:splitView]=false&uiSchema[appBar][ui:input]=false&uiSchema[appBar][ui:title]=${e}&uiSchema[appBar][ui:darkMode]=${darkMode.value}`}>{e}</Link> //tslint:disable-line
                          } secondary={ //tslint:disable-line
                            <>
                              {
                                runningService
                                  ? <Typography variant="caption" style={{ display: "block", fontSize: "8px" }}>
                                    {`http://localhost:8002/${service.name}/${e}/${service.version}`}
                                  </Typography>
                                  : null
                              }
                            </>
                          } />
                          <ListItemIcon>
                            <>
                              <Button disabled>
                                {
                                  runningService
                                    ? "Running"
                                    : "Not Running"
                                }
                              </Button>
                              {
                                runningService
                                  ? <Button onClick={() => ipcRenderer.sendSync("service-runner-jsonrpc", {
                                    method: "stopService",
                                    params: [
                                      service.name,
                                      service.version,
                                      e,
                                    ],
                                  })}>Stop</Button>
                                  : <Button onClick={() => handleStart(service.name, service.version, e)}>Start</Button>
                              }
                            </>
                          </ListItemIcon>
                        </ListItem>
                      );
                    })}
                  </List>}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
