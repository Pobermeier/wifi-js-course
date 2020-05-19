class Clock {
  constructor(context, radius, drawInterval, fillColor, clockHandColor) {
    this.context = context;
    this.radius = radius;
    this.drawInterval = drawInterval;
    this.fillColor = fillColor;
    this.clockHandColor = clockHandColor;
  }

  drawClockInInterval() {
    setInterval(
      () => this.drawClock(this.context, this.radius),
      this.drawInterval,
    );
  }

  drawClock(context, radius) {
    this.drawFace(context, radius);
    this.drawNumbers(context, radius);
    this.drawTime(context, radius);
  }

  drawFace(context, radius) {
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.fillStyle = this.fillColor;
    context.fill();
    context.strokeStyle = this.clockHandColor;
    context.lineWidth = radius * 0.1;
    context.stroke();
    context.beginPath();
    context.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    context.fillStyle = this.clockHandColor;
    context.fill();
  }

  drawNumbers(context, radius) {
    context.font = radius * 0.15 + 'px arial';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    for (let num = 1; num <= 12; num++) {
      const ang = (num * Math.PI) / 6;
      context.rotate(ang);
      context.translate(0, -radius * 0.85);
      context.rotate(-ang);
      context.fillText(num.toString(), 0, 0);
      context.rotate(ang);
      context.translate(0, radius * 0.85);
      context.rotate(-ang);
    }
  }

  drawTime(context, radius) {
    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    hour = hour % 12;
    hour =
      (hour * Math.PI) / 6 +
      (minute * Math.PI) / (6 * 60) +
      (second * Math.PI) / (360 * 60);
    this.drawHand(context, hour, radius * 0.55, radius * 0.07);
    minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
    this.drawHand(context, minute, radius * 0.7, radius * 0.07);
    second = (second * Math.PI) / 30;
    this.drawHand(context, second, radius * 0.85, radius * 0.02, 'red');
  }

  drawHand(context, pos, length, width, color = 'black') {
    context.beginPath();
    context.lineWidth = width;
    context.moveTo(0, 0);
    context.rotate(pos);
    context.lineTo(0, -length);
    context.strokeStyle = color;
    context.stroke();
    context.rotate(-pos);
  }
}

(function App() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const radius = canvas.height / 2;
  context.translate(radius, radius);

  const clock = new Clock(context, radius * 0.9, 100, '#f9f9f9', '#1f1f1f');
  clock.drawClockInInterval();
})();
