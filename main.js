// main.js

// أثناء التطوير محلياً:
const API_BASE_URL = "http://localhost:4000";
// بعد النشر على Render غيّر هذا إلى رابط الـ backend على Render.

// ===== Helpers =====

function getStatusEmoji(status) {
  if (!status) return "⚪";
  const s = status.toLowerCase();
  if (s.includes("non régulé")) return "🔴";
  if (s.includes("hors service")) return "🟡";
  return "🟢";
}

function buildGoogleMapsLink(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

// يحاول يقرأ lat,lng من رابط Google Maps
function parseGoogleMapsUrl(url) {
  if (!url) return null;
  // patterns مثل ...q=33.24,-8.50 أو .../@33.24,-8.50,...
  const re = /@?\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/;
  const m = url.match(re);
  if (!m) return null;
  return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
}

window.addEventListener("load", () => {
  // ===== Map init =====
  const map = L.map("map").setView([33.24, -8.5], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  const markersLayer = L.layerGroup().addTo(map);

  // ===== DOM refs =====
  const form = document.getElementById("add-form") || document.getElementById("cf-form");
  const nameInput = document.getElementById("cf-name");
  const latInput = document.getElementById("cf-lat");
  const lngInput = document.getElementById("cf-lng");
  const statusInput = document.getElementById("cf-status");
  const notesInput = document.getElementById("cf-notes");
  const northInput = document.getElementById("cf-north");
  const southInput = document.getElementById("cf-south");
  const eastInput = document.getElementById("cf-east");
  const westInput = document.getElementById("cf-west");
  const gmapsInput = document.getElementById("cf-gmaps");

  const searchInput = document.getElementById("search-term");
  const searchBtn = document.getElementById("search-btn");
  const datalist = document.getElementById("cf-datalist");

  const listContainer = document.getElementById("cf-list");
  const exportBtn = document.getElementById("export-btn");
  const jsonOutput = document.getElementById("json-output");

  let carrefours = [];
  let currentEditId = null; // null = إضافة جديد, غير null = تعديل

  // ===== Markers =====

  function addCarrefourMarker(cf) {
    if (typeof cf.lat !== "number" || typeof cf.lng !== "number") return;

    const emoji = getStatusEmoji(cf.status);

    const icon = L.divIcon({
      className: "status-marker",
      html: emoji,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const roads = cf.roads || {};
    const popupHtml = `
      <strong>${cf.id} - ${cf.name}</strong><br/>
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

    const marker = L.marker([cf.lat, cf.lng], { icon }).addTo(markersLayer);

    marker.bindPopup(popupHtml);

    // لما تضغطي على الماركر: حط البيانات في الفورم عشان تعديل سريع
    marker.on("click", () => {
      fillFormForEdit(cf);
    });
  }

  function redrawMarkers() {
    markersLayer.clearLayers();
    carrefours.forEach(addCarrefourMarker);
  }

  // ===== تحميل البيانات من الـ API =====

  async function loadCarrefours() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/carrefours`);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      carrefours = data;
      redrawMarkers();
      renderList();
      renderDatalist();
      console.log("Loaded carrefours:", carrefours.length);
    } catch (err) {
      console.error("Error loading carrefours:", err);
      alert("Erreur lors du chargement des carrefours depuis l'API.");
    }
  }

  // ===== قائمة CRUD في الـ sidebar =====

  function renderList() {
    if (!listContainer) return;
    listContainer.innerHTML = "";

    if (!carrefours.length) {
      listContainer.innerHTML = "<p>Aucun carrefour.</p>";
      return;
    }

    carrefours.forEach((cf) => {
      const row = document.createElement("div");
      row.className = "cf-row";
      row.innerHTML = `
        <div class="cf-info">
          <strong>${cf.id}</strong> – ${cf.name}
        </div>
        <div class="cf-actions">
          <button data-action="zoom" data-id="${cf.id}">Zoom</button>
          <button data-action="edit" data-id="${cf.id}">Edit</button>
          <button data-action="delete" data-id="${cf.id}">X</button>
        </div>
      `;
      listContainer.appendChild(row);
    });

    // Event delegation
    listContainer.addEventListener("click", onListClick);
  }

  function onListClick(e) {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = btn.dataset.id;
    const action = btn.dataset.action;
    const cf = carrefours.find((c) => c.id === id);
    if (!cf) return;

    if (action === "zoom") {
      map.setView([cf.lat, cf.lng], 17);
    } else if (action === "edit") {
      fillFormForEdit(cf);
      map.setView([cf.lat, cf.lng], 17);
    } else if (action === "delete") {
      if (confirm(`Supprimer ${cf.id} - ${cf.name} ?`)) {
        deleteCarrefour(cf.id);
      }
    }
  }

  // ===== datalist للبحث =====

  function renderDatalist() {
    if (!datalist) return;
    datalist.innerHTML = "";
    carrefours.forEach((cf) => {
      const opt = document.createElement("option");
      opt.value = `${cf.id}, ${cf.name}`;
      datalist.appendChild(opt);
    });
  }

  // ===== البحث =====

  function searchCarrefour() {
    if (!searchInput) return;
    const term = searchInput.value.trim().toLowerCase();
    if (!term) return;

    const cf =
      carrefours.find(
        (c) =>
          c.id.toLowerCase() === term ||
          c.name.toLowerCase().includes(term)
      ) ||
      carrefours.find((c) =>
        `${c.id}, ${c.name}`.toLowerCase().includes(term)
      );

    if (!cf) {
      alert("Aucun carrefour trouvé.");
      return;
    }

    map.setView([cf.lat, cf.lng], 17);
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      searchCarrefour();
    });
  }

  // ===== تعبئة الفورم للتعديل =====

  function fillFormForEdit(cf) {
    currentEditId = cf.id;
    if (nameInput) nameInput.value = cf.name || "";
    if (latInput) latInput.value = cf.lat;
    if (lngInput) lngInput.value = cf.lng;
    if (statusInput) statusInput.value = cf.status || "équipé en service";
    if (notesInput) notesInput.value = cf.notes || "";

    const r = cf.roads || {};
    if (northInput) northInput.value = r.north || "";
    if (southInput) southInput.value = r.south || "";
    if (eastInput) eastInput.value = r.east || "";
    if (westInput) westInput.value = r.west || "";
  }

  function resetForm() {
    currentEditId = null;
    if (form) form.reset();
    if (statusInput) statusInput.value = "équipé en service";
  }

  // ===== كليك على الخريطة → يملأ lat/lng =====

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    if (latInput) latInput.value = lat.toFixed(6);
    if (lngInput) lngInput.value = lng.toFixed(6);
  });

  // ===== قراءة lat/lng من رابط Google Maps =====

  if (gmapsInput) {
    gmapsInput.addEventListener("change", () => {
      const val = gmapsInput.value.trim();
      const parsed = parseGoogleMapsUrl(val);
      if (parsed) {
        if (latInput) latInput.value = parsed.lat.toFixed(6);
        if (lngInput) lngInput.value = parsed.lng.toFixed(6);
      } else {
        alert("Impossible de lire les coordonnées depuis ce lien.");
      }
    });
  }

  // ===== CRUD: create / update =====

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = nameInput?.value.trim();
      const lat = parseFloat(latInput?.value);
      const lng = parseFloat(lngInput?.value);
      const status = statusInput?.value || "équipé en service";
      const notes = (notesInput?.value || "").trim();
      const north = northInput?.value.trim() || "";
      const south = southInput?.value.trim() || "";
      const east = eastInput?.value.trim() || "";
      const west = westInput?.value.trim() || "";

      if (!name || isNaN(lat) || isNaN(lng)) {
        alert("Nom, latitude et longitude sont obligatoires.");
        return;
      }

      const payload = {
        name,
        lat,
        lng,
        status,
        notes,
        roads: { north, south, east, west }
      };

      try {
        let res;
        if (currentEditId) {
          // update
          res = await fetch(`${API_BASE_URL}/api/carrefours/${currentEditId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
        } else {
          // create
          res = await fetch(`${API_BASE_URL}/api/carrefours`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
        }

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Erreur lors de l'enregistrement.");
        }

        await loadCarrefours();
        resetForm();
        alert("Carrefour sauvegardé sur le serveur.");
      } catch (err) {
        console.error(err);
        alert("Erreur: " + err.message);
      }
    });
  }

  async function deleteCarrefour(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/carrefours/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Erreur lors de la suppression.");
      }
      await loadCarrefours();
    } catch (err) {
      console.error(err);
      alert("Erreur: " + err.message);
    }
  }

  // ===== Export JSON =====

  if (exportBtn && jsonOutput) {
    exportBtn.addEventListener("click", () => {
      const json = JSON.stringify(carrefours, null, 2);
      jsonOutput.value = json;
    });
  }

  // ===== أول تحميل =====
  loadCarrefours();
});
