const express = require('express')
const app = express()
app.use(express.json())
const {open} = require('sqlite')
const driver = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname, 'cricketTeam.db')
module.exports = app
let db = null
const intializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: driver.Database,
    })

    app.listen(3000, () => {
      console.log('server is running in the 3000')
    })
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}
intializeDBAndServer()
//API for players list_of_objects
app.get('/players/', async (request, response) => {
  const player = `SELECT * 
                  FROM cricket_team;`
  const playerDetails = await db.all(player)
  console.log(playerDetails)
})
