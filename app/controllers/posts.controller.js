const db = require("../models");
const posts = db.posts;
const comment = db.comments;

// CRUD
exports.createPost = (req, res) =>{
    if(!req.body.title){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const posts = {
        title: req.body.title,
        description: req.body.description,
        madeBy: req.body.madeBy ? req.body.madeBy : false
    };

    posts.create(posts)
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while making your new post."
        });
    });
};

exports.findAll = (req, res) =>{
    const title = req.query.title;
    var condition = title ? {title: {[Op.iLike]: `%${title}%`}} : null;
    posts.findAll({where: condition})
    .then(data => {
        res.send(data);  
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while making your request."
        });
    });
};

exports.findOne = (req, res) =>{
    const id = req.params.id;
    posts.findByPk(id)
    .then(data =>{
        if(data){
            res.send(data);
        }else {
            res.status(404).send({
                message: `Cannot find Posts with id = ${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while making your request."
        });
    });
};

exports.update = (req,res) => {
    const id = req.params.id;
    posts.update(req.body, {
        where: { id: id}
    })
    .then(num => {
        if(num == 1){
            res.send({message: "Post updated successfully!"
        });
        } else{
            res.send({
                message: "Failed to Update. Please check the ID of the Post, also make sure the Body isn't empty."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while making your request."
        });
    });
};

exports.delete = (req,res) => {
    const id = req.params.id;
    posts.destroy({
        where: { id: id}
    })
    .then(num => {
        if (num == 1) {
        res.send({
            message: "Post deleted successfully."
        });
     }else {
        res.send({
            message: "Cannot Delete. Please check the ID."
        });
    }
})
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while making your request."
        });
    });
}

//Comments

exports.createComment = (postsId, comment) => {
    return Comment.create({
        name: comment.name,
        text: comment.text,
        postsId: postsId,
    })
    .then((comment) =>{
        console.log(">>Created Comment: " + JSON.stringify(comment, null, 4));
        return comment;
    })
    .catch((err)=>{
        console.log("Error: ", err);
    });
};

exports.findAllComments = () =>{
    return posts.findAll({
        include: ["comments"],
    }).then((posts)=>{
        return posts;
    });
};