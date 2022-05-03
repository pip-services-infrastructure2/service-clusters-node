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
exports.ClustersMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
class ClustersMemoryPersistence extends pip_services3_data_nodex_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.name, search))
            return true;
        if (this.matchString(item.type, search))
            return true;
        if (this.matchString(item.version, search))
            return true;
        return false;
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let name = filter.getAsNullableString('name');
        let type = filter.getAsNullableString('type');
        let active = filter.getAsNullableBoolean('active');
        let open = filter.getAsNullableBoolean('open');
        let tenantId = filter.getAsNullableString('tenant_id');
        let tenantIds = filter.getAsObject('tenant_ids');
        // Process ids filter
        if (typeof tenantIds == 'string')
            tenantIds = tenantIds.split(',');
        if (!Array.isArray(tenantIds))
            tenantIds = null;
        return (item) => {
            if (id && item.id != id)
                return false;
            if (tenantId && (item.active_tenants == null || item.active_tenants.indexOf(tenantId) < 0))
                return false;
            if (tenantIds && !this.contains(tenantIds, item.active_tenants))
                return false;
            if (name && item.name != name)
                return false;
            if (type && item.type != type)
                return false;
            if (active && item.active != active)
                return false;
            if (open && item.open != open)
                return false;
            if (search && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, null, null);
        });
    }
}
exports.ClustersMemoryPersistence = ClustersMemoryPersistence;
//# sourceMappingURL=ClustersMemoryPersistence.js.map