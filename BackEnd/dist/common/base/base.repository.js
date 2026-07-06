"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async create(payload, options) {
        const document = new this.model(payload);
        return document.save(options);
    }
    async findById(id, projection, options) {
        return this.model.findById(id, projection, options);
    }
    async findOne(filter, projection, options) {
        return this.model.findOne(filter, projection, options);
    }
    async findMany(filter = {}, projection, options) {
        return this.model.find(filter, projection, options);
    }
    async updateById(id, update, options = { new: true }) {
        return this.model.findByIdAndUpdate(id, update, options);
    }
    async updateOne(filter, update, options = { new: true }) {
        return this.model.findOneAndUpdate(filter, update, options);
    }
    async updateMany(filter, update, options) {
        return this.model.updateMany(filter, update, options);
    }
    async deleteById(id, options) {
        return this.model.findByIdAndDelete(id, options);
    }
    async deleteOne(filter, options) {
        return this.model.deleteOne(filter, options);
    }
    async deleteMany(filter, options) {
        return this.model.deleteMany(filter, options);
    }
    async exists(filter) {
        const document = await this.model.exists(filter);
        return Boolean(document);
    }
    async count(filter = {}) {
        return this.model.countDocuments(filter);
    }
}
exports.BaseRepository = BaseRepository;
