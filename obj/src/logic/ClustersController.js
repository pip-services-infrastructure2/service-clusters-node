"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClustersController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const ClustersCommandSet_1 = require("./ClustersCommandSet");
class ClustersController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(ClustersController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new ClustersCommandSet_1.ClustersCommandSet(this);
        return this._commandSet;
    }
    getClusters(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getClusterById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, id);
        });
    }
    createCluster(correlationId, cluster) {
        return __awaiter(this, void 0, void 0, function* () {
            cluster.id = cluster.id || pip_services3_commons_nodex_4.IdGenerator.nextLong();
            cluster.update_time = cluster.update_time || new Date();
            cluster.active = cluster.active != null ? cluster.active : true;
            cluster.open = cluster.max_tenant_count > cluster.tenants_count;
            return yield this._persistence.create(correlationId, cluster);
        });
    }
    updateCluster(correlationId, cluster) {
        return __awaiter(this, void 0, void 0, function* () {
            cluster.open = cluster.max_tenant_count > cluster.tenants_count;
            return yield this._persistence.update(correlationId, cluster);
        });
    }
    deleteClusterById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldCluster = null;
            let newCluster;
            // Todo: Implement logical deletion
            // Get cluster
            oldCluster = yield this._persistence.getOneById(correlationId, id);
            oldCluster = yield this._persistence.deleteById(correlationId, id);
            return newCluster;
        });
    }
    addTenant(correlationId, tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            let cluster = null;
            // Find an open cluster
            let filter = pip_services3_commons_nodex_3.FilterParams.fromTuples('active', true, 'open', true);
            let page = yield this._persistence.getPageByFilter(correlationId, filter, null);
            if (page == null || page.data.length == 0) {
                return;
            }
            if (page.data && page.data.length > 0)
                cluster = page.data[0];
            // Add tenant to a cluster
            if (cluster == null) {
                return;
            }
            cluster.active_tenants = cluster.active_tenants || [];
            cluster.active_tenants.push(tenantId);
            cluster.tenants_count++;
            cluster.open = cluster.max_tenant_count > cluster.tenants_count;
            return yield this._persistence.update(correlationId, cluster);
        });
    }
    removeTenant(correlationId, tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            let cluster = null;
            // Find a cluster with tenant
            let filter = pip_services3_commons_nodex_3.FilterParams.fromTuples('tenant_id', tenantId);
            let page = yield this._persistence.getPageByFilter(correlationId, filter, null);
            if (page == null || page.data.length == 0) {
                return;
            }
            if (page.data && page.data.length > 0)
                cluster = page.data[0];
            // Remove tenant from a cluster
            if (cluster == null) {
                return;
            }
            cluster.active_tenants = cluster.active_tenants.filter(s => s != tenantId);
            cluster.tenants_count--;
            cluster.open = cluster.max_tenant_count > cluster.tenants_count;
            return yield this._persistence.update(correlationId, cluster);
        });
    }
}
exports.ClustersController = ClustersController;
ClustersController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-clusters:persistence:*:*:1.0');
//# sourceMappingURL=ClustersController.js.map