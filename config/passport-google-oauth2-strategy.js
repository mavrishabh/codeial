const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google logIn
passport.use(new googleStrategy({
        clientID: "641710712879-ufc9c0q8q9vq259sqrppn6r8laiuv972.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec().then(user => {
            console.log(profile);
            console.log(accessToken, refreshToken);
            if(user){
                // if found => set this user as req.user
                return done(null, user);
            }else{
                // if not found => create the user and set it as req.user(Sign in that user)
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }).then(user => {
                    return done(null, user);
                }).catch(err => {
                    if(err){
                        console.log('error in google strategy-passport', err);
                        return;
                    }
                })
            }
        }).catch(err => {
            if(err){
                console.log('error in google strategy-passport', err);
                return;
            }
        });
    }

));

module.exports =  passport;