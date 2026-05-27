/* =========================================================
                RECHERCHE CODEX WHM
========================================================= */

const pages = [
  {
    title: "Guides",
    url: "pages/guides.html",
    keywords: "guide débutant interface progression qinghe kaifeng hexi"
  },
  {
    title: "Premiers combats",
    url: "pages/premiers-combats.html",
    keywords: "combat esquive parade arme compétence débutant qinghe kaifeng"
  },
  {
    title: "Arts Martiaux",
    url: "pages/arts-martiaux.html",
    keywords: "arts martiaux épée lance éventail combat qinghe kaifeng hexi"
  },
  {
    title: "Voies Intérieures",
    url: "pages/voies-interieures.html",
    keywords: "inner ways passif buff build qinghe kaifeng hexi blissful retreat ghostlight"
  },
  {
    title: "Compétences Mystiques",
    url: "pages/competences.html",
    keywords: "mystic skills tai chi mouvement combat qinghe kaifeng hexi moonveil"
  },
  {
    title: "Compendium",
    url: "pages/compendium.html",
    keywords: "objets nourriture médecine musique qinghe kaifeng hexi sundara"
  },
  {
    title: "Carte",
    url: "pages/carte.html",
    keywords: "map carte coffre boss pnj ressources qinghe kaifeng hexi sundara moonveil ghostlight"
  },
  {
    title: "Builds",
    url: "pages/builds.html",
    keywords: "build équipement arme jadeite qinghe kaifeng hexi"
  },
  {
    title: "Boss",
    url: "pages/boss.html",
    keywords: "boss stratégie récompense qinghe kaifeng hexi sundara"
  },
  {
    title: "Quêtes",
    url: "pages/quetes.html",
    keywords: "quête histoire secondaire qinghe kaifeng hexi sundara"
  },
  {
    title: "FAQ",
    url: "pages/faq.html",
    keywords: "question aide débutant"
  }
];

const searchInput = document.getElementById("globalSearch");
const searchResults = document.getElementById("searchResults");
const localSearch = document.querySelector(".filters input");
const regionFilter = document.getElementById("regionFilter");

function showResults(value) {
  searchResults.innerHTML = "";

  if (!value || value.length < 2) {
    searchResults.style.display = "none";
    return;
  }

  const results = pages.filter(page =>
    page.title.toLowerCase().includes(value) ||
    page.keywords.toLowerCase().includes(value)
  );

  if (results.length === 0) {
    searchResults.innerHTML = `
      <div class="search-item">
        Aucun résultat trouvé
      </div>
    `;
  } else {
    results.forEach(page => {
      searchResults.innerHTML += `
        <a class="search-item" href="${page.url}">
          ${page.title}
        </a>
      `;
    });
  }

  searchResults.style.display = "block";
}

/* Recherche barre du haut */
if (searchInput) {
  searchInput.addEventListener("input", function () {
    showResults(this.value.toLowerCase().trim());
  });
}

/* Recherche accueil */
if (localSearch) {
  localSearch.addEventListener("input", function () {
    showResults(this.value.toLowerCase().trim());
  });
}

/* Menu déroulant régions */
if (regionFilter) {
  regionFilter.addEventListener("change", function () {
    const region = this.value.toLowerCase().trim();

    if (localSearch) {
      localSearch.value = region;
    }

    if (searchInput) {
      searchInput.value = region;
    }

    showResults(region);
  });
}
/* =========================================================
                 MENU CATÉGORIES
========================================================= */

const categoryFilter =
document.getElementById("categoryFilter");

if(categoryFilter){

categoryFilter.addEventListener(
"change",

function(){

const category =
this.value.toLowerCase();

if(localSearch){

localSearch.value=category;

}

if(searchInput){

searchInput.value=category;

}

showResults(category);

});

}

/* ===== WHM LAUNCHER ===== */

const regions = [
  "Kaifeng",
  "Qinghe",
  "Hexi",
  "Moonveil"
];

const loadingMessages = [
  "Connexion au Jianghu...",
  "Ouverture des archives...",
  "Exploration des régions...",
  "Synchronisation des Voies...",
  "Forge de la légende..."
];

const launcher = document.getElementById("whmLauncher");
const launcherRegion = document.getElementById("launcherRegion");
const launcherFill = document.getElementById("launcherFill");
const launcherPercent = document.getElementById("launcherPercent");
const launcherEnter = document.getElementById("launcherEnter");
const launcherPlayer = document.getElementById("launcherPlayer");

let player = localStorage.getItem("whmPlayer");

if (!player) {
  player = prompt("Entre ton pseudo Discord :");

  if (!player || player.trim() === "") {
    player = "@Voyageur";
  }

  localStorage.setItem("whmPlayer", player);
}

launcherPlayer.innerHTML = "👤 Joueur détecté : " + player;

launcherRegion.innerHTML =
  "📍 Région détectée : " +
  regions[Math.floor(Math.random() * regions.length)];

let p = 0;

const interval = setInterval(() => {
  p += 2;

  launcherFill.style.width = p + "%";

  launcherPercent.innerText =
    loadingMessages[Math.floor(p / 25)] || "Bienvenue";

  if (p >= 100) {
    clearInterval(interval);
    launcherPercent.innerText = "⚔️ Bienvenue " + player + " ⚔️";
    launcherEnter.style.display = "inline-block";
  }
}, 100);

launcherEnter.onclick = () => {
  launcher.classList.add("hideWHM");
};