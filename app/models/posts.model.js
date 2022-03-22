module.exports = (sequelize, Sequelize) =>{
    const Posts = sequelize.define("posts", {
        title:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        madeBy:{
            type: Sequelize.STRING
        }
    });
    return Posts;
}