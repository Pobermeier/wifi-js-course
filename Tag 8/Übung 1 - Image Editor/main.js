const { BrowserView } = require('electron');

const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  screen,
  dialog,
} = require('electron');

const fs = require('fs');

let meinFenster;

let starteApplikation = () => {
  console.log('ImageEditor wurde gestartet.');

  var allDisplays = screen.getAllDisplays();
  var { width, height } = allDisplays[1].workAreaSize;

  meinFenster = new BrowserWindow({
    width: Math.round(width * 0.9),
    height: Math.round(height * 0.9),
    resizable: true,
    movable: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
    },
    x: width * 1.05, // value berechnen
    y: height * 0.05,
    icon: __dirname + '/assets/icon.png',
  });
  meinFenster.loadFile('view/index.html');

  //Menu.setApplicationMenu( Menu.buildFromTemplate( meinMenu ));
};

app.on('ready', starteApplikation);

ipcMain.on('openfile', (event) => {
  dialog
    .showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'images', extensions: ['jpg', 'jpeg'] }],
    })
    .then((file) => {
      if (!file.canceled) {
        event.reply('filestoopen', file.filePaths);
      }
    });
});

ipcMain.on('savefile', (event, filedata) => {
  dialog.showSaveDialog({}).then((file) => {
    console.log(file);
    fs.writeFile(file.filePath, filedata, () => {});
  });
});
