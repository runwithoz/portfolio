/*      smooth scroll      */
const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/*      새로고침시 페이지 최상단으로       */
window.addEventListener("load", () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
});

/*      로딩 페이지      */
function startLoader() {
  var counterElement = document.querySelector(".counter");
  var currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;

    if (currentValue > 100) {
      currentValue = 100;
    }

    counterElement.textContent = currentValue;

    var delay = Math.floor(Math.random() * 200) + 50;
    setTimeout(updateCounter, delay);
  }

  updateCounter();
}

startLoader();

let openingTl = gsap.timeline({});

openingTl.to(".counter", 0.3, {
  delay: 3.5,
  opacity: 0,
  onComplete: function () {
    gsap.set(".counter", { display: "none" });
  },
});
openingTl.to("nav", {
  opacity: 1,
  duration: 0.5,
  ease: "power2.inOut",
});

gsap.registerPlugin(ScrollTrigger);

const word = new SplitType(".word");

openingTl.from(".word .char", 1, {
  delay: 0.1,
  y: 700,
  stagger: {
    amount: 0.2,
  },
  ease: "power4.inOut",
});

let aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".about",
    pin: true,
    pinSpacing: false,
    start: "top",
    end: "bottom",
    scrub: false,
    markers: false,
  },
});

aboutTl.from(".about img", {
  x: 600,
  duration: 0.8,
  ease: "power2.inOut",
});

const aboutText = new SplitType(".about p");

aboutTl.from(".about p", {
  opacity: 0,
  duration: 0.5,
  delay: 0.2,
});

const pSections = gsap.utils.toArray(".projects section");

let pScrollTween = gsap.to(pSections, {
  xPercent: -100 * (pSections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".projects",
    pin: true,
    scrub: 0.1,
    start: "top top",
    end: 7000,
  },
});

let logoTl = gsap.timeline({});

/* logoTl.to(".logo", {
  opacity: 1,
  duration: 1.5,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".logo",
  },
  delay: 1,
}); */
logoTl.to(".logo", {
  fontSize: "2.5rem",
  top: "4rem",
  scrollTrigger: {
    trigger: ".logo",
    start: "top top",
    end: 1500,
    scrub: 0.5,
  },
});

document.querySelectorAll(".project").forEach((el) => {
  gsap.to(el.querySelector(".title"), {
    y: 0,
    ease: "none",
    scrollTrigger: {
      containerAnimation: pScrollTween,
      trigger: el.querySelector(".title"),
      start: "top bottom",
      end: "+=10%",
      scrub: 0.5,
    },
  });

  gsap.to(el.querySelector("img"), {
    y: 0,
    ease: "none",
    scrollTrigger: {
      containerAnimation: pScrollTween,
      trigger: el.querySelector("img"),
      start: "top bottom",
      end: "+=50%",
      scrub: 0.5,
    },
  });
});

/* //////////////////////////// */
/*             기능             */
/* //////////////////////////// */

/*      project 섹션 링크 윈도우 팝업      */

const openMobileView = (w, h, url) => {
  const width = w; // 모바일 해상도 너비 (예: iPhone 12)
  const height = h; // 모바일 해상도 높이

  // 화면의 중앙에 팝업을 위치시키기 위한 계산
  const left = screen.width / 2 - width / 2;
  const top = screen.height / 2 - height / 2;

  window.open(
    `${url}`,
    "popup",
    `width=${width},height=${height},left=${left},top=${top}`
  );
};

const project2MobileBtn = document.querySelector(".project-2 .mobile-screen a");
project2MobileBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openMobileView(375, 667, "https://runwithoz.github.io/res-web-app/");
});

const project2TabletBtn = document.querySelector(".project-2 .tablet-screen a");
project2TabletBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openMobileView(820, 1180, "https://runwithoz.github.io/res-web-app/");
});

const project3MobileBtn = document.querySelector(".project-3 .screen a.link");
project3MobileBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openMobileView(375, 667, "https://runwithoz.github.io/dalcom/");
});

/*      contact 섹션 클립보드에 카피 기능       */

document
  .querySelector(".contact .email")
  .addEventListener("click", function () {
    // <span> 요소의 텍스트 가져오기
    const textToCopy = document.querySelector(
      ".contact .email > span"
    ).innerText;

    // 클립보드에 복사
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        document.querySelector(".contact .fa-copy").classList.add("hide");
        document.querySelector(".contact .fa-check").classList.add("show");

        // 2초 후 "복사하기"로 다시 변경
        setTimeout(() => {
          document.querySelector(".contact .fa-copy").classList.remove("hide");
          document.querySelector(".contact .fa-check").classList.remove("show");
        }, 1000);
      })
      .catch((err) => {
        console.error("클립보드 복사 실패:", err);
      });
  });
