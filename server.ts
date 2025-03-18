import express from "express";
import { Fighter, Team } from "./types";
import path from "path";

const app = express();
const PORT = 3000;
const JSON_URL_FIGHTERS =
  "https://raw.githubusercontent.com/Serhathub/UFC_Project_WebOntwikkeling/refs/heads/main/fighters.json";
const JSON_URL_TEAMS = 
  "https://raw.githubusercontent.com/Serhathub/UFC_Project_WebOntwikkeling/refs/heads/main/teams.json"
async function fetchFighters(): Promise<Fighter[]> {
  try {
    const res = await fetch(JSON_URL_FIGHTERS);
    if (res.ok == false)
      throw new Error("Kan de gegeven JSON gegevens voor de vechters niet ophalen.");
    return await res.json();
  } catch (error) {
    console.error("Fout bij het ophalen van de JSON: ", error);
    return [];
  }
}

async function fetchTeams(): Promise<Team[]>{
    try {
        const res = await fetch(JSON_URL_TEAMS);
        if (res.ok == false)
          throw new Error("Kan de gegeven JSON gegevens voor de teams niet ophalen.");
        return await res.json();
      } catch (error) {
        console.error("Fout bij het ophalen van de JSON: ", error);
        return [];
      }
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  const fighters = await fetchFighters();
  res.render("index", { fighters, pageTitle: "UFC Fighters" });
});

app.get("/fighter/:id", async (req, res) => {
  const fighterId = parseInt(req.params.id);
  const fighters = await fetchFighters();
  const fighter = fighters.find((f) => f.id === fighterId);
  res.render("fighter", { fighter, pageTitle: "UFC Fighters" });
});
app.get("/teams", async (req, res) => {
    const teams = await fetchTeams();
    res.render("index", { teams, pageTitle: "UFC Teams" });
  });
app.get("/team/:id", async (req, res) => {
    const fighterId = parseInt(req.params.id);
    const fighters = await fetchFighters();
    const fighter = fighters.find((f) => f.id === fighterId);
    res.render("fighter", { fighter, pageTitle: "UFC Teams" });
  });
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
