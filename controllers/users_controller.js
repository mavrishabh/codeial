const User = require('../models/user');

module.exports.profile = function(req, res){
    // res.end('<h1> User Profile </h1>');
    return res.render('home', {
        title: "Profile"
    });
}

// render the sign out page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    // checking password and confirm password are the same
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}).then(function(user){
        if(!user){
            User.create(req.body).then(res.redirect('/users/sign-in')).catch(err => {
                console.log('error in finding user in signing in');
                return;
            })
        }
    }).catch(err => {
        console.log('error in finding user in signing up');
        return;
    });
    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){console.log('error in finding user in signing up'); return}

    //     if (!user){
    //         User.create(req.body, function(err, user){
    //             if(err){console.log('error in creating user while signing up'); return}

    //             return res.redirect('/users/sign-in');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }

    // });
}

// get the sign in data
module.exports.createSession = function(req, res){
    // TODO Later
}