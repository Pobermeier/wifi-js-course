//  Non-OOP
const printTime = function () {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

// OOP ES5
// function Clock() {
//   this.stunden = 0;
//   this.minuten = 0;
//   this.sekunden = 0;
// }

// Clock.prototype.actualTime = function () {
//   const date = new Date();
//   this.hours = date.getHours();
//   this.minutes = date.getMinutes();
//   this.seconds = date.getSeconds();
// };

// Clock.prototype.printTime = function () {
//   this.actualTime();
// };

// Vanilla JS
// const div = document.createElement('div');
// div.innerHTML = '10:10:00';
// document.body.appendChild(div);

// jQuery
const div = $('<div>');
div.html('10:10:00');
$('body h1').after(div);
// div.insertAfter($('body h1'));
setInterval(() => {
  div.html(printTime());
}, 100);
