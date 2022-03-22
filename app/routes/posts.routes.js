module.exports = app => {
    const posts = require("../controllers/posts.controller");
    const auth = require("../middleware/authJwt");
    var router = require("express").Router();

    router.post("/createpost", function(req,res){
        auth, posts.createPost});
    router.post("/createcomment", function(req, res){
        auth, posts.createComment});
    router.put("/:id/update", function(req, res){
            auth, posts.update});
    router.delete("/:id/delete", function(req, res){
            auth, posts.delete})
            
    router.get("/:id/findcomment", posts.findAllComments);
    router.get("/findall", posts.findAll);
    router.get("/:id/findone", posts.findOne);
    
    app.use('/api/posts', router);
};