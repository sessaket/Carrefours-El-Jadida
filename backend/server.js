// backend/server.js
//
// Simple REST API for Carrefours El Jadida
// Endpoints:
//   GET    /api/carrefours
//   POST   /api/carrefours
//   PUT    /api/carrefours/:id
//   DELETE /api/carrefours/:id

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// ---- CORS (allow everything: file:// + localhost + GitHub Pages) ----
app.use(cors());
app.use(express.json());

// ---- Data helpers ----
const DATA_FILE = path.join(__dirname, "carrefours.json");

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading data file:", err);
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

function generateId(data) {
  const nums = data
    .map((c) => {
      const m = String(c.id || "").match(/cf_(\d+)/);
      return m ? parseInt(m[1], 10) : 0;
    })
    .filter((n) => !isNaN(n));

  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return "cf_" + String(next).padStart(2, "0");
}

// ---- Routes ----
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Carrefours API running" });
});

app.get("/api/carrefours", (req, res) => {
  const data = readData();
  res.json(data);
});

app.post("/api/carrefours", (req, res) => {
  const data = readData();

  const {
    name,
    lat,
    lng,
    status = "équipé en service",
    notes = "",
    roads = {}
  } = req.body || {};

  if (!name || typeof lat !== "number" || typeof lng !== "number") {
    return res
      .status(400)
      .json({ error: "name, lat and lng are required and must be valid." });
  }

  const newCf = {
    id: generateId(data),
    name,
    lat,
    lng,
    status,
    notes,
    roads: {
      north: roads.north || "",
      south: roads.south || "",
      east: roads.east || "",
      west: roads.west || ""
    }
  };

  data.push(newCf);
  writeData(data);

  res.status(201).json(newCf);
});

app.put("/api/carrefours/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();

  const index = data.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Carrefour not found" });
  }

  const existing = data[index];
  const {
    name,
    lat,
    lng,
    status,
    notes,
    roads = {}
  } = req.body || {};

  const updated = {
    ...existing,
    name: name !== undefined ? name : existing.name,
    lat: typeof lat === "number" ? lat : existing.lat,
    lng: typeof lng === "number" ? lng : existing.lng,
    status: status !== undefined ? status : existing.status,
    notes: notes !== undefined ? notes : existing.notes,
    roads: {
      north: roads.north !== undefined ? roads.north : existing.roads.north,
      south: roads.south !== undefined ? roads.south : existing.roads.south,
      east: roads.east !== undefined ? roads.east : existing.roads.east,
      west: roads.west !== undefined ? roads.west : existing.roads.west
    }
  };

  data[index] = updated;
  writeData(data);

  res.json(updated);
});

app.delete("/api/carrefours/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Carrefour not found" });
  }

  const removed = data.splice(index, 1)[0];
  writeData(data);
  res.json({ success: true, removed });
});

// ---- Start server ----
app.listen(PORT, () => {
  console.log(`Carrefours API running on port ${PORT}`);
});
