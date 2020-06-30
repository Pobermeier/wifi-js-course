(function () {
  if (APP) {
    document.addEventListener('deviceready', init);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  function init() {
    const imageEditor = document.getElementById('image-editor');
    const ctx = imageEditor.getContext('2d');

    imageEditor.addEventListener('touchstart', (e) => {
      console.log(e);
      paintDot(e.touches[0].clientX, e.touches[0].clientY);
    });

    function paintDot(x, y) {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
})();
