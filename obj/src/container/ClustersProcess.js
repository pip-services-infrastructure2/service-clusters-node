"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClustersProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const ClustersServiceFactory_1 = require("../build/ClustersServiceFactory");
class ClustersProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("clusters", "Working clusters microservice");
        this._factories.add(new ClustersServiceFactory_1.ClustersServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.ClustersProcess = ClustersProcess;
//# sourceMappingURL=ClustersProcess.js.map