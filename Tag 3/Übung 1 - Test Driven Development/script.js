var testX = 5;

/* addieren */
// function addieren(num1, num2) {
//   if (!num2) return parseFloat(num1.toString().replace(',', '.'));
//   return (
//     parseFloat(num1.toString().replace(',', '.')) +
//     parseFloat(num2.toString().replace(',', '.'))
//   );
// }

function addieren(num1, num2) {
  if (!num2) return +num1.toString().replace(',', '.');
  return (
    +num1.toString().replace(',', '.') + +num2.toString().replace(',', '.')
  );
}
