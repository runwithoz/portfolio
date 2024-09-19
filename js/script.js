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

gsap.registerPlugin(ScrollTrigger);

const word = new SplitType(".word");

gsap.from(".word .char", 1.5, {
  delay: 0,
  y: 700,
  stagger: {
    amount: 0.5,
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

aboutTl.from(aboutText.chars, {
  opacity: 0.1,
  duration: 0.01,
  stagger: 0.007,
});

gsap.from(".skills .row", {
  scrollTrigger: {
    trigger: ".skills .row",
    start: "top 80%",
    end: "top 20%",
    scrub: true,
    markers: false,
  },
  duration: 0.1,
  y: 100,
  stagger: 0.1,
});

/* gsap.to(".bg", {
  backgroundColor: "#ffffff",
  backgroundImage: "linear-gradient(45deg, #ffffff 0%, #ffffff 100%)",
  scrollTrigger: {
    trigger: ".hero",
    start: "top",
    end: "bottom",
    scrub: 0.5,
    markers: false,
  },
});

gsap.to(".blocks-container", {
  opacity: 0,
  zIndex: -100,
  pointerEvents: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top",
    scrub: true,
    end: "bottom",
    markers: false,
  },
}); */

/* //////////////////////////////////////////////////// */

/* window.addEventListener('DOMContentLoaded', () => {
  const blockContainer = document.getElementById('blocks');
  const blockSize = 50;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const numCols = Math.ceil(screenWidth / blockSize);
  const numRows = Math.ceil(screenHeight / blockSize);
  const numBlocks = numCols * numRows;

  function createBlocks() {
    for (let i = 0; i < numBlocks; i++) {
      const block = document.createElement('div');
      block.classList.add('block');
      block.dataset.index = i;
      block.addEventListener('mousemove', highlightRandomNeighbors);
      blockContainer.appendChild(block);
    }
  }

  function highlightRandomNeighbors() {
    const index = parseInt(this.dataset.index);
    const neighbors = [
      index - 1,
      index + 1,
      index - numCols,
      index + numCols,
      index - numCols - 1,
      index - numCols + 1,
      index + numCols - 1,
      index + numCols + 1,
    ].filter(
      (i) =>
        i >= 0 &&
        i < numBlocks &&
        Math.abs((i % numCols) - (index % numCols)) <= 1
    );

    this.classList.add('highlight');
    setTimeout(() => {
      this.classList.remove('highlight');
    }, 500);

    shuffleArray(neighbors)
      .slice(0, 1)
      .forEach((nIndex) => {
        const neighbor = blockContainer.children[nIndex];
        if (neighbor) {
          neighbor.classList.add('highlight');
          setTimeout(() => {
            neighbor.classList.remove('highlight');
          }, 500);
        }
      });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  createBlocks();
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

gsap.to(".logo", {
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
