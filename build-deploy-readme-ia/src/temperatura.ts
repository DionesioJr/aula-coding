// Gerado pela IA: "converta Celsius para Fahrenheit"
function paraFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

console.assert(paraFahrenheit(0) === 32, "0 °C");
console.assert(paraFahrenheit(100) === 212, "100 °C");
console.assert(paraFahrenheit(-40) === -40, "-40 °C");

function paraCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

console.assert(paraCelsius(32) === 0, "32 °F");
console.assert(paraCelsius(212) === 100, "212 °F");
console.assert(paraCelsius(-40) === -40, "-40 °F");
