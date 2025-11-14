// main.js

// ----------------------
// Données des carrefours (défaut = 27 points de base)
// ----------------------
const CARREFOURS = [
  {
    "id": "cf_01",
    "name": "Av. Houmane Al Fatouaki * Av. Houmane Al Fatouaki",
    "lat": 33.2418269,
    "lng": -8.503675,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. Houmane Al Fatouaki",
      "south": "Av. Houmane Al Fatouaki",
      "east": "Av. Varennes",
      "west": "Av. Varennes"
    }
  },
  {
    "id": "cf_02",
    "name": "Av. Mohamed V * Av. Bir Anzarane",
    "lat": 33.2420435,
    "lng": -8.497896,
    "status": "non régulé",
    "notes": "",
    "roads": {
      "north": "Av. Mohamed V",
      "south": "Av. Bir Anzarane",
      "east": "Al Massira Al Khadra / Av. Annakhil",
      "west": "Av. Varennes / Av. Al Moukawama"
    }
  },
  {
    "id": "cf_03",
    "name": "Av. Mohamed VI * Av. des Nations Unies",
    "lat": 33.2442216,
    "lng": -8.4949658,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. Mohamed VI",
      "south": "Av. des Nations Unies",
      "east": "Bd Mohamed V",
      "west": "Av. Annakhil"
    }
  },
  {
    "id": "cf_04",
    "name": "Av. Mohamed VI * Av. Mohamed VI",
    "lat": 33.2491338,
    "lng": -8.4989134,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. Mohamed VI",
      "south": "Av. Mohamed VI",
      "east": "Av. des Forces Armées Royales",
      "west": "Av. des Forces Armées Royales"
    }
  },
  {
    "id": "cf_05",
    "name": "Av. Abderrahmane Doukkali * Av. Ben Badis",
    "lat": 33.2481972,
    "lng": -8.5177028,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. Abderrahmane Doukkali",
      "south": "Av. Ben Badis",
      "east": "Av. Attahrir",
      "west": "Av. Attahrir"
    }
  },
  {
    "id": "cf_06",
    "name": "Av. Attahrir * Av. Annakhil",
    "lat": 33.2445235,
    "lng": -8.5137567,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. Attahrir",
      "south": "Av. Annakhil",
      "east": "Av. Attahrir",
      "west": "Av. Annakhil"
    }
  },
  {
    "id": "cf_07",
    "name": "Av. Annakhil * Av. Bir Anzarane",
    "lat": 33.2347906,
    "lng": -8.5030224,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. Annakhil",
      "south": "Av. Bir Anzarane",
      "east": "Av. des Forces Armées Royales",
      "west": "Av. des Nations Unies"
    }
  },
  {
    "id": "cf_08",
    "name": "Av. Annakhil * Bd Mohamed V",
    "lat": 33.230116,
    "lng": -8.4977626,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. Annakhil",
      "south": "Bd Mohamed V",
      "east": "33°13'48.6 N 8°29'51.0 W",
      "west": "Av. Mohamed V"
    }
  },
  {
    "id": "cf_09",
    "name": "Av. Attahrir * Rue Al Khawarizmi",
    "lat": 33.226471,
    "lng": -8.4934644,
    "status": "non régulé",
    "notes": "",
    "roads": {
      "north": "Av. Attahrir",
      "south": "Rue Al Khawarizmi",
      "east": "Av. Abderrahmane Doukkali",
      "west": "Rue Ibn Batouta"
    }
  },
  {
    "id": "cf_10",
    "name": "Av. Attahrir * Rue Ibn Batouta",
    "lat": 33.2296621,
    "lng": -8.4880649,
    "status": "non régulé",
    "notes": "",
    "roads": {
      "north": "Av. Attahrir",
      "south": "Rue Ibn Batouta",
      "east": "Av. Bir Anzarane",
      "west": "Rue Al Mouatamid Ibn Abbad"
    }
  },
  {
    "id": "cf_11",
    "name": "Av. Bir Anzarane * Rue Ibn Khaldoun",
    "lat": 33.2366353,
    "lng": -8.482926,
    "status": "non régulé",
    "notes": "",
    "roads": {
      "north": "Av. Bir Anzarane",
      "south": "Rue Ibn Khaldoun",
      "east": "Rue Ibn Toufail",
      "west": "Av. Annakhil"
    }
  },
  {
    "id": "cf_12",
    "name": "Av. Mohamed V * Av. des Nations Unies",
    "lat": 33.2333367,
    "lng": -8.4932917,
    "status": "non régulé",
    "notes": "",
    "roads": {
      "north": "Av. Mohamed V",
      "south": "Av. des Nations Unies",
      "east": "Bd Mohamed V",
      "west": "33.233333, -8.493801"
    }
  },
  {
    "id": "cf_13",
    "name": "Bd Mohamed V * Av. Moulay Abdellah",
    "lat": 33.2460231,
    "lng": -8.5064472,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Bd Mohamed V",
      "south": "Av. Moulay Abdellah",
      "east": "Rue Oued Fès",
      "west": "Av. Mohamed V"
    }
  },
  {
    "id": "cf_14",
    "name": "Av. Mohamed V * Rue Oued Fès",
    "lat": 33.2484869,
    "lng": -8.5099426,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. Mohamed V",
      "south": "Rue Oued Fès",
      "east": "Av. Moulay Abdellah",
      "west": "Rue Chouhadae"
    }
  },
  {
    "id": "cf_15",
    "name": "Av. Mohamed V * Rue Chouhadae",
    "lat": 33.2476372,
    "lng": -8.5094453,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. Mohamed V",
      "south": "Rue Chouhadae",
      "east": "Rue Ibn Khaldoun",
      "west": "Rue Essafa"
    }
  },
  {
    "id": "cf_16",
    "name": "Rue Ibn Khaldoun * Rue Essafa",
    "lat": 33.250619,
    "lng": -8.5035495,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Rue Ibn Khaldoun",
      "south": "Rue Essafa",
      "east": "Rue El Massira",
      "west": "Rue Chouhadae"
    }
  },
  {
    "id": "cf_17",
    "name": "Rue Essafa * Av. Bir Anzarane",
    "lat": 33.2459158,
    "lng": -8.5116382,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Rue Essafa",
      "south": "Av. Bir Anzarane",
      "east": "Rue Ibn Khaldoun",
      "west": "Av. Al Moukawama"
    }
  },
  {
    "id": "cf_18",
    "name": "Av. Bir Anzarane * Rue Ibn Toufail",
    "lat": 33.2445659,
    "lng": -8.5132774,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. Bir Anzarane",
      "south": "Rue Ibn Toufail",
      "east": "Rue Ibn Khaldoun",
      "west": "Rue Ibn Batouta"
    }
  },
  {
    "id": "cf_19",
    "name": "Av. Al Moukawama * Rue Ibn Batouta",
    "lat": 33.2454445,
    "lng": -8.5202514,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. Al Moukawama",
      "south": "Rue Ibn Batouta",
      "east": "Rue Al Khawarizmi",
      "west": "Rue Ibn Toufail"
    }
  },
  {
    "id": "cf_20",
    "name": "Rue Al Khawarizmi * Av. Bir Anzarane",
    "lat": 33.2439803,
    "lng": -8.5222296,
    "status": "équipé hors service",
    "notes": "",
    "roads": {
      "north": "Rue Al Khawarizmi",
      "south": "Av. Bir Anzarane",
      "east": "Rue Ibn Batouta",
      "west": "Rue Ibn Khaldoun"
    }
  },
  {
    "id": "cf_21",
    "name": "Av. Mohamed V * Rue Annasr",
    "lat": 33.2423629,
    "lng": -8.5245102,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Petite voie interne menant vers Centre Loubna de kinésithérapie 33.242442, -8.524460",
      "south": "Rue Annasr",
      "east": "33.242470, -8.524259",
      "west": "Une autre sortie non nommée qui rejoint R301: 33.242287, -8.524856  "
    }
  },
  {
    "id": "cf_22",
    "name": "Bd Mohamed V * Rue Al Mouatamid Ibn Abbad",
    "lat": 33.2399046,
    "lng": -8.5291099,
    "status": "équipé hors service",
    "notes": "",
    "roads": {
      "north": "Bd Mohamed V",
      "south": "Rue Al Mouatamid Ibn Abbad",
      "east": "Rue Essafa",
      "west": "Rue Chouhadae"
    }
  },
  {
    "id": "cf_23",
    "name": "Rue Al Mouatamid Ibn Abbad * Rue Chouhadae",
    "lat": 33.2379066,
    "lng": -8.5315545,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Rue Al Mouatamid Ibn Abbad",
      "south": "Rue Chouhadae",
      "east": "Rue Essafa",
      "west": "33°14'15.1 N 8°31'53.4 W"
    }
  },
  {
    "id": "cf_24",
    "name": "Rue Ibn Khaldoun * Rue Al Mouatamid Ibn Abbad",
    "lat": 33.2359607,
    "lng": -8.5337475,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Rue Ibn Khaldoun",
      "south": "Rue Al Mouatamid Ibn Abbad",
      "east": "Rue Essafa",
      "west": "Rue Ibn Toufail"
    }
  },
  {
    "id": "cf_25",
    "name": "Av. des Forces Armées Royales * Av. des Forces Armées Royales",
    "lat": 33.2474473,
    "lng": -8.5031953,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. des Forces Armées Royales",
      "south": "Av. des Forces Armées Royales",
      "east": "Av. Ibn Khaldoun",
      "west": "Av. Ibn Khaldoun"
    }
  },
  {
    "id": "cf_26",
    "name": "Av. Mohamed V * Av. Mohamed V",
    "lat": 33.2481271,
    "lng": -8.5009615,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. Mohamed V",
      "south": "Av. Mohamed V",
      "east": "Av. des Forces Armées Royales",
      "west": "Av. des Forces Armées Royales"
    }
  },
  {
    "id": "cf_27",
    "name": "Av. des Nations Unies * Av. des Nations Unies",
    "lat": 33.2441704,
    "lng": -8.4878054,
    "status": "équipé en service",
    "notes": "",
    "roads": {
      "north": "Av. des Nations Unies",
      "south": "Av. des Nations Unies",
      "east": "Av. Al Oumam Al Moutahida",
      "west": "Av. Setes"
    }
  }
];

