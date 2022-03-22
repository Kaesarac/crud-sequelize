const dbConfig = require('../config/dbConfig');
const {Sequelize} = require('sequelize');
const dotenv = require('dotenv').config();


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./userModel")(sequelize, Sequelize);
db.role = require("./roleModel")(sequelize, Sequelize);
db.posts = require("./posts.model")(sequelize, Sequelize);
db.comments = require("./comment.model")(sequelize, Sequelize);
db.posts.hasMany(db.comments, {as: "comments"});

db.comments.belongsTo(db.posts,{
    foreignKey: "postsId",
    as: "comment",
});

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;