const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY < window.innerHeight - 100) {
    header.classList.add("blur");
    header.classList.remove("scrolled");
  } else {
    header.classList.remove("blur");
    header.classList.add("scrolled");
  }
});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let current = 0;
let slideInterval;

function showSlide(index) {
  if (index === current) return;

  slides[current].classList.remove("active");
  dots[current].classList.remove("active");

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  current = index;
}

function startSlider() {
  slideInterval = setInterval(() => {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }, 4000);
}

startSlider();

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);

    clearInterval(slideInterval);
    startSlider();
  });
});

// Header Section Code

const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");
const avatar = document.querySelector(".avatar");
const profile = document.querySelector(".profile-dropdown");

burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  profile.classList.remove("active");
});

avatar.addEventListener("click", () => {
  profile.classList.toggle("active");
  mobileMenu.classList.remove("active");
});

/* outside click close */
document.addEventListener("click", (e) => {
  if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove("active");
  }

  if (!avatar.contains(e.target) && !profile.contains(e.target)) {
    profile.classList.remove("active");
  }
});

// Animals Section Code

const animalSection = document.querySelector(".animals");

const animalCards = animalSection.querySelectorAll(".card");
const animalDotsWrap = animalSection.querySelector(".dots");
const animalPrev = animalSection.querySelector(".arrow.left");
const animalNext = animalSection.querySelector(".arrow.right");

let animalIndex = 3;
let animalAuto;

animalCards.forEach((_, i) => {
  const dot = document.createElement("span");

  if (i === animalIndex) dot.classList.add("active");

  dot.addEventListener("click", () => {
    animalIndex = i;
    updateAnimals();
    restartAnimals();
  });

  animalDotsWrap.appendChild(dot);
});

const animalDots = animalDotsWrap.querySelectorAll("span");

function updateAnimals() {
  animalCards.forEach((card, i) => {
    card.classList.remove("active", "right-1", "right-2", "left-1", "left-2");

    let offset = i - animalIndex;

    if (offset > animalCards.length / 2) offset -= animalCards.length;
    if (offset < -animalCards.length / 2) offset += animalCards.length;

    if (offset === 0) card.classList.add("active");
    else if (offset === 1) card.classList.add("right-1");
    else if (offset === 2) card.classList.add("right-2");
    else if (offset === -1) card.classList.add("left-1");
    else if (offset === -2) card.classList.add("left-2");
  });

  animalDots.forEach((d, i) => {
    d.classList.toggle("active", i === animalIndex);
  });
}

function nextAnimal() {
  animalIndex = (animalIndex + 1) % animalCards.length;
  updateAnimals();
}

function prevAnimal() {
  animalIndex = (animalIndex - 1 + animalCards.length) % animalCards.length;
  updateAnimals();
}

animalNext.addEventListener("click", () => {
  nextAnimal();
  restartAnimals();
});

animalPrev.addEventListener("click", () => {
  prevAnimal();
  restartAnimals();
});

animalCards.forEach((card, i) => {
  card.addEventListener("click", (e) => {
    e.stopPropagation();

    if (i === animalIndex) return;

    let offset = i - animalIndex;

    if (offset > animalCards.length / 2) offset -= animalCards.length;
    if (offset < -animalCards.length / 2) offset += animalCards.length;

    if (offset > 0) {
      nextAnimal();
    } else {
      prevAnimal();
    }

    restartAnimals();
  });
});

function startAnimals() {
  animalAuto = setInterval(nextAnimal, 4000);
}

function restartAnimals() {
  clearInterval(animalAuto);
  startAnimals();
}

const animalCarousel = animalSection.querySelector(".carousel");

animalCarousel.addEventListener("mouseenter", () => {
  clearInterval(animalAuto);
});

animalCarousel.addEventListener("mouseleave", startAnimals);

updateAnimals();
startAnimals();

// Services-sec Section Code

