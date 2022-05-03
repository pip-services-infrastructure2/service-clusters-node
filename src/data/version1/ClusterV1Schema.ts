import { ObjectSchema } from 'pip-services3-commons-nodex';
import { MapSchema } from 'pip-services3-commons-nodex';
import { ArraySchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class ClusterV1Schema extends ObjectSchema {
    public constructor() {
        super();;
            
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('name', TypeCode.String);
        this.withRequiredProperty('type', TypeCode.String);
        this.withRequiredProperty('active', TypeCode.Boolean);

        this.withOptionalProperty('master_nodes', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('slave_nodes', new ArraySchema(TypeCode.String));

        this.withOptionalProperty('api_host', TypeCode.String);
        this.withOptionalProperty('service_ports', new MapSchema());

        this.withOptionalProperty('maintenance', TypeCode.Boolean);
        this.withOptionalProperty('version', TypeCode.String);
        this.withOptionalProperty('update_time', TypeCode.DateTime);

        this.withOptionalProperty('max_tenant_count ', TypeCode.Integer);
        this.withOptionalProperty('tenants_count', TypeCode.Integer);
        this.withOptionalProperty('open', TypeCode.Boolean);
        this.withOptionalProperty('active_tenants', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('inactive_tenants', new ArraySchema(TypeCode.String));
    }
}

