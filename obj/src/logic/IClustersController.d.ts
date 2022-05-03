import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ClusterV1 } from '../data/version1/ClusterV1';
export interface IClustersController {
    getClusters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ClusterV1>>;
    getClusterById(correlationId: string, cluster_id: string): Promise<ClusterV1>;
    createCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1>;
    updateCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1>;
    deleteClusterById(correlationId: string, cluster_id: string): Promise<ClusterV1>;
    addTenant(correlationId: string, tenantId: string): Promise<ClusterV1>;
    removeTenant(correlationId: string, tenantId: string): Promise<ClusterV1>;
}
