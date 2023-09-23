document.addEventListener("DOMContentLoaded", () => {
  const taxForm = document.getElementById("taxForm");
  const resultsDiv = document.getElementById("results");

  const taxBrackets = {
    5550: 0,
    12450: 19,
    20200: 24,
    35200: 30,
    60000: 37,
    999999: 45,
  };

  taxForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const grossSalary = parseFloat(document.getElementById("grossSalary").value);
    let previousBracket = 0;
    let totalTax = 0;

    for (const [bracket, rate] of Object.entries(taxBrackets)) {
      const taxableAmount = Math.min(grossSalary, parseFloat(bracket)) - previousBracket;
      if (taxableAmount > 0) {
        const tax = (taxableAmount * rate) / 100;
        totalTax += tax;
      }
      previousBracket = parseFloat(bracket);
    }

    const netAnnual = grossSalary - totalTax;
    const netMonthly = netAnnual / 12;

    resultsDiv.innerHTML = `
      <p>Total annual tax: ${totalTax.toFixed(2)} at an equivalent rate of ${(totalTax / grossSalary * 100).toFixed(2)}%</p>
      <p>Net annual income: ${netAnnual.toFixed(2)}</p>
      <p>Net monthly income: ${netMonthly.toFixed(2)}</p>
    `;
  });
});
