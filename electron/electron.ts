import { menubar } from "menubar";
import * as path from "path";

// import { startServiceRunner, ConnectionInfo } from "@etclabscore/jade-service-runner";

const mb = menubar({
  index: process.env.NODE_ENV === "development"
    ? "http://localhost:3000/index.html"
    : `file://${path.join(__dirname, "../build/index.html")}`,
});

mb.on("ready", () => {
  // startServiceRunner(new Set<ConnectionInfo>([{
  //   host: "localhost",
  //   port: 8002,
  //   protocol: "http",
  // }]), "./services/").then(() => {
  //   console.log("app is ready") //tslint:disable-line
  // });
});
