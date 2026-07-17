const videoContainerDesktop = document.querySelector("#video-container-desk");
const videoDesktop = document.querySelector("#video-desk");
const playBtnDesktop = document.querySelector("#playBtnDesk");
const videoContainerMobile = document.querySelector("#video-container-mob");
const videoMobile = document.querySelector("#video-mob");
const playBtnMobile = document.querySelector("#playBtnMob");
const navBtn = document.querySelector("#burger");
const nav = document.querySelector("#nav");
const header = document.querySelector(".header");
const html = document.querySelector("#html");
const navItems = document.querySelectorAll(".nav-item");
const newsLetterForm = document.querySelector(".newsletter-form");
const contactsForm = document.querySelector(".contacts-form");
const toast = document.querySelector("#toast");
const toastIcon = document.querySelector(".toast-icon");
const toastText = document.querySelector(".toast-text");

// Video Play

videoContainerDesktop.addEventListener("click", () => {
  if (!playBtnDesktop.classList.contains("hidden")) {
    videoDesktop.play();
    playBtnDesktop.classList.add("hidden");
  } else {
    videoDesktop.pause();
    videoDesktop.currentTime = 0;
    playBtnDesktop.classList.remove("hidden");
  }
});
videoContainerMobile.addEventListener("click", () => {
  if (!playBtnMobile.classList.contains("hidden")) {
    videoMobile.play();
    playBtnMobile.classList.add("hidden");
  } else {
    videoMobile.pause();
    videoMobile.currentTime = 0;
    playBtnMobile.classList.remove("hidden");
  }
});

// Mobile Navigation

navBtn.onclick = () => {
  navBtn.classList.toggle("active");
  nav.classList.toggle("active");
  header.classList.toggle("menu-open");
  html.classList.toggle("overflow-hidden");
};

navItems.forEach((link) => {
  link.onclick = () => {
    navBtn.classList.remove("active");
    nav.classList.remove("active");
    header.classList.remove("menu-open");
    html.classList.remove("overflow-hidden");
  };
});

// Forms

newsLetterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);

  newsLetterForm.reset();
});

contactsForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(contactsForm);

  const res = await fetch("https://formspree.io/f/mwvgvdyg", {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" },
  });

  if (res.ok) {
    toastText.innerText = "Thank you! We will contact you later.";
    contactsForm.reset();
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  } else {
    toastText.innerText = "Sending unsuccessful!";
    toastIcon.innerText = "✖";
    toast.classList.add("failure");
    contactsForm.reset();
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
});

// GSAP

gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-title", {
  opacity: 0,
  y: 60,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".hero-text", {
  opacity: 0,
  y: 40,
  duration: 1,
  delay: 0.3,
  ease: "power3.out",
});

gsap.from(".hero-btn", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.6,
  ease: "power3.out",
});

if (window.innerWidth > 1264) {
  gsap.from(".features-item", {
    scrollTrigger: {
      trigger: ".features-list",
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 0.7,
    stagger: 0.2,
    ease: "power2.out",
  });
}
// AOS

AOS.init({
  disable: function () {
    return window.innerWidth < 1264;
  },
  delay: 100,
  once: true,
  duration: 600,
});
