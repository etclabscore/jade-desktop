import React, { useState, useEffect } from "react";
import { AppBar, Typography, CssBaseline, Grid, Toolbar, IconButton, Card, CardContent, Chip, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"; //tslint:disable-line
import ServiceRunnerClient from "@etclabscore/jade-service-runner-client";
import useDarkMode from "use-dark-mode";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import { ThemeProvider } from "@material-ui/styles";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Stop from "@material-ui/icons/Stop";
import Unarchive from "@material-ui/icons/Unarchive";
import { darkTheme, lightTheme } from "./themes/jadeTheme";
import "./App.css";

const App: React.FC = () => {
  const darkMode = useDarkMode();
  const theme = darkMode.value ? darkTheme : lightTheme;
  const [services, setServices] = useState<any[]>([]);
  const [serviceRunnerClient, setServiceRunnerClient] = useState<ServiceRunnerClient>();
  const [runningServices, setRunningServices] = useState<any[]>([]);
  const [installedServices, setInstalledServices] = useState<any[]>([]);
  useEffect(() => {
    setServiceRunnerClient(new ServiceRunnerClient({
      transport: {
        type: "http",
        host: "localhost",
        port: 8002,
      },
    }));
  }, []);
  useEffect(() => {
    if (serviceRunnerClient) {
      serviceRunnerClient.listServices("all").then(setServices);
    }
  }, [serviceRunnerClient]);

  useEffect(() => {
    if (serviceRunnerClient) {
      serviceRunnerClient.listRunningServices().then(setRunningServices);
    }
  }, [services]);
  useEffect(() => {
    if (serviceRunnerClient) {
      serviceRunnerClient.listInstalledServices().then(setInstalledServices);
    }
  }, [services]);
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
        <div>
          {services.map((service) => {
            return (
              <Card>
                <CardContent>
                  <Typography variant="h6">{service.name}</Typography>
                  <Chip label={service.version} />
                  <Chip label={service.state} />
                  {service.environments.length > 0 && <h2>Environments</h2>}
                  <List component="nav" aria-label="main list services">
                    {service.environments.map((e: any) => {
                      const runningService = runningServices.find((s) => s.name === service.name && s.env === e);
                      return (
                        <ListItem button>
                          <ListItemText primary={e} />
                          <ListItemIcon>
                            <>
                              {
                                runningService
                                  ? <Stop />
                                  : <PlayArrow />
                              }
                            </>
                          </ListItemIcon>
                        </ListItem>
                      );
                    })}
                  </List>
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
