import { app, ipcMain } from 'electron';
import ElectronApp from 'electron-app';

const electronApp = new ElectronApp(app);
console.log("Instantiated electron app.");

ipcMain.on("debug", (event, arg) => {
  console.log(arg);
  event.sender.send("debug", "hello from the main process!");
});
