const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = path.join(__dirname, "../data/f1.db");
const db = new sqlite3.Database(DB_PATH);

// Retrieve all circuits
const retrieveCircuits = (req, resp) => {
  const sql = `SELECT circuitId,circuitRef,name,location,country,lat,lng,alt,url
    FROM Circuits;`;
  db.all(sql, [], (err, rows) => {
    console.log("getting all circuits...");
    const circuits = rows.map((row) => convertRecordToJsonCircuit(row));
    resp.json(circuits);
  });
};
// retrieve just a single race based on circuitRef
const retrieveSingleCircuit = (req, resp) => {
  const sql = `SELECT circuitId,circuitRef,name,location,country,lat,lng,alt,url
    FROM Circuits
    
    `;
  let mySQL = sql + " WHERE circuitRef=?";
  db.get(mySQL, [req.params.ref], (err, row) => {
    console.log("getting single circuit...");
    resp.json(convertRecordToJsonCircuit(row));
  });
};
//returns circuits based on year
const retrieveCircuitsYear = (req, resp) => {
  const sql = `
  SELECT *
  FROM Circuits c
    INNER JOIN Races r 
      ON r.circuitId = c.circuitId
    INNER JOIN Seasons s 
      ON s.year = r.year
    `;
  let mySQL = sql + " WHERE r.year=?";
  db.all(mySQL, [req.params.year], (err, rows) => {
    console.log("returning all circuits based on year");
    const circuits = rows.map((row) => convertRecordToJsonCircuit(row));
    resp.json(circuits);
  });
};
//returns all constructors
const retrieveConstructors = (req, resp) => {
  const sql = `SELECT *
    FROM Constructors
        
    `;
  db.all(sql, [], (err, rows) => {
    console.log("getting all constructors...");
    const circuits = rows.map((row) => convertRecordToJsonConstructor(row));
    resp.json(circuits);
  });
};
//returns just a single constructor based on constructorRef
const retrieveSingleConstructor = (req, resp) => {
  const sql = `SELECT *
      FROM Constructors
      
      `;
  let mySQL = sql + " WHERE constructorRef=?";
  db.get(mySQL, [req.params.ref], (err, row) => {
    console.log("getting single constructor...");
    resp.json(convertRecordToJsonConstructor(row));
  });
};
//returns all drivers
const retrieveDrivers = (req, resp) => {
  const sql = `SELECT *
      FROM Drivers
          
      `;
  db.all(sql, [], (err, rows) => {
    console.log("getting all constructors...");
    const circuits = rows.map((row) => convertRecordToJsonDriver(row));
    resp.json(circuits);
  });
};
//returns a single driver based on driverRef
const retrieveSingleDriver = (req, resp) => {
  const sql = `SELECT *
      FROM Drivers
          
      `;
  let mySQL = sql + " WHERE driverRef=?";
  db.get(mySQL, [req.params.ref], (err, row) => {
    console.log("getting single driver...");
    resp.json(convertRecordToJsonDriver(row));
  });
};
//returns a single driver based on substring for surname
const retrieveSingleDriverSearch = (req, resp) => {
  const sql = `SELECT *
      FROM Drivers
          
      `;
  let mySQL = sql + " WHERE surname LIKE ?";
  let search = req.params.substring;
  db.get(mySQL, [`%${search}%`], (err, row) => {
    console.log("getting single driver...");
    resp.json(convertRecordToJsonDriver(row));
  });
};
// retrieve just a single race based on the id
const retrieveSingleRace = (req, resp) => {
  const sql = `SELECT *
    FROM Races
        
    `;
  let mySQL = sql + " WHERE raceId=?";
  db.get(mySQL, [req.params.raceId], (err, row) => {
    console.log("getting single race...");
    resp.json(convertRecordToJsonRaces(row));
  });
};

const retrieveDriversRace = (req, resp) => {
  sql = `SELECT *, r.raceId FROM Races r
    INNER JOIN Qualifying q
      ON r.raceId = q.raceId
    INNER JOIN Drivers d
      ON q.driverId = d.driverId
  `;
  let mySQL = sql + " WHERE r.raceId=?";
  db.all(mySQL, [req.params.raceId], (err, rows) => {
    console.log("getting all drivers based on raceId...");
    const drivers = rows.map((row) => convertRecordToJsonDriver(row));
    resp.json(drivers);
  });
};

