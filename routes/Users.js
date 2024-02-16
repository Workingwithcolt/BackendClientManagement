const express = require("express")
const router = express.Router();

router.get(
    "/",
    async function (req, res) {
        var usersController =
            req.locals.controllerFactory.getUserController(req.locals)
        var results =
            await usersController.getAll({});
        console.log(results);
        res.send(results);
    }
);

module.exports = router