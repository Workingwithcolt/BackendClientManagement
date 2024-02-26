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

router.put("/",
    async function (req, res) {
        let query = req.query ? req.query : {};
        var accountsController =
            req.locals.controllerFactory.getAccounts(req.locals);
        let result = await accountsController.update(
            query,
            req.body
        )
        res.send(result)
    });

    router.delete("/",
        async function (req, res) {
            console.log("chetan");
            let query = req.query ? req.query : {};
            var accountsController =
                req.locals.controllerFactory.getAccounts(req.locals);
    
            let result = await accountsController
                .delete(query)
                console.log(result);
            res.send(result)
        });

module.exports = router