// ----------------------
// Local Storage
// ----------------------
const STORAGE_KEY = "eljadida_carrefours_v1";

let carrefours = []; // المتغير اللي نشتغل عليه فعلياً

function loadCarrefoursFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // أول مرة: نستخدم الديفولت ثم نحفظه في storage
      carrefours = [...CARREFOURS];
      saveCarrefoursToStorage();
      return;
    }
    const data = JSON.parse(raw);
    if (Array.isArray(data) && data.length > 0) {
      carrefours = data;
    } else {
      carrefours = [...CARREFOURS];
      saveCarrefoursToStorage();
    }
  } catch (e) {
    console.error("Erreur de lecture localStorage:", e);
    carrefours = [...CARREFOURS];
    saveCarrefoursToStorage();
  }
}

function saveCarrefoursToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrefours));
  } catch (e) {
    console.error("Erreur de sauvegarde localStorage:", e);
  }
}

// ----------------------
// Helpers
// ----------------------
function getStatusEmoji(status) {
  if (!status) return "⚪";
  const s = status.toLowerCase();
  if (s.includes("non régulé")) return "🔴";
  if (s.includes("hors service")) return "🟡";
  return "🟢"; // par défaut: équipé en service
}

function buildGoogleMapsLink(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

// parse "lat,lng" OR Google Maps link
function parseLatLngInput(raw) {
  if (!raw) return null;
  let s = raw.trim();

  const qIndex = s.indexOf("q=");
  if (qIndex !== -1) {
    s = s.substring(qIndex + 2);
  }

  s = s.split("&")[0];
  s = s.replace(/\s+/g, ",");

  const parts = s.split(",");
  if (parts.length < 2) return null;

  const lat = parseFloat(parts[0]);
  const lng = parseFloat(parts[1]);
  if (isNaN(lat) || isNaN(lng)) return null;

  return { lat, lng };
}

// générer un nouvel ID unique cf_XX
function generateNewId() {
  let max = 0;
  for (const cf of carrefours) {
    const m = /^cf_(\d+)$/.exec(cf.id);
    if (m) {
      const n = parseInt(m[1], 10);
      if (!isNaN(n) && n > max) max = n;
    }
  }
  const next = max + 1;
  return `cf_${String(next).padStart(2, "0")}`;
}

// ----------------------
// Init map
// ----------------------
const map = L.map("map").setView([33.24, -8.50], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const markersLayer = L.layerGroup().addTo(map);
const markerById = new Map();

// ----------------------
// Charger les carrefours (avec localStorage)
// ----------------------
loadCarrefoursFromStorage();

function createPopupHtml(cf) {
  const emoji = getStatusEmoji(cf.status);
  const roads = cf.roads || {};
  return `
    <strong>${cf.name}</strong><br/>
    <b>ID:</b> ${cf.id}<br/>
    <b>Statut:</b> ${cf.status} ${emoji}<br/>
    <b>Nord:</b> ${roads.north || ""}<br/>
    <b>Sud:</b> ${roads.south || ""}<br/>
    <b>Est:</b> ${roads.east || ""}<br/>
    <b>Ouest:</b> ${roads.west || ""}<br/>
    <b>Lat/Lng:</b> ${cf.lat.toFixed(6)}, ${cf.lng.toFixed(6)}<br/>
    <a href="${buildGoogleMapsLink(cf.lat, cf.lng)}" target="_blank">
      Ouvrir dans Google Maps
    </a>
  `;
}

function addCarrefourMarker(cf) {
  const emoji = getStatusEmoji(cf.status);

  const icon = L.divIcon({
    className: "status-marker",
    html: emoji,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  const popupHtml = createPopupHtml(cf);

  const marker = L.marker([cf.lat, cf.lng], { icon })
    .addTo(markersLayer)
    .bindPopup(popupHtml);

  markerById.set(cf.id, marker);
}

function removeCarrefourMarker(id) {
  const marker = markerById.get(id);
  if (marker) {
    markersLayer.removeLayer(marker);
    markerById.delete(id);
  }
}

// mettre tous les markers existants
carrefours.forEach(addCarrefourMarker);

// ----------------------
// Search
// ----------------------
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResult = document.getElementById("search-result");

function runSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    searchResult.textContent = "اكتب ID أو اسم carrefour.";
    return;
  }

  const matches = carrefours.filter((cf) =>
    cf.id.toLowerCase().includes(q) ||
    cf.name.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    searchResult.textContent = "مافي أي résultat لهذا البحث.";
    return;
  }

  const first = matches[0];
  const marker = markerById.get(first.id);
  if (marker) {
    const latlng = marker.getLatLng();
    map.setView(latlng, 17);
    marker.openPopup();
  }

  if (matches.length === 1) {
    searchResult.textContent = `1 résultat: ${first.id} – ${first.name}`;
  } else {
    searchResult.textContent = `${matches.length} résultats. Zoom sur: ${first.id}.`;
  }
}

searchBtn.addEventListener("click", runSearch);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") runSearch();
});

