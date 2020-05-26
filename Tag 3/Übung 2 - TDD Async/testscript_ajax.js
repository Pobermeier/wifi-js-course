QUnit.test('Add Numbers On Server', (assert) => {
  assert.notEqual(
    addNumbersOnServer(1, 2, function () {}),
    3,
    'Function is async',
  );

  // const done = assert.async();
  // addNumbersOnServer(1, 2, )
  // addNumbersOnServer(1)
  // addNumbersOnServer(1, 'a'),
  // addNumbersOnServer(1, '2')
  // addNumbersOnServer(1, '2,1')
});
