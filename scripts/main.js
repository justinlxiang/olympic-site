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