const retrieveRacesYear = (req, resp) => {
  sql = `SELECT *, r.raceId FROM Races r
    INNER JOIN Seasons s
        ON r.year = s.year
  `;
  let mySQL = sql + " WHERE r.year=? ";
  mySQL += " ORDER BY r.round";
  db.all(mySQL, [req.params.year], (err, rows) => {
    console.log("getting all drivers based on raceId...");
    const drivers = rows.map((row) => convertRecordToJsonRaces(row));
    resp.json(drivers);
  });
};

const retrieveRacesYearRound = (req, resp) => {
  sql = `SELECT *, r.raceId FROM Races r
    INNER JOIN Seasons s
        ON r.year = s.year
  `;
  let mySQL = sql + " WHERE r.year=? AND r.round = ?";
  db.get(mySQL, [req.params.year, req.params.round], (err, row) => {
    console.log("getting race based on year and round");
    resp.json(convertRecordToJsonRaces(row));
  });
};

const retrieveRacesCircuits = (req, resp) => {
  sql = `
  SELECT r.year,* FROM Circuits c
    INNER JOIN Races r
      ON c.circuitId = r.circuitId
    INNER JOIN Seasons s
     ON r.year = s.year
  `;
  const mySQL = (sql += `WHERE c.circuitRef = ? ORDER BY r.year;`);
  db.all(mySQL, [req.params.circuitRef], (err, rows) => {
    console.log("getting all races based on circuit");
    const drivers = rows.map((row) => convertRecordToJsonRaces(row));
    resp.json(drivers);
  });
};
const retrieveRacesCircuitsYear = (req, resp) => {
  sql = `SELECT * 
  FROM Circuits c
    INNER JOIN Races r
      ON c.circuitId = r.circuitId
    INNER JOIN Seasons s
      ON r.year = s.year
  `;
  let mySQL = (sql += `WHERE c.circuitRef=? AND r.year >=? AND r.year <=?
  ORDER BY r.year;`);
  db.all(
    mySQL,
    [req.params.circuitRef, req.params.start, req.params.end],
    (err, rows) => {
      invalidYearMsg(req.params.start, req.params.end, res);
      console.log("getting all circuits based on year");
      const drivers = rows.map((row) => convertRecordToJsonCircuit(row));
      resp.json(drivers);
    }
  );
};
const retrieveResults = (req, resp) => {
  sql = `SELECT re.position, d.driverRef, d.code, d.forename, d.surname,
    r.name AS raceName, r.round, r.year, r.date, c.name AS constructorName, c.constructorRef, c.nationality
 FROM Drivers d
    INNER JOIN Results re
        ON d.driverId = re.driverId
    INNER JOIN Races r
        ON r.raceId =re.raceId
    INNER JOIN Constructors c
        ON c.constructorId = re.constructorId

`;
  mySQL = sql += " WHERE r.raceId = ? ORDER BY re.grid ";
  db.all(mySQL, [req.params.raceId], (err, rows) => {
    console.log("getting all qualifyers based on raceId");
    const drivers = rows.map((row) => convertRecordToJsonSpecific(row));
    resp.json(drivers);
  });
};
const retrieveResultsDriver = (req, resp) => {
  sql = `SELECT * FROM Drivers d `;
  mySQL = sql += " WHERE d.driverRef = ? ";
  db.get(mySQL, [req.params.driverRef], (err, row) => {
    if (err) throw err;
    console.log("getting driver based on driverRef");
    resp.json(convertRecordToJsonDriver(row));
  });
};
const retrieveResultsDriverYear = (req, resp) => {
  sql = `
  SELECT* 
    FROM Drivers d
        INNER JOIN Qualifying q
        ON d.driverId = q.driverId
        INNER JOIN Races r
        ON q.raceId = r.raceId
        INNER JOIN Seasons s
        ON r.year = s.year
    `;
  let mySQL = (sql +=
    " WHERE d.driverRef = ? AND r.year >= ? AND r.year <= ? ");
  db.all(
    mySQL,
    [req.params.driverRef, req.params.start, req.params.end],
    (err, rows) => {
      invalidYearMsg(req.params.start, req.params.end, res);
      console.log("getting all qualifyers based on raceId");
      const drivers = rows.map((row) => convertRecordToJsonDriver(row));
      resp.json(drivers);
    }
  );
};
const retrieveQualifyingRace = (req, resp) => {
  sql = `SELECT * FROM Qualifying q
    INNER JOIN Races r
      ON q.raceId = r.raceId
    `;
  let mySQL = sql + `WHERE r.raceId = ? ORDER BY q.position `;
  db.all(mySQL, [req.params.raceId], (err, rows) => {
    if (err) throw err;
    console.log("getting all qualifyers based on raceId");
    const drivers = rows.map((row) => convertRecordToJsonQualifying(row));
    resp.json(drivers);
  });
};
const retrieveStandingDrivers = (req, resp) => {
  sql = `SELECT re.position, d.driverRef, d.code, d.forename, d.surname
 FROM Drivers d
    INNER JOIN Results re
        ON d.driverId = re.driverId
    INNER JOIN Races r
        ON r.raceId =re.raceId
`;
  mySQL = sql += " WHERE r.raceId = ? ORDER BY re.position";
  db.all(mySQL, [req.params.raceId], (err, rows) => {
    console.log("getting all qualifyers based on raceId");
    const drivers = rows.map((row) => convertRecordToJsonSpecific(row));
    resp.json(drivers);
  });
};
const retrieveStandingConstructors = (req, resp) => {
  sql = `SELECT c.name AS constructorName, c.constructorRef, c.nationality
 FROM Drivers d
    INNER JOIN Results re
        ON d.driverId = re.driverId
    INNER JOIN Races r
        ON r.raceId =re.raceId
    INNER JOIN Constructors c
        ON c.constructorId = re.constructorId

`;
  mySQL = sql += " WHERE r.raceId = ? ORDER BY re.position ";
  db.all(mySQL, [req.params.raceId], (err, rows) => {
    console.log("getting all constructors based on raceId");
    const drivers = rows.map((row) => convertRecordToJsonSpecific(row));
    resp.json(drivers);
  });
};

