Formula 1 InfoHub

The Formula 1 Data API is a RESTful service built with Node.js and Express, that allows users to 
view Formula 1 Data: Drivers, Constructors, Qualifying, and Race Results.
All data is returned in JSON format.

Built With

Node.js – server-side JavaScript runtime

Express.js – web framework for routing

SQLite3 – local relational database

Deployment

API Endpoints
Endpoint	Description
/api/circuits	Get all circuits
/api/circuits/:ref	Get a specific circuit by reference
/api/constructors	Get all constructors
/api/constructors/:ref	Get a constructor by reference
/api/drivers	Get all drivers
/api/drivers/:ref	Get a driver by reference
/api/drivers/search/:substring	Search drivers by surname substring
/api/drivers/race/:raceId	Get all drivers in a specific race
/api/races/:raceId	Get a race by ID
/api/races/season/:year	Get all races from a specific year
/api/races/season/:year/:round	Get race info by year and round
/api/races/circuits/:circuitRef	Get all races at a specific circuit
/api/races/circuits/:circuitRef/season/:start/:end	Get all races at a circuit within a year range
/api/results/:raceId	Get all race results by race ID
/api/results/driver/:driverRef	Get results for a specific driver
/api/results/drivers/:driverRef/seasons/:start/:end	Get all driver results for a range of seasons
/api/qualifying/:raceId	Get qualifying results for a race
/api/standings/drivers/:raceId	Get driver standings for a race
/api/standings/constructors/:raceId	Get constructor standings for a race

Testable Links
http://localhost:8080/api/circuits
http://localhost:8080/api/circuits/monza
http://localhost:8080/api/circuits/calgary
http://localhost:8080/api/constructors
http://localhost:8080/api/constructors/ferrari
http://localhost:8080/api/drivers
http://localhost:8080/api/drivers/Norris
http://localhost:8080/api/drivers/norris
http://localhost:8080/api/drivers/connolly
http://localhost:8080/api/drivers/search/sch
http://localhost:8080/api/drivers/search/xxxxx
http://localhost:8080/api/drivers/race/1069
http://localhost:8080/api/races/1034
http://localhost:8080/api/races/season/2021
http://localhost:8080/api/races/season/1800
http://localhost:8080/api/races/season/2020/5
http://localhost:8080/api/races/season/2020/100
http://localhost:8080/api/races/circuits/7
http://localhost:8080/api/races/circuits/7/season/2015/2022
http://localhost:8080/api/races/circuits/7/season/2022/2022
http://localhost:8080/api/results/1106
http://localhost:8080/api/results/driver/max_verstappen
http://localhost:8080/api/results/driver/connolly
http://localhost:8080/api/results/drivers/sainz/seasons/2021/2022
http://localhost:8080/api/results/drivers/sainz/seasons/2035/2022
http://localhost:8080/api/qualifying/1106
http://localhost:8080/api/standings/drivers/1120
http://localhost:8080/api/standings/constructors/1120
http://localhost:8080/api/standings/constructors/asds
