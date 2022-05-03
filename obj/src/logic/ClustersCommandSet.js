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
exports.ClustersCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const ClusterV1Schema_1 = require("../data/version1/ClusterV1Schema");
class ClustersCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetClustersCommand());
        this.addCommand(this.makeGetClusterByIdCommand());
        this.addCommand(this.makeCreateClusterCommand());
        this.addCommand(this.makeUpdateClusterCommand());
        this.addCommand(this.makeDeleteClusterByIdCommand());
        this.addCommand(this.makeAddTenantCommand());
        this.addCommand(this.makeRemoveTenantCommand());
    }
    makeGetClustersCommand() {
        return new pip_services3_commons_nodex_2.Command("get_clusters", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getClusters(correlationId, filter, paging);
        }));
    }
    makeGetClusterByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_cluster_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('cluster_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let cluster_id = args.getAsString("cluster_id");
            return yield this._logic.getClusterById(correlationId, cluster_id);
        }));
    }
    makeCreateClusterCommand() {
        return new pip_services3_commons_nodex_2.Command("create_cluster", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('cluster', new ClusterV1Schema_1.ClusterV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let cluster = args.get("cluster");
            return yield this._logic.createCluster(correlationId, cluster);
        }));
    }
    makeUpdateClusterCommand() {
        return new pip_services3_commons_nodex_2.Command("update_cluster", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('cluster', new ClusterV1Schema_1.ClusterV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let cluster = args.get("cluster");
            return yield this._logic.updateCluster(correlationId, cluster);
        }));
    }
    makeDeleteClusterByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_cluster_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('cluster_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let clusterId = args.getAsNullableString("cluster_id");
            return yield this._logic.deleteClusterById(correlationId, clusterId);
        }));
    }
    makeAddTenantCommand() {
        return new pip_services3_commons_nodex_2.Command("add_tenant", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('tenant_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let tenantId = args.getAsNullableString("tenant_id");
            return yield this._logic.addTenant(correlationId, tenantId);
        }));
    }
    makeRemoveTenantCommand() {
        return new pip_services3_commons_nodex_2.Command("remove_tenant", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('tenant_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let tenantId = args.getAsNullableString("tenant_id");
            return yield this._logic.removeTenant(correlationId, tenantId);
        }));
    }
}
exports.ClustersCommandSet = ClustersCommandSet;
//# sourceMappingURL=ClustersCommandSet.js.map