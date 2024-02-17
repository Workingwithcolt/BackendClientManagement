const mongoose = require("mongoose")
class MongodbControllerInterface {
    constructor(path, locals, skipAuth = false) {
        this.Modal = path;
        this.locals = locals;
        this.skipAuth = skipAuth
    }

    async create(createData) {
        const data = new this.Modal(createData);
        data.save();
        return { id: data._id.toHexString() };
    }

    async getAll(query) {
        let result = await this.Modal.find(query);
        return result;
    }

    async getOne(query) {
        return this.Modal.findOne(query)
    }

    async delete() {
        console.log("delete");
    }

    async update() {
        console.log("update");
    }

    async replace(id, record, batch = null, replaceWithCreate = false) {
        console.log("replace");
    }
}
module.exports = MongodbControllerInterface