const servicesData = [
  {
    img: "img/img Services-sec 1.jpg",
    title: "ФОТОСЕССИЯ В МОРСКИХ ГЛУБИНАХ",
    text: "Каждый день в океанариуме работают профессиональные фотографы...",
  },
  {
    img: "img/img Services-sec 2.jpg",
    title: "ПОГРУЖЕНИЕ С АКВАЛАНГОМ",
    text: "Испытайте настоящее погружение в морской мир...",
  },
  {
    img: "img/img Services-sec 3.jpg",
    title: "ИНДИВИДУАЛЬНЫЕ ТУРЫ",
    text: "Персональные экскурсии с гидом...",
  },
  {
    img: "img/img Services-sec 4.jpg",
    title: "ДЕТСКИЕ ПРОГРАММЫ",
    text: "Обучающие программы для детей...",
  },
];

const mainImg = document.getElementById("servicesMainImg");
const title = document.getElementById("servicesHeading");
const text = document.getElementById("servicesText");
const thumbs = document.querySelectorAll(".services-thumb");

let currentService = 0;
let autoService;

function updateService(index) {
  mainImg.style.opacity = 0;

  setTimeout(() => {
    mainImg.src = servicesData[index].img;
    title.textContent = servicesData[index].title;
    text.textContent = servicesData[index].text;
    mainImg.style.opacity = 1;
  }, 200);

  thumbs.forEach((t, i) => {
    t.classList.toggle("active", i === index);
  });

  currentService = index;
}

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateService(index);
    restartAuto();
  });
});

function startAuto() {
  autoService = setInterval(() => {
    let next = (currentService + 1) % servicesData.length;
    updateService(next);
  }, 3000);
}

function restartAuto() {
  clearInterval(autoService);
  startAuto();
}

updateService(0);
startAuto();

// Pricing-slider Section Code

const pricingTrack = document.querySelector(".pricing-track");
const pricingCards = document.querySelectorAll(".pricing-card");
const pricingNext = document.querySelector(".pricing-arrow.right");
const pricingPrev = document.querySelector(".pricing-arrow.left");

let pricingIndex = 0;
let pricingAuto;

const visibleCards = 3;
const total = pricingCards.length;

function updatePricing() {
  const cardWidth = pricingCards[0].getBoundingClientRect().width;
  const gap = 20; 
  const move = cardWidth + gap;

  pricingTrack.style.transform = `translateX(-${pricingIndex * move}px)`;

  updateDots();
}

function nextPricing() {
  if (pricingIndex < total - visibleCards) {
    pricingIndex++;
    updatePricing();
  }
}

function prevPricing() {
  if (pricingIndex > 0) {
    pricingIndex--;
    updatePricing();
  }
}

pricingNext.onclick = () => {
  nextPricing();
  restartPricing();
};

pricingPrev.onclick = () => {
  prevPricing();
  restartPricing();
};

function startPricing() {
  pricingAuto = setInterval(() => {
    nextPricing(true);
  }, 3000);
}

function restartPricing() {
  clearInterval(pricingAuto);
  startPricing();
}

const pricingDotsWrap = document.querySelector(".pricing-dots");

const maxDots = total - visibleCards + 1;

for (let i = 0; i < maxDots; i++) {
  const dot = document.createElement("span");

  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    pricingIndex = i;
    updatePricing();
    restartPricing();
  });

  pricingDotsWrap.appendChild(dot);
}

const pricingDots = pricingDotsWrap.querySelectorAll("span");

function updateDots() {
  pricingDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === pricingIndex);
  });

 
  pricingPrev.style.opacity = pricingIndex === 0 ? "0.3" : "1";
  pricingNext.style.opacity =
    pricingIndex === total - visibleCards ? "0.3" : "1";
}

function nextPricing(isAuto = false) {
  if (pricingIndex < total - visibleCards) {
    pricingIndex++;
  } else {
  
    if (isAuto) {
      pricingIndex = 0;
    } else {
      return; 
    }
  }

  updatePricing();
}

