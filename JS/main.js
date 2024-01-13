let landingPage = document.querySelector(".landing-page");

let allHeaderLinks = document.querySelectorAll("header .links li a");

let toggleBtn = document.querySelector(".toggle-menu");

// Start typed js for span element

var typed = new Typed(".element", {
  strings: ["Creative", "Progressive", "Collaborative", "Innovative"],
  typeSpeed: 80,
  backSpeed: 80,
  loop: true,
  showCursor: false,
  loopCount: Infinity,
});

// End typed js for span element

// Start Settings Box

document.querySelector(".fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("opened");
};

// End Settings Box

// Start Nav Scrolling

let navBtns = document.querySelectorAll(".nav-scrolling span");

let yesNavBtn = document.querySelector(".nav-scrolling .yes");

let noNavBtn = document.querySelector(".nav-scrolling .no");

let header = document.querySelector("header");

let headroom = new Headroom(header);

let toggleMenuSpans = document.querySelectorAll(".toggle-menu span");

function toggleMenuHover(toggleBtn, toggleMenuSpans, overColor, outColor) {
  toggleBtn.addEventListener(("mouseover"), () => {
    toggleMenuSpans.forEach((toggleMenuSpan) => {
      toggleMenuSpan.style.backgroundColor = overColor;
    })
  });
  toggleBtn.addEventListener(("mouseout"), () => {
    toggleMenuSpans.forEach((toggleMenuSpan) => {
      toggleMenuSpan.style.backgroundColor = outColor;
    })
  });
}

function allLinksHover(headerLinks, overColor, outColor) {
  headerLinks.forEach((headerLink) => {
    headerLink.addEventListener("mouseover", (e) => {
      e.target.style.color = overColor;
    });
    headerLink.addEventListener("mouseout", (e) => {
      e.target.style.color = outColor;
    });
  });
}

function navScrolling() {
  headroom.init();
  headroom.unfreeze();
  window.addEventListener("scroll", () => {
    if (window.scrollY <= 622.5000122070312) {
      header.style.backgroundColor = "transparent";
      header.style.boxShadow = "none";
      allLinksHover(
        allHeaderLinks,
        window.localStorage.getItem("mainColor"),
        "white"
      );
      toggleMenuHover(toggleBtn, toggleMenuSpans, window.localStorage.getItem("mainColor"), "white");
    } else {
      header.style.backgroundColor = window.localStorage.getItem("mainColor");
      header.style.boxShadow = "0 1px 20px #36363638";
      allLinksHover(allHeaderLinks, "black", "white");
      toggleMenuHover(toggleBtn, toggleMenuSpans, "black", "white");
    }
  });
}

function stopNavScrolling() {
  headroom.unpin();
  headroom.freeze();

  header.style.display = "flex";
}

if (window.localStorage.getItem("navScrolling")) {
  navBtns.forEach((navBtn) => {
    navBtn.classList.remove("active");
  });

  if (window.localStorage.getItem("navScrolling") === "true") {
    yesNavBtn.classList.add("active");
    navScrolling();
  } else {
    noNavBtn.classList.add("active");
    stopNavScrolling();
  }
}

navBtns.forEach((navBtn) => {
  navBtn.addEventListener("click", (e) => {
    handleActiveClass(navBtns, e);
  });
  yesNavBtn.addEventListener("click", () => {
    navScrolling();

    window.localStorage.setItem("navScrolling", true);
  });

  noNavBtn.addEventListener("click", () => {
    stopNavScrolling();

    window.localStorage.setItem("navScrolling", false);
  });
});

// Start Nav Scrolling

//Start Toggle menu

let toggleMenu = document.querySelector(".links");

toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu.classList.toggle("active");
  let toggleSettings = document.querySelector(".toggle-settings");

  toggleSettings.classList.toggle("show");

  // if (toggleMenu.classList.contains("active")) {
  //   toggleSettings.style.display = "none";
  // } else {
  //   toggleSettings.style.display = "block";
  // }
});

toggleMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== toggleMenu) {
    toggleMenu.classList.remove("active");
  }
});

//End Toggle menu

// Start scrollIntoView

function scrollIntoView(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

let allBullets = document.querySelectorAll(".nav-bullets .bullet");

scrollIntoView(allBullets);

scrollIntoView(allHeaderLinks);

// End scrollIntoView

// Start Main Color

function handleActiveClass(elements, e) {
  elements.forEach((element) => {
    element.classList.remove("active");
    e.target.classList.add("active");
  });
}

let lis = document.querySelectorAll(".colors-list li");

if (window.localStorage.getItem("mainColor")) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("mainColor")
  );
  lis.forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color === window.localStorage.getItem("mainColor")) {
      li.classList.add("active");
    }
  });
}

lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    window.localStorage.setItem("mainColor", e.target.dataset.color);
    handleActiveClass(lis, e);
  });
});

// End Main Color

// Start Specific Background Image

let allBackgrounds = document.querySelectorAll(
  ".option-box .background-list li"
);

if (window.localStorage.getItem("specificBackground")) {
  landingPage.style.backgroundImage = `url(${window.localStorage.getItem(
    "specificBackground"
  )})`;

  allBackgrounds.forEach((background) => {
    background.classList.remove("active");
    if (
      background.dataset.background ===
      window.localStorage.getItem("specificBackground")
    ) {
      background.classList.add("active");
    }
  });
}

