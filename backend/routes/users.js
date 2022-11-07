const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register.js");
const validateLoginInput = require("../validation/login.js");
const User = require("../models/user.js");

// router.post("/register", (req, res) => {
//     console.log('here')
//     const { errors, isValid } = validateRegisterInput(req.body);

//     if (!isValid) {
//       return res.status(400).json(errors);
//     }
//     User.findOne({ "$or": [{email: req.body.email}, {username: req.body.username}, {password: req.body.password}] }).then(user => {
//         if (user) {
//             if(user.email === req.body.email){
//                 return res.status(400).json({ email: "Email already exists" });
//             }
//             else if(user.username === req.body.username){
//                 return res.status(400).json({ username: "Username already exists" });
//             }
//             else if(user.password === req.body.password){
//                 return res.status(400).json({ password: "Password already exists" });
//             }
//         }
//         else {
//             const newUser = new User({
//                 name: req.body.name,
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: req.body.password,
//                 avatar: req.body.avatar
//             });
//             bcrypt.genSalt(10, (err, salt) => {
//                 bcrypt.hash(newUser.password, salt, (err, hash) => {
//                 if (err) throw err;
//                 newUser.password = hash;
//                 newUser
//                     .save()
//                     .then(user => res.json(user))
//                     .catch(err => console.log(err));
//                 });
//             });
//         }
//     });
// });

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926, // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;
