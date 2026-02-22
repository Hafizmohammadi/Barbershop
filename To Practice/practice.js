
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");
const headingTwo = document.getElementById("h2");
const result = document.getElementById("result");

let count = 0;

incrementBtn.addEventListener("click", () => {
  count++;
  headingTwo.textContent = count;
})

decrementBtn.addEventListener("click", () => {
  count--;
  headingTwo.textContent = count;
})

resetBtn.addEventListener("click", () => {
  count = 0;
  headingTwo.textContent = count;
})