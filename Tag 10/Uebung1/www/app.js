(function () {
  const state = {
    currentColor: 0,
    availColors: ['red', 'green', 'blue', 'yellow'],
  };

  if (APP) {
    document.addEventListener('deviceready', init);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  function init() {
    const imageEditor = document.getElementById('image-editor');
    const ctx = imageEditor.getContext('2d');
    const selectedColor = document.getElementById('current-color');

    selectedColor.style.backgroundColor = state.availColors[state.currentColor];

    selectedColor.addEventListener('click', () => {
      const nextColor =
        state.currentColor < state.availColors.length - 1
          ? state.availColors[++state.currentColor]
          : resetColor();
      selectedColor.style.backgroundColor = nextColor;
    });

    imageEditor.addEventListener('touchstart', (e) => {
      console.log(e);
      paintDot(e.touches[0].clientX, e.touches[0].clientY);
    });

    function resetColor() {
      state.currentColor = 0;
      return state.availColors[state.currentColor];
    }

    function paintDot(x, y) {
      ctx.fillStyle = state.availColors[state.currentColor];
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
})();
