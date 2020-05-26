QUnit.test('mein erster Test', function (assert) {
  assert.ok(1 == '1', 'Vergleich value, Datentyp egal');
  assert.equal(testX, 5, 'Wert in Variable wurde gesetzt');
});

// Funktion um zwei Zahlen zu addieren
QUnit.test('Zahlen addieren', function (assert) {
  assert.ok(typeof addieren == 'function', 'Existiert Funktion addieren');
  assert.equal(addieren(1, 2), 3, 'Zahlen addieren mit 1 und 3');
  assert.equal(addieren(1), 1, 'Funktion wird nur mit einem Wert aufgerufen');
  assert.ok(
    isNaN(addieren(1, 'a')),
    'addieren von Strings nicht möglich, liefert NaN',
  );
  assert.equal(addieren(1, '2'), 3, 'Typumwandlung innerhalb der Funktion');
  assert.equal(addieren(1, '2,1'), 3.1, 'Komma auch als , erlauben');
  /*....*/
});
