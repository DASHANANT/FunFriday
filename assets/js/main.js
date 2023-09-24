/**
* Template Name: FunFriday
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/FunFriday-free-multipurpose-html-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  function showGameButtons() {
    var tossCoinButton = document.getElementById("tossCoinButton");
    var rollDiceButton = document.getElementById("rollDiceButton");

    tossCoinButton.style.display = "block";
    rollDiceButton.style.display = "block";
}

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

}
)()

/**
   * ----------------------------------------------------------------------------------------------------------------------
   */
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("createRoomButton").addEventListener("click", function () {
    document.getElementById("roomModal").style.display = "block";
  });

  document.getElementById("startGameButton").addEventListener("click", function () {
    const roomId = document.getElementById("roomIdInput").value.trim();

    // Check if the room ID is empty
    if (roomId === '') {
      alert("Please enter a valid room ID.");
      return;
    }

    if (!checkRoomIdExists(roomId)) {
      // Ask for permission to persist data
      requestStoragePermission(roomId);
    } else {
      alert("A room with the same ID already exists. Please enter a different ID.");
    }

  });
});


function requestStoragePermission(roomId) {
  if ('storage' in navigator && 'persist' in navigator.storage) {
    // Ask for permission to persist data
    navigator.storage.persist().then(granted => {
      if (granted) {
        createRoomFile(roomId);
      } else {
        alert("Permission to persist data not granted.");
      }
    });
  } else {
    alert("Your browser does not support persistent storage.");
  }
  alert("room file created.");
}

function checkRoomIdExists(roomId) {
  // Check if the room ID file already exists in Local Storage
  return localStorage.getItem(`room_${roomId}`) !== null;
}

function createRoomFile(roomId) {
  const playerNames = []; // You can populate this array with player names collected from the user
  const teamNames = generateTeamNames(playerNames);

  const data = {
    room_id: roomId,
    playerProfiles: playerNames,
    teams: teamNames
  };

  const jsonData = JSON.stringify(data);

  // Store the data in Local Storage
  localStorage.setItem(`room_${roomId}`, jsonData);

  // Close the modal after the operation is completed
  document.getElementById("roomModal").style.display = "none";

  alert("Room data created and stored locally!");
}

function addPlayersAndGenerateTeams(roomId) {
  const playerNames = []; // You can populate this array with player names collected from the user
  const teamNames = generateTeamNames(playerNames); // Assuming you have a function to generate team names

  // Now, you can store the data in a JSON format and write it to the user's local system
  const data = {
    room_id: roomId,
    playerProfiles: playerNames,
    teams: teamNames
  };

  // Convert the data to a JSON string
  const jsonData = JSON.stringify(data);

  // Create a Blob and trigger a download link
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `room_${roomId}.json`;
  a.click();

  // Clean up
  URL.revokeObjectURL(url);

  // Close the modal after the operation is completed
  document.getElementById("roomModal").style.display = "none";
}


function tossCoin() {
  const coin = Math.random();
  const resultElement = document.getElementById('result');

  if (coin < 0.5) {
    resultElement.textContent = 'Heads';
  } else {
    resultElement.textContent = 'Tails';
  }
}

function rollDice() {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  const resultElement = document.getElementById('result');
  resultElement.textContent = 'Dice Roll: ' + diceRoll;
}
// nightlight.js

// Get the night light button element
const nightLightButton = document.getElementById('nightLightButton');

// Define a variable to track the night light state
let nightLightOn = false;

// Function to toggle the night light effect
function toggleNightLight() {
    nightLightOn = !nightLightOn;

    if (nightLightOn) {
        document.body.classList.add('night-light');
    } else {
        document.body.classList.remove('night-light');
    }
}

// Attach event listener to the night light button
nightLightButton.addEventListener('click', toggleNightLight);

// JavaScript for showing the login modal
// JavaScript for showing the create modal and hiding the login modal
function showCreateModal() {
  const createModal = document.getElementById("createModal");
  const loginModal = document.getElementById("loginModal");
  createModal.style.display = "block";
  loginModal.style.display = "none";
  document.getElementById("loginRoomButton").style.display = "none";
  document.getElementById("createRoomButton").style.display = "none";
}

// JavaScript for showing the login modal and hiding the create modal
function showLoginModal() {
  const createModal = document.getElementById("createModal");
  const loginModal = document.getElementById("loginModal");
  createModal.style.display = "none";
  loginModal.style.display = "block";
  document.getElementById("loginRoomButton").style.display = "none";
  document.getElementById("createRoomButton").style.display = "none";
}

