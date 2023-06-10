const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    // res.end('<h1> User Profile </h1>');
    User.findById(req.params.id).then(user => {
        return res.render('user_profile', {
            title: "Profile",
            profile_user: user
        });
    })
    
}

module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body).then(user => {
    //         return res.redirect('back');
    //     });
    // }
    // else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err)
                    console.log('*******Multer Error: ', err);
                
                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // this is saving the path of tehe uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }catch{
            req.flash('error', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

// render the sign out page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function(req, res){
    // res.redirect('/users/sign-up');
    // checking password and confirm password are the same
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    await User.findOne({email: req.body.email}).then(user => {
        if(!user){
            User.create(req.body);
            return res.redirect('/users/sign-in');
        }
        else
            return res.redirect('back');
    }).catch(err => {
        console.log('error in finding user in signing up');
        return;
    });
}

// get the sign in data
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!');
        res.redirect('/');
    });
}

// module.exports.posts = function(req, res){
//     if(req.isAuthenticated()){
//         User.findOne({email: req.body.email}).then(user => {
//             if(user){
//                 posts.create({
//                     content: req.body.content,
//                     user: req.user._id
//                 });
//                 return res.redirect('back');
//             }
//         }).catch(err => {
//             console.log('Error while posting your comment');
//             return;
//         })
//     }
    
    // console.log('Sign In first to be able to post something');
    // return res.redirect('/users/sign-in');
// }