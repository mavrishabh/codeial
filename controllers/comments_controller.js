const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post).then(post => {
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then(comment => {
                // updating a value for the first time
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    });
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id).then(comment => {
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.deleteOne();
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}).then(res.redirect('back'));
        }
    });
}