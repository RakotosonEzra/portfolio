//Navigation bar effects on scroll
window.addEventListener("scroll", function(){
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0)
});

//Services section- Modal
const serviceModals = document.querySelectorAll(".service-modal");
const learnmoreBtns = document.querySelectorAll(".learn-more-btn");
const modalCloseBtns = document.querySelectorAll(".modal-close-btn");

var modal = function(modalClick){
    serviceModals[modalClick].classList.add("active");
}

learnmoreBtns.forEach((learnmoreBtn, i) => {
    learnmoreBtn.addEventListener("click", () => {
        modal(i);
    });
});

modalCloseBtns.forEach((modalCloseBtn) => {
    modalCloseBtn.addEventListener("click", () => {
        serviceModals.forEach((modalView) => {
            modalView.classList.remove("active");
        });
    });
});


//Portfolio section - Model
const portfolioModals = document.querySelectorAll(".portfolio-model");
const imgCards = document.querySelectorAll(".img-card");
const portfolioCloseBtns = document.querySelectorAll(".portfolio-close-btn");

var portfolioModal = function(modalClick){
    portfolioModals[modalClick].classList.add("active");
}

imgCards.forEach((imgCards, i) => {
    imgCards.addEventListener("click", () => {
        portfolioModal(i);
    });
});

portfolioCloseBtns.forEach((portfolioCloseBtn) => {
    portfolioCloseBtn.addEventListener("click", () => {
        portfolioModals.forEach((portfolioModalView) => {
            portfolioModalView.classList.remove("active");
        });
    });
});


//Website dark/light theme

const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    themeBtn.classList.toggle("sun");

    localStorage.setItem("saved-theme", getCurrentTheme());
    localStorage.setItem("saved-icon", getCurrentIcon());

});

const getCurrentTheme = () => document.body.classList.contains("dark-theme") ? "dark" : "light";
const getCurrentIcon = () => themeBtn.classList.contains("sun") ? "sun" : "moon";

const savedTheme = localStorage.getItem("saved-theme");
const savedIcon = localStorage.getItem('saved-icon');

if(savedTheme){
    document.body.classList[savedTheme === "dark" ? "add" : "remove"]("dark-theme");
    themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("sun")
}


//Scroll to top button
const scrollTopBtn = document.querySelector(".scrollTopTop-btn");

window.addEventListener("scroll",function(){
    scrollTopBtn.classList.toggle("active", window.scrollY > 500);
});

scrollTopBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});


//Navigation menu items active on page scroll
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section")
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        let sectionHeight = current.offsetHeight;
        let sectionTop = current.offsetTop - 50;
        let id = current.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector(".nav-items a[href*=" + id + "]").classList.add("active");
        }
        else{
            document.querySelector(".nav-items a[href*=" + id + "]").classList.remove("active");
        }
    });
});



//rESPONSIVE navigation menu toggle
const menuBtn = document.querySelector(".nav-menu-btn")
const closeBtn = document.querySelector(".nav-close-btn")
const navigation = document.querySelector(".navigation")
const navigatems = document.querySelector(".nav-items a")

menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});

closeBtn.addEventListener("click", () =>{
    navigation.classList.remove("active")
});

navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
        navigation.classList.remove("active");
    });
});



async function afficherProduitsDepuisJsonBin() {
  const url = "https://api.jsonbin.io/v3/b/6867e5b08960c979a5b70cd6/latest";
  const masterKey = "$2a$10$PNtV3dYWNQHeHMiK2hW3qOwspPLM/vsyQKk8UjeeUJ1nNr9p.Lng6";

  try {
    const res = await fetch(url, {
      headers: {
        "X-Master-Key": masterKey
      }
    });

    const data = await res.json();
    const produits = data.record;
    const container = document.getElementById("produitContainer");

    produits.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "img-card";

      card.innerHTML = `
        <div class="overlay"></div>
        <div class="info">
          <h3>${p.nom}</h3>
          <span>${p.prix.toLocaleString()} Ar</span>
        </div>
        <img src="${p.image}" alt="${p.nom}">
      `;

      const modal = document.createElement("div");
      modal.className = "portfolio-model flex-center";
      modal.innerHTML = `
        <div class="portfolio-model-body">
          <i class="fas fa-times portfolio-close-btn"></i>
          <h3>${p.nom}</h3>
          <img src="${p.image}" alt="${p.nom}">
          <p>Ce produit est un incontournable de notre collection beaut\u00e9, id\u00e9al pour prendre soin de votre peau.</p>
        </div>
      `;

      const wrapper = document.createElement("div");
      wrapper.className = "img-card-container";
      wrapper.appendChild(card);
      wrapper.appendChild(modal);
      container.appendChild(wrapper);
    });

    activerModalsPortfolio();

  } catch (e) {
    console.error("Erreur de chargement JSONBin :", e);
  }
}

function activerModalsPortfolio() {
  const portfolioModals = document.querySelectorAll(".portfolio-model");
  const imgCards = document.querySelectorAll(".img-card");
  const portfolioCloseBtns = document.querySelectorAll(".portfolio-close-btn");

  imgCards.forEach((card, i) => {
    card.addEventListener("click", () => {
      portfolioModals[i].classList.add("active");
    });
  });

  portfolioCloseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      portfolioModals.forEach((modal) => {
        modal.classList.remove("active");
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", afficherProduitsDepuisJsonBin);



