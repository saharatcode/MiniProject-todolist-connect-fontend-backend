const db = require('./models/index')

db.sequelize.sync().then( ()=> {
    console.log("Database is sync")
    console.log("-------------------------------------------")
    console.log(model)
})