"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
class ClusterV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        ;
        this.withOptionalProperty('id', pip_services3_commons_nodex_4.TypeCode.String);
        this.withRequiredProperty('name', pip_services3_commons_nodex_4.TypeCode.String);
        this.withRequiredProperty('type', pip_services3_commons_nodex_4.TypeCode.String);
        this.withRequiredProperty('active', pip_services3_commons_nodex_4.TypeCode.Boolean);
        this.withOptionalProperty('master_nodes', new pip_services3_commons_nodex_3.ArraySchema(pip_services3_commons_nodex_4.TypeCode.String));
        this.withOptionalProperty('slave_nodes', new pip_services3_commons_nodex_3.ArraySchema(pip_services3_commons_nodex_4.TypeCode.String));
        this.withOptionalProperty('api_host', pip_services3_commons_nodex_4.TypeCode.String);
        this.withOptionalProperty('service_ports', new pip_services3_commons_nodex_2.MapSchema());
        this.withOptionalProperty('maintenance', pip_services3_commons_nodex_4.TypeCode.Boolean);
        this.withOptionalProperty('version', pip_services3_commons_nodex_4.TypeCode.String);
        this.withOptionalProperty('update_time', pip_services3_commons_nodex_4.TypeCode.DateTime);
        this.withOptionalProperty('max_tenant_count ', pip_services3_commons_nodex_4.TypeCode.Integer);
        this.withOptionalProperty('tenants_count', pip_services3_commons_nodex_4.TypeCode.Integer);
        this.withOptionalProperty('open', pip_services3_commons_nodex_4.TypeCode.Boolean);
        this.withOptionalProperty('active_tenants', new pip_services3_commons_nodex_3.ArraySchema(pip_services3_commons_nodex_4.TypeCode.String));
        this.withOptionalProperty('inactive_tenants', new pip_services3_commons_nodex_3.ArraySchema(pip_services3_commons_nodex_4.TypeCode.String));
    }
}
exports.ClusterV1Schema = ClusterV1Schema;
//# sourceMappingURL=ClusterV1Schema.js.map