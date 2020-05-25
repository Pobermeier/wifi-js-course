$.fn.letterAnimation = function (options) {
  const settings = $.extend(
    {
      duration: 300,
      delay: 100,
      easing: 'linear',
    },
    options,
  );

  const wrapInSpans = (text) =>
    text.replaceWith(text.text().replace(/(\S)/g, '<span>$1</span>'));

  const targets = this;
  const targetsTxt = targets.contents();

  targetsTxt.each(function () {
    const text = $(this);
    if (this.nodeType === 3) {
      wrapInSpans(text);
    }
  });
  return this.each(function () {
    const len = targets.children().length;
    targets.css('opacity', 1);
    for (let i = 0; i < len; i++) {
      targets
        .children('span:eq(' + i + ')')
        .delay(settings.delay * i)
        .animate(
          {
            opacity: 1,
            top: 0,
            left: 0,
          },
          settings.duration,
          settings.easing,
        );
    }
  });
};
