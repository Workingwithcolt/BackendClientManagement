const { MongodbControllerFactory } = require("../MongoDB/mongodbcontrollerfactory.js");

const mongodbMiddleware = (req, res, next) => {
    req.locals = {}
    req.locals.controllerFactory = new MongodbControllerFactory();
    next();
};

module.exports = {
    mongodbMiddleware
}