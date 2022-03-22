const express = require('express')
const cors = require('cors')
const Sequelize = require('sequelize')

const app = express()

var corsOptions = {
    origin: 'https://localhost:3000'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const db = require('./app/models');
const controller = require('./app/controllers/posts.controller');
const { role } = require('./app/models')
const run = async () => {
db.sequelize.sync().then(() =>{
    console.log('Drop and Resync DB');
    run();
});
};
db.sequelize.sync();

function initial(){
    role.create({
        id: 1,
        name: 'user'
    });
    role.create({
        id: 2,
        name: 'moderator'
    });
    role.create({
        id: 3,
        name: 'admin'
    });
}

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.get('/', (req, res) => {
    res.json({ message: 'hellooooooo'})
})

require("./app/routes/posts.routes")(app);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})