const Post = require('../models/post');
// const User = require('../models/user');

module.exports.create = function(req, res){
    if(req.isAuthenticated()){
        Post.create({
            content: req.body.content,
            user: req.user._id
        }).then(post => {
            res.redirect('back');
            return;
        }).catch(err => {
            if(err)
                console.log('Error in creating a post');
            return;
        })
    }

    console.log('Sign In first to be able to post something');
    return res.redirect('/users/sign-in');
}

module.exports.view = function(req, res){
    res.end('<h1> View Posts </h1>');
}