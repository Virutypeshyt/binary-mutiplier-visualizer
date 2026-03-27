let steps = [], currentStep = 0, a="", b="", result=0, interval=null;

function loadExample(x,y){
  num1.value=x;
  num2.value=y;
}

function start(){
  a=num1.value;
  b=num2.value;

  steps=[]; currentStep=0; result=0;

  let multiplicand=parseInt(a,2);
  let shift=0;

  for(let i=b.length-1;i>=0;i--){
    if(b[i]==='1'){
      let partial=multiplicand<<shift;
      result+=partial;
      steps.push({bit:'1',shift,partial:partial.toString(2),rule:"rule11"});
    } else {
      steps.push({bit:'0',shift,partial:"0",rule:"rule10"});
    }
    shift++;
  }

  updateDecimal();
  render();
}

function updateDecimal(){
  let decA=parseInt(a,2);
  let decB=parseInt(b,2);

  let el=document.getElementById("decimal");
  el.classList.remove("show-decimal");

  setTimeout(()=>{
    el.innerText=`Decimal: ${decA} × ${decB} = ${decA*decB}`;
    el.classList.add("show-decimal");
  },100);
}

function highlightRules(ruleId){
  document.querySelectorAll(".rules li").forEach(el=>el.classList.remove("active-rule"));
  if(ruleId) document.getElementById(ruleId).classList.add("active-rule");
}

function highlightMultiplier(){
  if(currentStep===0) return b;

  let idx=b.length-currentStep;
  return b.split('').map((bit,i)=>
    i===idx ? `<span style="color:#facc15;font-weight:bold">${bit}</span>` : bit
  ).join('');
}

function render(){
  display.innerHTML=`${a}<br>× ${highlightMultiplier()}<br>────────`;

  for(let i=0;i<currentStep;i++){
    let s=steps[i];
    let cls=(i===currentStep-1)?"row active":"row";
    display.innerHTML+=`<div class="${cls}">${"&nbsp;".repeat(s.shift*2)}${s.partial}</div>`;
  }

  if(currentStep===steps.length){
    display.innerHTML+=`<div>────────</div>`;
    display.innerHTML+=`<div class="result">${result.toString(2)}</div>`;
  }

  if(currentStep>0){
    let s=steps[currentStep-1];

    bitVal.innerText=s.bit;
    shiftVal.innerText=s.shift;
    partialVal.innerText=s.partial;

    if (s.bit === "1") {
      explainVal.innerText = `Bit is 1 → shift left by ${s.shift} and add.`;
    } else {
      explainVal.innerText = `Bit is 0 → skip this step.`;
    }

    highlightRules(s.rule);
  }
}

function nextStep(){ if(currentStep<steps.length){currentStep++;render();}}
function prevStep(){ if(currentStep>0){currentStep--;render();}}

function autoPlay(){
  interval=setInterval(()=>{
    if(currentStep<steps.length) nextStep();
    else clearInterval(interval);
  },900);
}

function pause(){ clearInterval(interval); }

function resetAll(){ location.reload(); }
