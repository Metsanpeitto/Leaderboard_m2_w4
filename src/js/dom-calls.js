/**         All the DOM manipulation will be done from this module          */

const refreshBtn = document.getElementById("refresh-btn");
const submitBtn = document.getElementById("submit-btn");

refreshBtn.addEventListener("click", () => {
  console.log("call API");
});

submitBtn.addEventListener("click", () => {
  console.log("Submit API");
});
