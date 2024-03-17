const express = require("express");
const { asyncHandler } = require("../helper/helper");
const router = express.Router();

router.get(
    "/",
    asyncHandler(
        async function (req, res) {
            var usersController =
                req.locals.controllerFactory.getUserController(req.locals)
            var results =
                await usersController.getAll({});
            res.send(results);
        }
    )
);

module.exports = router