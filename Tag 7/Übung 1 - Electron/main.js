const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const puppeteer = require('puppeteer');

let window;

let menu = [
  {
    label: 'My App',
    submenu: [
      { label: 'DevTools', role: 'toggleDevTools' },
      { label: 'Refesh', role: 'reload' },
      {
        label: 'News',
        click: () => {
          shell.openExternal('http://www.orf.at');
        },
      },
      {
        label: 'Applikation beenden',
        click: () => {
          app.quit();
        },
      },
    ],
  },
];

const startApp = () => {
  console.log('Electron wurde gestartet.');
  window = new BrowserWindow({
    width: 1024,
    height: 768,
    resizable: true,
    movable: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
    },
    x: 2000,
    y: 100,
  });
  window.loadFile('index.html');
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
};

app.on('ready', startApp);

//- MacOS
app.on('active', () => {
  if (window === null) {
    starteApplikattion();
  }
});

app.on('window-all-closed', () => {
  app.quit();
});
//+ MacOS

ipcMain.on('newsItems', async (event) => {
  let newsItems;

  const asyncFn = async () => {
    const url = 'https://orf.at/';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    newsItems = await page.$$eval('h3', (stories) =>
      stories.map((headline) => headline.innerText),
    );

    console.log(newsItems);
  };

  await asyncFn();
  event.reply('newsItems', newsItems);
});
