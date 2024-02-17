const ModalDataSchema = require("../models/ModalDataSchema");
const Users = require("../models/Users");
const Files = require("../models/FileSchema")
const MongodbControllerInterface = require("./mongoDbController")

const SKIP_AUTH = true;

const USER_PATH = "User"
const ACCOUNT_PATH = "ModalDataSchema";

class MongodbControllerFactory {
    getUserController(local) {
        return new MongodbControllerInterface(Users, local);
    }
    getAccounts(local) {
        return new MongodbControllerInterface(ModalDataSchema, local)
    }
    getFilesController(local) {
        return new MongodbControllerInterface(Files, local)
    }
}

module.exports = { MongodbControllerFactory, USER_PATH }