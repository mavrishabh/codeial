const User = require('../models/user');

module.exports.profile = function(req, res){
    // res.end('<h1> User Profile </h1>');
    return res.render('user_profile', {
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
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}