import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { ClusterV1 } from '../data/version1/ClusterV1';
import { IClustersPersistence } from './IClustersPersistence';

export class ClustersMongoDbPersistence extends IdentifiableMongoDbPersistence<ClusterV1, string> implements IClustersPersistence {

    constructor() {
        super('clusters');
    }
    
    private composeFilter(filter: FilterParams) {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ name: { $regex: searchRegex } });
            searchCriteria.push({ type: { $regex: searchRegex } });
            searchCriteria.push({ version: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });

        let active = filter.getAsNullableBoolean('active');
        if (active != null)
            criteria.push({ active: active });

        let open = filter.getAsNullableBoolean('open');
        if (open != null)
            criteria.push({ open: open });
                
        let name = filter.getAsNullableString('name');
        if (name != null)
            criteria.push({ name: name });

        // Filter tenant_ids
        let tenantIds = filter.getAsObject('tenant_ids');
        if (typeof tenantIds == 'string')
            tenantIds = tenantIds.split(',');
        if (Array.isArray(tenantIds))
            criteria.push({ active_tenants: { $in: tenantIds } });

        let tenantId = filter.getAsNullableString('tenant_id');
        if (tenantId != null)
            criteria.push({ active_tenants: tenantId });
                
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ClusterV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

}
