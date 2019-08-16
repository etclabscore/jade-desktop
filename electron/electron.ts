import { menubar } from "menubar";
import * as path from "path";
import { ipcMain } from "electron";
import log from "electron-log";

import { startServiceRunner, ConnectionInfo, ServiceRunnerServer } from "@etclabscore/jade-service-runner";

log.info("Initialized Service Runner UI");

const mb = menubar({
  index: process.env.NODE_ENV === "development"
    ? "http://localhost:3000/index.html"
    : `file://${path.join(__dirname, "../build/index.html")}`,
  browserWindow: {
    webPreferences: {
      nodeIntegration: true,
    },
  },
  icon: path.join(__dirname, "../assets/IconTemplate.png"),
});

mb.on("ready", () => {

  log.info("App Ready");
  startServiceRunner(new Set<ConnectionInfo>([{
    host: "localhost",
    port: 8002,
    protocol: "http",
  }]), path.resolve(mb.app.getPath("home"), ".services")).then((sr: ServiceRunnerServer) => {
    log.debug("Service Runner Server Started", JSON.stringify(sr.config, null, 2));
    ipcMain.on("service-runner-jsonrpc", async (event, arg) => {
      log.debug("service-runner-jsonrpc request", arg);
      switch (arg.method) {
        case "stopService":
          event.returnValue = await sr.serviceManager.stopService(
            arg.params[0],
            arg.params[1],
            arg.params[2],
          );
          break;
        default:
          break;
      }
    });
  }).catch((e) => {
    log.error(e);
  });
});
