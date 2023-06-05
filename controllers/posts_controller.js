const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user.id
    }).then(post => {
        res.redirect('/');
        return;
    }).catch(err => {
        if(err)
            console.log('Error in creating a post');
        return;
    });
}

module.exports.view = function(req, res){
    res.end('<h1> View Posts </h1>');
}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id).then(post => {
        // .id means converting the Object id (_id) into string
        if(post.user == req.user.id){
            post.deleteOne();
            Comment.deleteMany({post: req.params.id}).then(post => {
                return res.redirect('/');
            })
        
        }
        else{
            return res.redirect('/');
        }
    })
}