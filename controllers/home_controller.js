const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25); 
    // return res.end('<h1> Express is up for codeial</h1>');
    
    // Post.find({}).then(posts =>{
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    // Populate the user for each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec().then(posts =>{
        User.find({}).then(users => {
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts,
                all_users: users
            });
        })

        
    });
}