const { app, BrowserWindow, ipcMain } = require('electron');
let window;

let start = () => {
  console.log('Knockout Todo-List running');

  window = new BrowserWindow({
    width: 1024,
    height: 768,

    resizable: true,
    movable: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
    },
  });
  window.menuBarVisible = false;
  window.loadFile('index.html');
};

app.on('ready', start);
