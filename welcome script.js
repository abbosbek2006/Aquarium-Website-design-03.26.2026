// Menu Section Code

const menu = document.querySelectorAll(".menu li");
const bg = document.querySelector(".menu-bg");

menu.forEach((item) => {
  item.addEventListener("click", () => {
    bg.style.left = item.offsetLeft + "px";
    bg.style.width = item.offsetWidth + "px";
  });
});

window.dispatchEvent(new Event("scroll"));

// loader Section Code

const texts = [
  "Initializing...",
  "Loading modules...",
  "Connecting...",
  "Preparing...",
  "Ready",
];

const loaderText = document.getElementById("loaderText");
const loader = document.querySelector(".intro-loader");

let i = 0;

let interval = setInterval(() => {
  loaderText.textContent = texts[i];

  i++;

  if (i === texts.length) {
    clearInterval(interval);

    setTimeout(() => {
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 500);
  }
}, 600);

slides.forEach((slide) => {
  const video = slide.querySelector("video");
  video.currentTime = 0;
});

//  About-cta Section Code

document.addEventListener("DOMContentLoaded", () => {
  const exploreBtn = document.querySelector(".explore-btn");

  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});

//

const burger = document.querySelector(".burger");
const menuWrap = document.querySelector(".menu");

burger.addEventListener("click", () => {
  menuWrap.classList.toggle("active");
});

// 

document.querySelector(".explore-btn").addEventListener("click", () => {
  document.querySelector(".about").scrollIntoView({
    behavior: "smooth"
  });
});

// 