const invalidYearMsg = (start, end, res) => {
  if (end > start) {
    return res
      .status(500)
      .json({ error: "End year must be greater than start year" });
  }
};

// helper function to convert a database record into its JSON representation
const convertRecordToJsonRaces = (row) => {
  if (!row) return;
  const obj = {
    races: {
      id: row.raceId,
      round: row.round,
      circuitId: row.circuitId,
      raceName: row.name,
      date: row.date,
      time: row.time,
      url: row.url,
      year: row.year,
    },
  };
  return obj;
};
const convertRecordToJsonCircuit = (row) => {
  if (!row) return;
  const obj = {
    circuits: {
      circuitId: row.circuitId,
      circuitRef: row.circuitRef,
      name: row.name,
      location: row.location,
      country: row.country,
      lat: row.lat,
      lng: row.lng,
      url: row.url,
    },
  };
  return obj;
};
const convertRecordToJsonConstructor = (row) => {
  if (!row) return;
  return {
    constructors: {
      constructorId: row.constructorId,
      constructorRef: row.constructorRef,
      name: row.name,
      nationality: row.nationality,
      url: row.url,
    },
  };
};
const convertRecordToJsonDriver = (row) => {
  if (!row) return;
  return {
    drivers: {
      driverId: row.driverId,
      driverRef: row.driverRef,
      number: row.number,
      code: row.code,
      forename: row.forename,
      surname: row.surname,
      dob: row.dob,
      nationality: row.nationality,
      url: row.url,
    },
  };
};
const convertRecordToJsonQualifying = (row) => {
  if (!row) return;
  return {
    qualifying: {
      qualifyId: row.qualifyId,
      raceId: row.raceId,
      driverId: row.driverId,
      constructorId: row.constructorId,
      number: row.number,
      position: row.position,
      q1: row.q1,
      q2: row.q2,
      q3: row.q3,
    },
  };
};
const convertRecordToJsonSpecific = (row) => {
  if (!row) return;
  return {
    specific: {
      driverRef: row.driverRef,
      code: row.code,
      raceName: row.raceName,
      constructorRef: row.constructorRef,
      forename: row.forename,
      surname: row.surname,
      raceName: row.raceName,
      round: row.round,
      year: row.year,
      date: row.date,
      constructorName: row.constructorName,
      nationality: row.nationality,
    },
  };
};

module.exports = {
  retrieveCircuits,
  retrieveSingleCircuit,
  retrieveCircuitsYear,
  retrieveConstructors,
  retrieveDrivers,
  retrieveSingleDriverSearch,
  retrieveSingleDriver,
  retrieveSingleConstructor,
  retrieveDriversRace,
  retrieveRacesYear,
  retrieveRacesYearRound,
  retrieveRacesCircuits,
  retrieveRacesCircuitsYear,
  retrieveSingleRace,
  retrieveQualifyingRace,
  retrieveStandingDrivers,
  retrieveResults,
  retrieveStandingConstructors,
  retrieveResultsDriver,
  retrieveResultsDriverYear,
};
