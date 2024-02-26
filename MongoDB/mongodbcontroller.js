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
        return await this.Modal.findOne(query)
    }

    async delete(query) {
        return await this.Modal.deleteOne(query);
    }

    async update(query, data) {
        return await this.Modal.updateOne(query, data);
    }

    async replace(id, record, batch = null, replaceWithCreate = false) {
        console.log("replace");
    }
}
module.exports = MongodbControllerInterface