import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';

import { ClusterV1 } from '../data/version1/ClusterV1';
import { IClustersPersistence } from '../persistence/IClustersPersistence';
import { IClustersController } from './IClustersController';
import { ClustersCommandSet } from './ClustersCommandSet';

export class ClustersController implements IConfigurable, IReferenceable, ICommandable, IClustersController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-clusters:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(ClustersController._defaultConfig);
    private _persistence: IClustersPersistence;
    private _commandSet: ClustersCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IClustersPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new ClustersCommandSet(this);
        return this._commandSet;
    }

    public async getClusters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ClusterV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getClusterById(correlationId: string, id: string): Promise<ClusterV1> {
        return await this._persistence.getOneById(correlationId, id);
    }

    public async createCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1> {
        cluster.id = cluster.id || IdGenerator.nextLong();
        cluster.update_time = cluster.update_time || new Date();
        cluster.active = cluster.active != null ? cluster.active : true;
        cluster.open = cluster.max_tenant_count > cluster.tenants_count;

        return await this._persistence.create(correlationId, cluster);
    }

    public async updateCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1> {
        cluster.open = cluster.max_tenant_count > cluster.tenants_count;
        return await this._persistence.update(correlationId, cluster);
    }

    public async deleteClusterById(correlationId: string, id: string): Promise<ClusterV1> {
        let oldCluster: ClusterV1 = null;
        let newCluster: ClusterV1;

        // Todo: Implement logical deletion
        // Get cluster
        oldCluster = await this._persistence.getOneById(correlationId, id);

        oldCluster = await this._persistence.deleteById(correlationId, id);

        return newCluster;
    }

    public async addTenant(correlationId: string, tenantId: string): Promise<ClusterV1> {

        let cluster: ClusterV1 = null;

        // Find an open cluster
        let filter = FilterParams.fromTuples(
            'active', true,
            'open', true
        );

        let page = await this._persistence.getPageByFilter(correlationId, filter, null);

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

        return await this._persistence.update(correlationId, cluster);
    }

    public async removeTenant(correlationId: string, tenantId: string): Promise<ClusterV1> {

        let cluster: ClusterV1 = null;

        // Find a cluster with tenant
        let filter = FilterParams.fromTuples(
            'tenant_id', tenantId
        );

        let page = await this._persistence.getPageByFilter(correlationId, filter, null);

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

        return await this._persistence.update(correlationId, cluster);
    }    
}
