import { app, ipcMain } from 'electron';
import ElectronApp from 'electron-app';

const electronApp = new ElectronApp(app);
console.log("Instantiated electron app.");

ipcMain.on("ipc-saga", (event, payload) => {
  switch(payload.command) {
    case "QUIT_APP": {
      app.quit();
      break;
    }
    case "PING": {
      console.log(payload);
      event.sender.send('ipc-saga', { message: "PONG" });
      break;
    }
    default: {
      console.log(payload);
      break;
    }
  }
});
