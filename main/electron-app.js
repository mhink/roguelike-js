import { BrowserWindow } from 'electron';

const indexUrl = () => {
  if(__DEV__) {
    return process.env.INDEX_URL;
  } else {
    return `file://${__dirname}/index.html`;
  }
};

export default class ElectronApp {
  constructor(app) {
    console.log("Starting ElectronApp...");
    this.app = app;
    this.mainWindow = null;

    this.app.on('ready', () => this.openWindow());
    this.app.on('activate', () => this.openWindow());
    this.app.on('window-all-closed', () => this.onWindowAllClosed());
  }

  onWindowAllClosed () {
    if (process.platform !== 'darwin') {
      this.app.quit()
    }
  }

  onMainWindowClosed () {
    this.mainWindow = null
  }

  openWindow () {
    if(this.mainWindow === null) {
      this.mainWindow = new BrowserWindow({
        width: 1600,
        height: 768
      });

      this.mainWindow.loadURL(indexUrl());
      if(__DEV__) {
        this.mainWindow.webContents.openDevTools();
      }
      this.mainWindow.on('closed', ::this.onMainWindowClosed);
    }
  }
}
