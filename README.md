# Documentation

## Description

Generate invoices from provided test data.

## Prerequisites

- Node.js 8.x or above

## Local Deployment

```
open a Terminal session
git clone https://github.com/codeg33k/hireupau-backend-assessment.git
cd hireupau-backend-assessment
npm i
npm start
```

## Test Routes

- Using curl

```
open a new Terminal session
curl http://localhost:3000/bookings
curl http://localhost:3000/invoices
curl http://localhost:3000/bookings/4
```

- Using Postman

```
open Postman
GET http://localhost:3000/bookings
GET http://localhost:3000/invoices
GET http://localhost:3000/bookings/5
```

- Using a web browser

```
Navigate to any of the following uri's:
http://localhost:3000/bookings
http://localhost:3000/invoices
http://localhost:3000/bookings/4

http://hireup.codegeeks.it/bookings
http://hireup.codegeeks.it/invoices
http://hireup.codegeeks.it/bookings/2
```

## Notes

There are a number of things I would do differently given some time.

- http status error handling using error handling middleware
- unit tests with mocha or jest
- add swagger API documentation
- break up index.js into models, controllers, routes and utils as more routes are written
- use persistent storage
- implement model validation
- setup docker deployment

Lessons learned:

- Be more aware of float related errors and calculations in JavaScript
- Parsing times into a usable format can be tricky without moment.js
- Try not to over-engineer
