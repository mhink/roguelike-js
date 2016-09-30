import { BrowserWindow } from 'electron';
import installDevTools from 'install-dev-tools';
import resolveIndexUrl from 'resolve-index-url';

export default class ElectronApp {
  constructor(app) {
    console.log("Starting ElectronApp...");
    this.app = app;
    this.mainWindow = null;

    if(__DEV__) {
      this.app.on('ready', installDevTools);
    }

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
        width:  600,
        height: 600,
        resizable: false,
      });

      this.mainWindow.loadURL(resolveIndexUrl());

      if(__DEV__) {
        this.mainWindow.webContents.openDevTools();
      }

      this.mainWindow.on('closed', () => this.onMainWindowClosed());
    }
  }
}
