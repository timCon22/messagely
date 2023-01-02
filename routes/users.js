const express = require("express")

const User = require("../models/user")
const {ensureLoggedIn, ensureCorrectUser} = require("../middleware/auth");


const router = new express.Router()


/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
*
**/

router.get("/", async function(req, res, next){
    try{
        const usersList = await User.all()
        return res.json({usersList})
    } catch(e){
        return next(e)
    }
})


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
*
**/

router.get("/:username", async function(req, res, next){
    try {
        const user = await User.get(req.params.username)
        return res.json({user})
    } catch(e) {
        return next(e)
    }
})


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/to", ensureCorrectUser, async function(req, res, next){
    try{
        const userMessagesTo = await User.messagesTo(req.params.username)
        return res.json({userMessagesTo})
    } catch(e) {
        return next(e)
    }
})


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/from", ensureCorrectUser, async function(req, res, next){
    try{
        const userMessagesFrom = await User.messagesFrom(req.params.username)
        return res.json({userMessagesFrom})
    } catch(e) {
        return next(e)
    }
})

module.exports = router