allBackgrounds.forEach((background) => {
  background.addEventListener("click", (e) => {
    landingPage.style.backgroundImage = `url(${e.target.dataset.background})`;

    handleActiveClass(allBackgrounds, e);

    backgroundOption = false;
    clearInterval(backgroundInterval);
    window.localStorage.setItem("backgroundOption", false);
    yesRandomBtn.classList.remove("active");
    noRandomBtn.classList.add("active");

    window.localStorage.setItem(
      "specificBackground",
      e.target.dataset.background
    );
  });
});

// End Specific Background Image

// Start Random Background

let randomSpans = document.querySelectorAll(".random-buttons span");

let yesRandomBtn = document.querySelector(".random-buttons .yes");

let noRandomBtn = document.querySelector(".random-buttons .no");

let backgroundOption = true;

let backgroundInterval;

if (window.localStorage.getItem("backgroundOption")) {
  randomSpans.forEach((span) => {
    span.classList.remove("active");
  });
  if (window.localStorage.getItem("backgroundOption") === "true") {
    backgroundOption = true;
    yesRandomBtn.classList.add("active");
  } else {
    backgroundOption = false;
    noRandomBtn.classList.add("active");
  }
}

randomSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActiveClass(randomSpans, e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeBackground();
      window.localStorage.setItem("backgroundOption", true);

      allBackgrounds.forEach((background) => {
        background.classList.remove("active");
      });
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      window.localStorage.setItem("backgroundOption", false);
    }
  });
});

let randomNumber;

function randomizeBackground() {
  backgroundInterval = setInterval(() => {
    randomNumber = Math.trunc(Math.random() * 5) + 1;
    landingPage.style.backgroundImage = `url('./Images/${randomNumber}.jpg')`;
  }, 3000);
}

if (backgroundOption) {
  randomizeBackground();
}

// End Random Background

// Start Show Bullets

let bulletSpans = document.querySelectorAll(".bullets-buttons span");

let navBullets = document.querySelector(".nav-bullets");

if (window.localStorage.getItem("navBullets")) {
  bulletSpans.forEach((bulletSpan) => {
    bulletSpan.classList.remove("active");
    if (window.localStorage.getItem("navBullets") === "true") {
      document.querySelector(".bullets-buttons .yes").classList.add("active");
      navBullets.style.display = "block";
    } else {
      document.querySelector(".bullets-buttons .no").classList.add("active");
      navBullets.style.display = "none";
    }
  });
}

bulletSpans.forEach((bulletSpan) => {
  bulletSpan.addEventListener("click", (e) => {
    if (bulletSpan.dataset.bullets === "yes") {
      navBullets.style.display = "block";
      window.localStorage.setItem("navBullets", "true");
    } else {
      navBullets.style.display = "none";
      window.localStorage.setItem("navBullets", "false");
    }
    handleActiveClass(bulletSpans, e);
  });
});

// End Show Bullets

// Start Reset Options

let resetBtn = document.querySelector(
  ".settings-box .settings-container .reset"
);

resetBtn.addEventListener("click", () => {
  localStorage.clear();
  // localStorage.removeItem("mainColor");
  // localStorage.removeItem("backgroundOption");
  // localStorage.removeItem("navBullets");
  window.location.reload();
});

// End Reset Options

// Start Home Button

let homeBtn = document.querySelector(".home");

homeBtn.addEventListener("click", () => {
  document.querySelector(".landing-page").scrollIntoView({
    behavior: "smooth",
  });
});

// End Home Button

// Start ourSkills

let ourSkills = document.querySelector(".our-skills");

window.onscroll = function () {
  if (
    this.scrollY >
    ourSkills.offsetTop + ourSkills.offsetHeight - this.innerHeight
  ) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
    homeBtn.style.display = "block";
  } else {
    homeBtn.style.display = "none";
  }
};

// End ourSkills

// Start ourGallery

let galleryImgs = document.querySelectorAll(".our-gallery .images-box img");

galleryImgs.forEach((img) => {
  img.addEventListener("click", () => {
    let galleryOverlay = document.createElement("div");
    galleryOverlay.className = "popup-overlay";
    document.body.appendChild(galleryOverlay);
    let galleryPopup = document.createElement("div");
    galleryPopup.className = "gallery-popup";
    document.body.appendChild(galleryPopup);
    if (img.src !== "") {
      let galleryPopupH3 = document.createElement("h3");
      galleryPopupH3.textContent = img.alt;
      galleryPopup.appendChild(galleryPopupH3);
    }
    let galleryPopupImg = document.createElement("img");
    galleryPopupImg.src = img.src;
    galleryPopup.appendChild(galleryPopupImg);
    let galleryPopupBtn = document.createElement("button");
    galleryPopupBtn.className = "popup-closebtn";
    galleryPopupBtn.textContent = "X";
    galleryPopup.appendChild(galleryPopupBtn);
    galleryPopupBtn.addEventListener("click", () => {
      galleryPopup.remove();
      galleryOverlay.remove();
    });
  });
});

// End ourGallery
