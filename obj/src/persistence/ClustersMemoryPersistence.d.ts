import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { ClusterV1 } from '../data/version1/ClusterV1';
import { IClustersPersistence } from './IClustersPersistence';
export declare class ClustersMemoryPersistence extends IdentifiableMemoryPersistence<ClusterV1, string> implements IClustersPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ClusterV1>>;
}
