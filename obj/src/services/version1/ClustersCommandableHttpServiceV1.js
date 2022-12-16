"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClustersCommandableHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class ClustersCommandableHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/clusters');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'controller', 'default', '*', '1.0'));
    }
}
exports.ClustersCommandableHttpServiceV1 = ClustersCommandableHttpServiceV1;
//# sourceMappingURL=ClustersCommandableHttpServiceV1.js.map