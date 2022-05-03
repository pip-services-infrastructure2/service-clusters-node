"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClustersFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const ClustersMemoryPersistence_1 = require("./ClustersMemoryPersistence");
class ClustersFilePersistence extends ClustersMemoryPersistence_1.ClustersMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.ClustersFilePersistence = ClustersFilePersistence;
//# sourceMappingURL=ClustersFilePersistence.js.map