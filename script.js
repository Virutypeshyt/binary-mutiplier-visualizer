function multiply() {
  let a = document.getElementById("num1").value;
  let b = document.getElementById("num2").value;

  if (!/^[01]+$/.test(a) || !/^[01]+$/.test(b)) {
    alert("Enter valid binary numbers!");
    return;
  }

  let stepsDiv = document.getElementById("steps");
  let resultDiv = document.getElementById("result");

  stepsDiv.innerHTML = "";
  resultDiv.innerHTML = "";

  let multiplicand = parseInt(a, 2);
  let result = 0;

  let step = 0;

  for (let i = b.length - 1; i >= 0; i--) {
    let row = document.createElement("div");

    if (b[i] === '1') {
      let partial = multiplicand << step;
      result += partial;

      row.innerHTML = `
        Step ${step + 1}: ${a} × 1 << ${step} = ${partial.toString(2)}
      `;
    } else {
      row.innerHTML = `
        Step ${step + 1}: ${a} × 0 → skipped
      `;
    }

    stepsDiv.appendChild(row);
    step++;
  }

  resultDiv.innerHTML = `
    ${a} × ${b} = ${result.toString(2)}
  `;
}