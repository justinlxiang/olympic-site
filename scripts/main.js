const myImage = document.querySelector("img");

myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/Paris-2024-Olympics-Logo.png") {
    myImage.setAttribute("src", "images/olympic-rings.png");
  } else {
    myImage.setAttribute("src", "images/Paris-2024-Olympics-Logo.png");
  }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h2");

function setUserName() {
  const myName = prompt("Please enter your name.");
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `Welcome to Paris, ${myName}`;
  }
}

if (!localStorage.getItem("name")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `Welcome to Paris, ${storedName}`;
}

myButton.onclick = () => {
  setUserName();
};

// Countdown Timer
const countdownElement = document.getElementById('countdown-timer');
const closingCeremonyDate = new Date('2024-08-11').getTime()

function updateCountdown() {
  const now = new Date().getTime();
  const distance = closingCeremonyDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60) ));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  if (distance < 0) {
    clearInterval(countdownInterval);
    countdownElement.innerHTML = "The 2024 Olympics have concluded."
  }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
