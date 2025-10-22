// Create express app
const express = require("express");
const app = express();

app.use(express.json());

const provider = require("./js/f1-provider");

// root endpoint will retrieve all circuits
app.get("/api/circuits", (req, res) => {
  provider.retrieveCircuits(req, res);
});

// root endpoint will retrieve a single circuit
app.get("/api/circuits/:ref", (req, res) => {
  provider.retrieveSingleCircuit(req, res);
});

// root endpoint will all circuits within a year
app.get("/api/circuits/season/:year", (req, res) => {
  provider.retrieveCircuitsYear(req, res);
});
// root endpoint will all constructors
app.get("/api/constructors", (req, res) => {
  provider.retrieveConstructors(req, res);
});
// root endpoint a constructors with constructorRef
app.get("/api/constructors/:ref", (req, res) => { 
  provider.retrieveSingleConstructor(req, res);
});
// root endpoint will all drivers
app.get("/api/drivers", (req, res) => { 
  provider.retrieveDrivers(req, res);
});
// root endpoint single driver with driverRef
app.get("/api/drivers/:ref", (req, res) => { 
  provider.retrieveSingleDriver(req, res);
});
// root endpoint single driver with searchable surname
app.get("/api/drivers/search/:substring", (req, res) => { 
  provider.retrieveSingleDriverSearch(req, res);
});

app.get("/api/drivers/race/:raceId", (req, res) => { 
  provider.retrieveDriversRace(req, res);
});

app.get("/api/races/:raceId", (req, res) => { 
  provider.retrieveSingleRace(req, res);
});

app.get("/api/races/season/:year", (req, res) => { 
  provider.retrieveRacesYear(req, res);
});

app.get("/api/races/season/:year/:round", (req, res) => { 
  provider.retrieveRacesYearRound(req, res);
});

app.get("/api/races/circuits/:circuitRef", (req, res) => {
  provider.retrieveRacesCircuits(req, res);
});

app.get("/api/races/circuits/:circuitRef/season/:start/:end", (req, res) => {
  provider.retrieveRacesCircuitsYear(req, res);
});

app.get("/api/results/:raceid", (req,res) => {
  provider.retrieveResults(req,res);
});
app.get("/api/results/driver/:driverRef", (req,res) => {
  provider.retrieveResultsDriver(req, res);
});

app.get("/api/results/drivers/:driverRef/seasons/:start/:end", (req,res) =>{
  provider.retrieveResultsDriverYear(req, res);
});

app.get("/api/qualifying/:raceId", (req, res) =>{
  provider.retrieveQualifyingRace(req,res);
});

app.get("/api/standings/drivers/:raceId", (req,res) =>{
  provider.retrieveStandingDrivers(req,res);
});

app.get("/api/standings/constructors/:raceId", (req,res) => {
  provider.retrieveStandingConstructors(req, res);
});



// root endpoint will retrieve all races
app.get("/", (req, res) => {
  provider.retrieveRaces(req, res);
});

// 404 handler — must be LAST, and must send a response
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`Try: http://localhost:${port}/290`);
});
