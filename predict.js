const url = "https://api.tachyon-analytics.com/predict/";

const re_points = /\d+$/;

const seePredictBTN = document.querySelector(".predict-btn");
const predictPopUp = document.querySelector(".predict__fixed-overlay");
const submitPredict = document.getElementById("predict__form");

const pointInput = document.querySelector(".predict-form__input-point");
const percentageInput = document.querySelector(
  ".predict-form__input-percentage"
);

localStorage.clear();

const contactUsPopUp = document.querySelector(".contact-us__fixed-overlay");

async function loadPredict() {
  let response = await fetch(url, {
    method: "POST",
    body: new FormData(submitPredict),
  });
  let result = await response.json();
  localStorage.count++;
  if (document.getElementById("graph")) {
    removeImage();
  }

  let image = document.createElement("img");
  image.id = "graph";
  image.src = url + result.url;

  submitPredict.append(image);
}

function removeImage() {
  let image = document.getElementById("graph");
  image.remove();
}

function invalidData() {
  let temp = document.createElement("p");
  temp.innerHTML = "invalid data";
  temp.style.color = "red";
  submitPredict.append(temp);
  setTimeout(() => {
    temp.remove();
  }, 2000);
}

submitPredict.addEventListener("submit", (event) => {
  event.preventDefault();
  if (localStorage.count < 3) {
    console.log(`your ${localStorage.count}-st time`);
    if (!document.querySelector(".input-error")) {
      loadPredict();
    } else {
      invalidData();
    }
  } else {
    closePopUp(predictPopUp);
    contactUsPopUp.style.display = "block";
  }
});

function closePopUp(elem) {
  submitPredict.reset();
  elem.style.display = "none";
  document.body.style.overflow = "auto";
}

function showPopUp(elem) {
  elem.style.display = "block";
  document.body.style.overflow = "hidden";
}

seePredictBTN.addEventListener("click", (e)=>{
  if (localStorage.count == undefined) {
    localStorage.setItem("count", 0);
  }
  if(localStorage.count<3){
    showPopUp(predictPopUp);
  }else{
    showPopUp(contactUsPopUp);
  }
 
});

contactUsPopUp.addEventListener('click', (e)=>{
  if (
    e.target == contactUsPopUp ||
    e.target.classList.contains("contact-us__cross")
  ) {
    closePopUp(contactUsPopUp);
  }
})

predictPopUp.addEventListener("click", (e) => {
  if (
    e.target == predictPopUp ||
    e.target.classList.contains("predict-header__cross")
  ) {
    if (document.getElementById("graph")) {
      removeImage();
    }
    closePopUp(predictPopUp);
  }
});

pointInput.addEventListener("change", () => {
  if (re_points.test(pointInput.value)) {
    pointInput.classList.remove("input-error");
    pointInput.classList.add("correct-input");
  } else {
    if (!pointInput.classList.contains("input-error")) {
      pointInput.classList.add("input-error");
    }
    pointInput.classList.remove("correct-input");
  }
});
percentageInput.addEventListener("change", () => {
  if (percentageInput.value.length < 2) {
    if (!percentageInput.classList.contains("input-error")) {
      percentageInput.classList.add("input-error");
    }
  } else {
    percentageInput.classList.remove("input-error");
    percentageInput.classList.add("correct-input");
  }
});
