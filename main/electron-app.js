import { BrowserWindow } from 'electron';
import installDevTools from 'install-dev-tools';
import resolveIndexUrl from 'resolve-index-url';
import ApplicationMenu from 'application-menu';
import leftmostBounds from 'leftmost-bounds';

export default class ElectronApp {
  constructor(app) {
    console.log("Starting ElectronApp...");
    this.app = app;
    this.mainWindow = null;

    if(__DEV__) {
      this.app.on('ready', installDevTools);
    }

    this.menu = new ApplicationMenu(app);
    this.menu.on('load-tileset', () => this.loadTileset());
    this.menu.on('load-tilemap', () => this.loadTilemap());
    this.menu.on('toggle-devtools', () => this.toggleDevtools());

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
        ...leftmostBounds(),
        width: 608,
        height: 608,
        resizable: false,
        useContentSize: true,
        scrollBounce: false,
      });

      this.mainWindow.loadURL(resolveIndexUrl());

      if(__DEV__) {
        this.mainWindow.webContents.openDevTools();
      }

      this.mainWindow.on('closed', () => this.onMainWindowClosed());
    }
  }

  loadTileset() {
    console.log("Loading tileset...");
  }
  loadTilemap() {
  }
  toggleDevtools() {
  }
}
