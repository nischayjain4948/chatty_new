const { protect } = require('../middleware/authMiddleware');
const {accessChat, fetchChats, createGroupChat, renameGroup, addToGroup,removeFromGroup} = require("../controllers/chatController")

const router = require('express').Router();




// Routes for handling the user chat & group chat...

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
router.route("/groupadd").put(protect, addToGroup);
router.route("/groupremove").put(protect, removeFromGroup);



module.exports = router;