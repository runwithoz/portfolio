const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

window.addEventListener("load", () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
});

window.onload = () => {
  gsap.to("nav", {
    opacity: 1,
    duration: 0.8,
    ease: "power2.inOut",
  });
};

gsap.registerPlugin(ScrollTrigger);

const word = new SplitType(".word");

gsap.from(".word .char", 1, {
  delay: 0.5,
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

/* gsap.from(".skills .row", {
  scrollTrigger: {
    trigger: ".skills .row",
    start: "top 80%",
    end: "top 20%",
    scrub: false,
    markers: false,
  },
  duration: 0.1,
  y: 100,
  stagger: 0.1,
  ease: "power2.inOut",
}); */

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
