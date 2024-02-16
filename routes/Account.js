const express = require("express")
const router = express.Router();

router.get(
    "/",
    async function (req, res) {
        var usersController =
            req.locals.controllerFactory.getAccounts(req.locals)
        var results =
            await usersController.getAll({});
        
        res.send(results);
    }
);

module.exports = router