/* Vanilla JS

var meinDiv = document.createElement( 'div' );
meinDiv.innerHTML = '10:10:00';
document.getElementsByTagName( 'body' )[0].appendChild( meinDiv );

*/

// Funktion $(); => jQuery-Objekt und NICHT HTMLNodeElement
// Objekt $.;

// NICHT OOP
/*
var schreibeZeit = function() {
    var stunden, minuten, sekunden;
    var aktuell = new Date();
    stunden = aktuell.getHours();
    minuten = aktuell.getMinutes();
    sekunden = aktuell.getSeconds();
    return stunden+':'+minuten+':'+sekunden
}
*/

var meinDiv = $('<div>');
//$( 'body' ).append( meinDiv );
//meinDiv.appendTo( 'body' );

$('body h1').after(meinDiv);
//meinDiv.insertAfter( 'body h1' );

/*
setInterval(  function() {
    meinDiv.html( schreibeZeit() )
}, 100 );
*/

/* SVG Helper */
$.svg = function (tag) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
};

// OOP ES5
var Uhrzeit = function () {
  //this.aktuell = new Date();
  this.stunden = 0;
  this.minuten = 0;
  this.sekunden = 0;

  this.style = 'analog'; // 'string'

  /*
    this.aktuelleZeit = function() {
        this.aktuell = new Date();
        this.stunden = this.aktuell.getHours();
        this.minuten = this.aktuell.getMinutes();
        this.sekunden = this.aktuell.getSeconds();
    }
    */

  //setInterval( this.ausgabeZeit, 100 ); // wird Funktion von setInterval ausgeführt, Context == window
  setInterval(this.ausgabeZeit.bind(this), 100); // wird Funktion von setInterval ausgeführt, Context == Uhrzeit
  //this.ausgabeZeit(); // Aufruf aus dem Context Uhrzeit
};

Uhrzeit.prototype.aktuelleZeit = function () {
  this.aktuell = new Date();
  this.stunden = this.aktuell.getHours();
  this.minuten = this.aktuell.getMinutes();
  this.sekunden = this.aktuell.getSeconds();
};

Uhrzeit.prototype.ausgabeZeit = function () {
  // this == Context
  //console.log( this );
  this.aktuelleZeit();
  meinDiv.html(this.stunden + ':' + this.minuten + ':' + this.sekunden);

  $('#s').attr({
    transform: 'rotate(' + (this.sekunden * 360) / 60 + ' 100 100)',
  });

  $('#m').attr({
    transform: 'rotate(' + (this.minuten * 360) / 60 + ' 100 100)',
  });

  $('#h').attr({
    transform: 'rotate(' + (this.stunden * 360) / 12 + ' 100 100)',
  });
};

var meineUhrzeit1 = new Uhrzeit();

$('<svg id="clock">').attr({ width: 200, height: 200 }).appendTo('body');

$('#clock')
  .append(
    $($.svg('circle'))
      .attr({ cx: 100, cy: 100, r: 90 })
      .css({ stroke: '#000', strokeWidth: '2px', fill: '#fff' }),
  )
  .append(
    $($.svg('line'))
      .attr({ id: 's', x1: 100, y1: 100, x2: 100, y2: 20 })
      .css({ stroke: '#F00', strokeWidth: '1px' }),
  )
  .append(
    $($.svg('line'))
      .attr({ id: 'm', x1: 100, y1: 100, x2: 100, y2: 35 })
      .css({ stroke: '#000', strokeWidth: '2px' }),
  )
  .append(
    $($.svg('line'))
      .attr({ id: 'h', x1: 100, y1: 100, x2: 100, y2: 50 })
      .css({ stroke: '#000', strokeWidth: '4px' }),
  );
