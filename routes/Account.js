const express = require("express")
const router = express.Router();

router.get(
    "/",
    async function (req, res) {
        let query = req.query ? req.query : {};
        var usersController =
            req.locals.controllerFactory.getAccounts(req.locals)
        var results =
            await usersController.getAll(query);

        res.send(results);
    }
);

router.post('/', async (req, res) => {
    console.log("print data");
    var AccountController =
        req.locals.controllerFactory.getAccounts(req.locals)
    var results =
        await AccountController.create(req.body)

    res.send(results);
})

module.exports = router