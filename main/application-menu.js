import { Menu, app } from 'electron';
import EventEmitter from 'events';

class ApplicationMenu extends EventEmitter {
  constructor(app) {
    super();
    this.app = app;

    this.app.on('ready', () => this.attachApplicationMenu());
  }

  attachApplicationMenu() {
    if (process.platform === 'darwin') {
      Menu.setApplicationMenu(this.getOsxMenu());
    }
  }

  getOsxMenu(appName) {
    return Menu.buildFromTemplate(osxTemplate(this.emit));
  }
}

const osxTemplate = (emitter, appName) => ([
  { label: app.getName(), submenu: [
    { role: "about" },
    { type: "separator" },
    { role: "quit" }
  ]},
  { label: "Debug", submenu: [
    { label: "Load Tileset", accelerator: "Command+Shift+L", click: () => emitter('load-tileset') },
    { label: "Load Tilemap", accelerator: "Command+Shift+T", click: () => emitter('load-tilemap') },
    { label: "Toggle Developer Tools", accelerator: "Command+Shift+I", click: () => emitter('toggle-devtools') },
  ]}
]);

export default ApplicationMenu;