// ----------------------
// Liste + CRUD
// ----------------------
const cfListEl = document.getElementById("cf-list");
let editingId = null;

function renderCarrefoursList() {
  cfListEl.innerHTML = "";
  carrefours.forEach((cf) => {
    const item = document.createElement("div");
    item.className = "cf-item";

    const emoji = getStatusEmoji(cf.status);

    item.innerHTML = `
      <div class="cf-main">
        <span class="cf-emoji">${emoji}</span>
        <span class="cf-title">${cf.id} – ${cf.name}</span>
      </div>
      <div class="cf-actions">
        <button type="button" class="cf-zoom" data-id="${cf.id}">Zoom</button>
        <button type="button" class="cf-edit" data-id="${cf.id}">Edit</button>
        <button type="button" class="cf-delete" data-id="${cf.id}">Supprimer</button>
      </div>
    `;

    cfListEl.appendChild(item);
  });

  // attach handlers
  cfListEl.querySelectorAll(".cf-zoom").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const cf = carrefours.find((c) => c.id === id);
      const marker = markerById.get(id);
      if (cf && marker) {
        map.setView([cf.lat, cf.lng], 17);
        marker.openPopup();
      }
    });
  });

  cfListEl.querySelectorAll(".cf-edit").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      startEditCarrefour(id);
    });
  });

  cfListEl.querySelectorAll(".cf-delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      deleteCarrefour(id);
    });
  });
}

