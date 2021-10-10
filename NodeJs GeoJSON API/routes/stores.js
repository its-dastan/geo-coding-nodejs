const router = require("express").Router();
const { getStores, addStore } = require("../controllers/stores");

// router.get("/", getStores);
router.route("/").get(getStores).post(addStore);

module.exports = router;
