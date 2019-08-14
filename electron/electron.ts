import { menubar } from "menubar";
import * as path from "path";
import { ipcMain, BrowserWindow } from "electron";

import { startServiceRunner, ConnectionInfo, ServiceRunnerServer } from "@etclabscore/jade-service-runner";

const mb = menubar({
  index: process.env.NODE_ENV === "development"
    ? "http://localhost:3000/index.html"
    : `file://${path.join(__dirname, "../build/index.html")}`,
  browserWindow: {
    webPreferences: {
      nodeIntegration: true,
    },
  }
});

mb.on("ready", () => {
  startServiceRunner(new Set<ConnectionInfo>([{
    host: "localhost",
    port: 8002,
    protocol: "http",
  }]), "./services/").then((sr: ServiceRunnerServer) => {
    ipcMain.on("service-runner-jsonrpc", async (event, arg) => {
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
    console.log("app is ready") //tslint:disable-line
  });
});
