const { ipcRenderer } = require('electron');

$('#menu').dialog();

let activeContext = null;
let img = null;

$('#openfile').on('click', function (e) {
  e.preventDefault();
  ipcRenderer.send('openfile');
});

$('#savefile').on('click', function (e) {
  e.preventDefault();
  ipcRenderer.send('savefile', $('canvas').get(0).toDataURL());
});

$('#flip-horizontal').on('click', function (e) {
  e.preventDefault();

  if (activeContext && img) {
    drawImage(activeContext, img, 0, 0, img.width, img.height, 0, true);
  }
});

$('#flip-vertical').on('click', function (e) {
  e.preventDefault();

  if (activeContext && img) {
    drawImage(activeContext, img, 0, 0, img.width, img.height, 0, false, true);
  }
});

$('#rotate-left').on('click', function (e) {
  e.preventDefault();

  if (activeContext && img) {
    drawImage(activeContext, img, 0, 0, img.width, img.height, 90);
  }
});

$('#rotate-right').on('click', function (e) {
  e.preventDefault();
  if (activeContext && img) {
    drawImage(activeContext, img, 0, 0, img.width, img.height, -90);
  }
});

ipcRenderer.on('filestoopen', (event, files) => {
  console.log('file?', files[0]);

  // lade Image
  img = new Image();
  img.src = files[0];
  img.onload = function () {
    const canvas = $('<canvas>')
      .attr({
        width: img.width,
        height: img.height,
      })
      .css({
        width: '100%',
        height: 'auto',
        maxWidth: img.width,
        maxHeight: img.height,
      });

    $('<div>')
      .append(canvas)
      .appendTo('body')
      .dialog({
        width: img.width,
        height: img.height + 100,
      });

    const ctx = canvas.get(0).getContext('2d');

    drawImage(ctx, img, 0, 0);

    activeContext = ctx;
  };
});

function drawImage(context, img, x, y, width, height, deg, flip, flop, center) {
  context.save();

  if (typeof width === 'undefined') width = img.width;
  if (typeof height === 'undefined') height = img.height;
  if (typeof center === 'undefined') center = false;

  // Set rotation point to center of image, instead of top/left
  if (center) {
    x -= width / 2;
    y -= height / 2;
  }

  // Set the origin to the center of the image
  context.translate(x + width / 2, y + height / 2);

  // Rotate the canvas around the origin
  var rad = 2 * Math.PI - (deg * Math.PI) / 180;
  context.rotate(rad);

  // Flip/flop the canvas
  if (flip) flipScale = -1;
  else flipScale = 1;
  if (flop) flopScale = -1;
  else flopScale = 1;
  context.scale(flipScale, flopScale);

  // Draw the image
  context.drawImage(img, -width / 2, -height / 2, width, height);

  context.restore();
}
