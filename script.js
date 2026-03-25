let steps = [];
let currentStep = 0;
let a = "", b = "";
let result = 0;
let interval = null;

function loadExample(x, y) {
  document.getElementById("num1").value = x;
  document.getElementById("num2").value = y;
}

function start() {
  a = document.getElementById("num1").value;
  b = document.getElementById("num2").value;

  if (!/^[01]+$/.test(a) || !/^[01]+$/.test(b)) {
    alert("Enter valid binary numbers!");
    return;
  }

  steps = [];
  currentStep = 0;
  result = 0;

  let multiplicand = parseInt(a, 2);
  let shift = 0;

  for (let i = b.length - 1; i >= 0; i--) {
    if (b[i] === '1') {
      let partial = multiplicand << shift;
      result += partial;

      steps.push({
        bit: b[i],
        shift: shift,
        partial: partial.toString(2),
        concept: "Bit is 1 → shift and add",
        explanation: `Bit is 1, shift left by ${shift} and add.`
      });
    } else {
      steps.push({
        bit: b[i],
        shift: shift,
        partial: "0",
        concept: "Bit is 0 → skip",
        explanation: `Bit is 0, so no operation.`
      });
    }
    shift++;
  }

  render();
  updateDecimal();
}

function nextStep() {
  if (currentStep < steps.length) {
    currentStep++;
    render();
  }
}

function autoPlay() {
  if (interval) return;

  interval = setInterval(() => {
    if (currentStep < steps.length) {
      nextStep();
    } else {
      clearInterval(interval);
      interval = null;
    }
  }, 900);
}

function pause() {
  clearInterval(interval);
  interval = null;
}

function resetAll() {
  clearInterval(interval);
  interval = null;

  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";

  steps = [];
  currentStep = 0;
  result = 0;
  a = "";
  b = "";

  document.getElementById("display").innerHTML = "";
  document.getElementById("decimal").innerText = "";
  document.getElementById("info").innerText = "No step yet";
  document.getElementById("conceptText").innerText = "Press Start to begin";
}

function render() {
  let display = document.getElementById("display");
  let info = document.getElementById("info");
  let conceptText = document.getElementById("conceptText");

  display.innerHTML = "";

  display.innerHTML += `<div>${a}</div>`;
  display.innerHTML += `<div>× ${b}</div>`;
  display.innerHTML += `<div>────────</div>`;

  for (let i = 0; i < currentStep; i++) {
    let s = steps[i];
    let spaces = "&nbsp;".repeat(s.shift * 2);
    let cls = (i === currentStep - 1) ? "row active" : "row";

    display.innerHTML += `<div class="${cls}">${spaces}${s.partial}</div>`;
  }

  if (currentStep > 0) {
    let s = steps[currentStep - 1];

    info.innerText = `Bit: ${s.bit}
Shift: ${s.shift}
Partial: ${s.partial}

Why?
${s.explanation}`;

    conceptText.innerText = s.concept;
  }

  if (currentStep === steps.length) {
    display.innerHTML += `<div>────────</div>`;
    display.innerHTML += `<div class="result">${result.toString(2)}</div>`;
  }
}

function updateDecimal() {
  let decA = parseInt(a, 2);
  let decB = parseInt(b, 2);

  document.getElementById("decimal").innerText =
    `Decimal: ${decA} × ${decB} = ${decA * decB}`;
}