renderCarrefoursList();

// remplir le formulaire pour éditer
function startEditCarrefour(id) {
  const cf = carrefours.find((c) => c.id === id);
  if (!cf) return;

  editingId = id;

  document.getElementById("cf-name").value = cf.name;
  document.getElementById("cf-status").value = cf.status;
  document.getElementById("cf-notes").value = cf.notes || "";
  document.getElementById("cf-north").value = (cf.roads && cf.roads.north) || "";
  document.getElementById("cf-south").value = (cf.roads && cf.roads.south) || "";
  document.getElementById("cf-east").value = (cf.roads && cf.roads.east) || "";
  document.getElementById("cf-west").value = (cf.roads && cf.roads.west) || "";

  latInput.value = cf.lat.toFixed(6);
  lngInput.value = cf.lng.toFixed(6);
  locInput.value = `${cf.lat.toFixed(6)},${cf.lng.toFixed(6)}`;

  submitBtn.textContent = "Mettre à jour le carrefour";
}

// supprimer
function deleteCarrefour(id) {
  if (!confirm("Supprimer ce carrefour ?")) return;

  carrefours = carrefours.filter((c) => c.id !== id);
  removeCarrefourMarker(id);
  saveCarrefoursToStorage();

  if (editingId === id) {
    editingId = null;
    form.reset();
    submitBtn.textContent = "Ajouter le carrefour";
  }

  renderCarrefoursList();
}

