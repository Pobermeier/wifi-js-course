/*
$('#d1'); // document.getElementById("d1")
$('div'); // document.getElementByTagName("div")
*/

/****************************************************************/

// Text rot einfärben
// document.getElementById('h1').style.color = '#f00';
// $('#h1').css('color', '#f00');

/****************************************************************/

// Text rot + kursiv einfärben
// document.getElementById('h1').style.color = '#f00';
// document.getElementById('h1').style.fontStyle = 'italic';
// document.getElementById('h1').innerHTML = 'Neuer Text';

// $('#h1')
//   .css({
//     color: '#f00',
//     fontStyle: 'italic',
//   })
//   .html('Neuer Text');

/****************************************************************/

// mehrere DOM Elemente
// const alle = Array.from(document.getElementsByTagName('h2')); // Array
// console.log(alle);
// for (let i = 0; i < alle.length; i++) {
//   alle[i].style.color = '#f00';
// }

// $('h2').css({ color: '#f00' });

/****************************************************************/

// Ziel: Funktion "makeRed"

// const makeRed = function (jQueryObj) {
//   jQueryObj.css({ color: '#f00' });
// };

// makeRed($('h2')); // kein Plugin

// jQuery-Plugin
// $('h2').makeRed().html('Neuer Inhalt');

// $('.h2').letterAnimation();
// $('.h1').letterAnimation();
$('h2').letterAnimation();
