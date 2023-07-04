const router = require("express").Router();
const {registerUser, authUser, allUsers} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");


router.route("/").post(registerUser).get(protect,allUsers);
router.route("/login").post(authUser);


module.exports = router;