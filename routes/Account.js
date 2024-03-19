const express = require("express");
const { asyncHandler } = require("../helper/helper");
const router = express.Router();

router.get(
    "/",
    asyncHandler(
        async function (req, res) {
            let query = req.query ? req.query : {};
            var usersController =
                req.locals.controllerFactory.getAccounts(req.locals)
            var results =
                await usersController.getAll(query);

            res.send(results);
        }
    )
);

router.post('/', asyncHandler(async (req, res) => {
    console.log("print data");
    console.log(req.body);
    var AccountController =
        req.locals.controllerFactory.getAccounts(req.locals)
    var results =
        await AccountController.create(req.body)

    res.send(results);
}))

router.put("/",
    asyncHandler(
        async function (req, res) {
            let query = req.query ? req.query : {};
            var accountsController =
                req.locals.controllerFactory.getAccounts(req.locals);
            let result = await accountsController.update(
                query,
                req.body
            )
            res.send(result)
        }));

router.delete("/",
    asyncHandler(
        async function (req, res) {
            let query = req.query ? req.query : {};
            var accountsController =
                req.locals.controllerFactory.getAccounts(req.locals);

            let result = await accountsController
                .delete(query)
            res.send(result)
        }));

module.exports = router