window.addEventListener("resize", updatePricing);

updatePricing();
startPricing();

// Testimonials-Section Code

const testCards = document.querySelectorAll(".test-card");
const testNext = document.querySelector(".test-arrow.right");
const testPrev = document.querySelector(".test-arrow.left");

let testIndex = 0;
let testAuto;

function updateTest() {
  testCards.forEach((card, i) => {
    card.classList.remove("active", "left-1", "right-1");

    let offset = i - testIndex;

    if (offset > testCards.length / 2) offset -= testCards.length;
    if (offset < -testCards.length / 2) offset += testCards.length;

    if (offset === 0) card.classList.add("active");
    else if (offset === 1) card.classList.add("right-1");
    else if (offset === -1) card.classList.add("left-1");
  });
}

function nextTest() {
  testIndex = (testIndex + 1) % testCards.length;
  updateTest();
}

function prevTest() {
  testIndex = (testIndex - 1 + testCards.length) % testCards.length;
  updateTest();
}

function startTest() {
  testAuto = setInterval(nextTest, 3000);
}

function restartTest() {
  clearInterval(testAuto);
  startTest();
}

updateTest();
startTest();

testNext.addEventListener("click", () => {
  nextTest();
  restartTest();
});

testPrev.addEventListener("click", () => {
  prevTest();
  restartTest();
});

testCards.forEach((card, i) => {
  card.addEventListener("click", (e) => {
    e.stopPropagation();

    if (i === testIndex) return;

    let offset = i - testIndex;

    if (offset > testCards.length / 2) offset -= testCards.length;
    if (offset < -testCards.length / 2) offset += testCards.length;

    if (offset > 0) {
      nextTest();
    } else {
      prevTest();
    }

    restartTest();
  });
});

// Gallery-Section Code

const galleryImages = [
  "img/img gallery-sec 1.webp",
  "img/img gallery-sec 2.jpg",
  "img/img gallery-sec 3.jpg",
  "img/img gallery-sec 4.jpg",
  "img/img gallery-sec 5.jpg",
  "img/img gallery-sec 6.jpg",
  "img/img gallery-sec 7.jpg",
  "img/img gallery-sec 8.jpg",
  "img/img gallery-sec 9.jpg",
  "img/img gallery-sec 10.webp",
];

const galleryItems = document.querySelectorAll(".gallery-item img");

let gIndex = 0;

galleryItems.forEach((img, i) => {
  img.src = galleryImages[i];
});

function rotateGallery() {
  galleryItems.forEach((img) => {
    img.style.opacity = "0";
  });

  setTimeout(() => {
    gIndex++;

    galleryItems.forEach((img, i) => {
      img.src = galleryImages[(gIndex + i) % galleryImages.length];
    });

    galleryItems.forEach((img) => {
      img.style.opacity = "1";
    });
  }, 200);
}

setInterval(rotateGallery, 3000);

let isDown = false;
let startX;
let scrollLeft;

const track = document.querySelector(".gallery-track");

track.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
});

track.addEventListener("mouseleave", () => {
  isDown = false;
});

track.addEventListener("mouseup", () => {
  isDown = false;
});

track.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();

  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 2;

  track.scrollLeft = scrollLeft - walk;
});

// Contact Section Code

const contactBtn = document.querySelector(".contact-btn");

contactBtn.addEventListener("click", () => {
  const inputs = document.querySelectorAll(
    ".contact-form input, .contact-form textarea",
  );

  let valid = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.style.border = "1px solid red";
      valid = false;
    } else {
      input.style.border = "none";
    }
  });

  if (valid) {
    contactBtn.innerText = "Отправлено ✔";
    contactBtn.style.background = "green";

    setTimeout(() => {
      contactBtn.innerText = "Заказать звонок";
      contactBtn.style.background = "";
      inputs.forEach((i) => (i.value = ""));
    }, 2000);
  }
});
