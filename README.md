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
Get all circuits - /api/circuits
Get a specific circuit by reference - /api/circuits/:ref
Get all constructors - /api/constructors
Get a constructor by reference - /api/constructors/:ref
Get all drivers - /api/drivers
Get a driver by reference - /api/drivers/:ref
Search drivers by surname substring - /api/drivers/search/:substring
Get all drivers in a specific race - /api/drivers/race/:raceId
Get a race by ID - /api/races/:raceId
Get all races from a specific year - /api/races/season/:year
Get race info by year and round - /api/races/season/:year/:round
Get all races at a specific circuit - /api/races/circuits/:circuitRef
Get all races at a circuit within a year range - /api/races/circuits/:circuitRef/season/:start/:end
Get all race results by race ID - /api/results/:raceId
Get results for a specific driver - /api/results/driver/:driverRef
Get all driver results for a range of seasons - /api/results/drivers/:driverRef/seasons/:start/:end
Get qualifying results for a race - /api/qualifying/:raceId
Get driver standings for a race - /api/standings/drivers/:raceId
Get constructor standings for a race - /api/standings/constructors/:raceId

Testable Links
https://web3-1assignment.onrender.com/api/circuits
https://web3-1assignment.onrender.com/api/circuits/monza
https://web3-1assignment.onrender.com/api/circuits/calgary
https://web3-1assignment.onrender.com/api/constructors
https://web3-1assignment.onrender.com/api/constructors/ferrari
https://web3-1assignment.onrender.com/api/drivers
https://web3-1assignment.onrender.com/api/drivers/Norris
https://web3-1assignment.onrender.com/api/drivers/norris
https://web3-1assignment.onrender.com/api/drivers/connolly
https://web3-1assignment.onrender.com/api/drivers/search/sch
https://web3-1assignment.onrender.com/api/drivers/search/xxxxx
https://web3-1assignment.onrender.com/api/drivers/race/1069
https://web3-1assignment.onrender.com/api/races/1034
https://web3-1assignment.onrender.com/api/races/season/2021
https://web3-1assignment.onrender.com/api/races/season/1800
https://web3-1assignment.onrender.com/api/races/season/2020/5
https://web3-1assignment.onrender.com/api/races/season/2020/100
https://web3-1assignment.onrender.com/api/races/circuits/7
https://web3-1assignment.onrender.com/api/races/circuits/7/season/2015/2022
https://web3-1assignment.onrender.com/api/races/circuits/7/season/2022/2022
https://web3-1assignment.onrender.com/api/results/1106
https://web3-1assignment.onrender.com/api/results/driver/max_verstappen
https://web3-1assignment.onrender.com/api/results/driver/connolly
https://web3-1assignment.onrender.com/api/results/drivers/sainz/seasons/2021/2022
https://web3-1assignment.onrender.com/api/results/drivers/sainz/seasons/2035/2022
https://web3-1assignment.onrender.com/api/qualifying/1106
https://web3-1assignment.onrender.com/api/standings/drivers/1120
https://web3-1assignment.onrender.com/api/standings/constructors/1120
https://web3-1assignment.onrender.com/api/standings/constructors/asds