// ----------------------
// Formulaire "Ajouter / Modifier"
// ----------------------
const form = document.getElementById("add-form");
const locInput = document.getElementById("cf-location");
const latInput = document.getElementById("cf-lat");
const lngInput = document.getElementById("cf-lng");
const submitBtn = document.getElementById("cf-submit-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("cf-name").value.trim();
  let lat = latInput.value === "" ? NaN : parseFloat(latInput.value);
  let lng = lngInput.value === "" ? NaN : parseFloat(lngInput.value);
  const status = document.getElementById("cf-status").value;
  const notes = document.getElementById("cf-notes").value.trim();

  const north = document.getElementById("cf-north").value.trim();
  const south = document.getElementById("cf-south").value.trim();
  const east = document.getElementById("cf-east").value.trim();
  const west = document.getElementById("cf-west").value.trim();

  // si lat/lng vides, essayer de parser cf-location
  if ((isNaN(lat) || isNaN(lng)) && locInput.value.trim() !== "") {
    const parsed = parseLatLngInput(locInput.value.trim());
    if (parsed) {
      lat = parsed.lat;
      lng = parsed.lng;
      latInput.value = lat.toFixed(6);
      lngInput.value = lng.toFixed(6);
    }
  }

  if (!name || isNaN(lat) || isNaN(lng)) {
    alert("Nom, latitude et longitude (ou lien valide) sont obligatoires.");
    return;
  }

  if (editingId) {
    // UPDATE
    const idx = carrefours.findIndex((c) => c.id === editingId);
    if (idx === -1) return;

    const updated = {
      ...carrefours[idx],
      name,
      lat,
      lng,
      status,
      notes,
      roads: { north, south, east, west },
    };

    carrefours[idx] = updated;

    // mettre à jour le marker
    removeCarrefourMarker(editingId);
    addCarrefourMarker(updated);
    saveCarrefoursToStorage();

    editingId = null;
    submitBtn.textContent = "Ajouter le carrefour";
    alert("Carrefour mis à jour.");
  } else {
    // CREATE
    const newId = generateNewId();

    const newCarrefour = {
      id: newId,
      name,
      lat,
      lng,
      status,
      notes,
      roads: {
        north,
        south,
        east,
        west,
      },
    };

    carrefours.push(newCarrefour);
    addCarrefourMarker(newCarrefour);
    saveCarrefoursToStorage();

    alert("Carrefour ajouté.");
  }

  map.setView([lat, lng], 16);

  form.reset();
  document.getElementById("cf-status").value = "équipé en service";
  latInput.value = "";
  lngInput.value = "";
  locInput.value = "";

  renderCarrefoursList();
});

// ----------------------
// Click sur la carte -> pré-remplir lat/lng
// ----------------------
map.on("click", (e) => {
  const { lat, lng } = e.latlng;
  latInput.value = lat.toFixed(6);
  lngInput.value = lng.toFixed(6);
  locInput.value = `${lat.toFixed(6)},${lng.toFixed(6)}`;
});

// ----------------------
// Export JSON
// ----------------------
const exportBtn = document.getElementById("export-btn");
const jsonOutput = document.getElementById("json-output");

exportBtn.addEventListener("click", () => {
  const json = JSON.stringify(carrefours, null, 2);
  jsonOutput.value = json;
});
