const assert = require('chai').assert;

import cluster from 'cluster';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { ClusterV1 } from '../../src/data/version1/ClusterV1';

import { IClustersPersistence } from '../../src/persistence/IClustersPersistence';

let CLUSTER1: ClusterV1 = {
    id: '1',
    name: 'Cluster #1',
    type: 'root',
    active: true,
    api_host: 'api.mycluster1.com',
    service_ports: { myservice1: 30001, myservice2: 30002 },
    max_tenant_count : 1,
    tenants_count: 1,
    active_tenants: ['1']
};
let CLUSTER2: ClusterV1 = {
    id: '2',
    name: 'Cluster #2',
    type: 'tenants',
    active: true,
    api_host: 'api.mycluster2.com',
    service_ports: { myservice1: 30001, myservice2: 30002 },
    max_tenant_count : 10,
    tenants_count: 4,
    open: true,
    active_tenants: ['2', '3'],
    inactive_tenants: ['4']
};
let CLUSTER3: ClusterV1 = {
    id: '3',
    name: 'Cluster #3',
    type: 'tenants',
    active: false,
    maintenance: true,
    open: false,
    api_host: 'api.mycluster3.com',
    service_ports: { myservice1: 30001, myservice2: 30002 },
    max_tenant_count : 10,
    tenants_count: 0
};

export class ClustersPersistenceFixture {
    private _persistence: IClustersPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreateClusters() {
        // Create one cluster
        let cluster = await this._persistence.create(null, CLUSTER1);

        assert.isObject(cluster);
        assert.equal(cluster.name, CLUSTER1.name);
        assert.equal(cluster.type, CLUSTER1.type);
        assert.equal(cluster.active, CLUSTER1.active);
        assert.equal(cluster.api_host, CLUSTER1.api_host);

        // Create another cluster
        cluster = await this._persistence.create(null, CLUSTER2);

        assert.isObject(cluster);
        assert.equal(cluster.name, CLUSTER2.name);
        assert.equal(cluster.type, CLUSTER2.type);
        assert.equal(cluster.active, CLUSTER2.active);

        // Create yet another cluster
        cluster = await this._persistence.create(null, CLUSTER3);

        assert.isObject(cluster);
        assert.equal(cluster.name, CLUSTER3.name);
        assert.equal(cluster.type, CLUSTER3.type);
        assert.equal(cluster.active, CLUSTER3.active);
    }
                
    public async testCrudOperations() {
        let cluster1: ClusterV1;

        // Create items
        await this.testCreateClusters();

        // Get all clusters
        let page = await this._persistence.getPageByFilter(null, new FilterParams(), new PagingParams());

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        cluster1 = page.data[0];

        // Update the cluster
        cluster1.version = '1.1.0';

        let cluster = await this._persistence.update(null, cluster1);

        assert.isObject(cluster);
        assert.equal(cluster.version, '1.1.0');
        assert.equal(cluster.id, cluster1.id);

        // Delete cluster
        await this._persistence.deleteById(null, cluster1.id);

        // Try to get delete cluster
        cluster = await this._persistence.getOneById(null, cluster1.id);

        assert.isNull(cluster || null);
    }

    public async testGetWithFilter() {
        // Create clusters
        await this.testCreateClusters();

        // Get clusters filtered by tenant_id
        let clusters = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                tenant_id: '2'
            }),
            new PagingParams()
        );

        assert.isObject(clusters);
        assert.lengthOf(clusters.data, 1);

        // Get clusters filtered by tenant_ids
        clusters = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                tenant_ids: ['2', '3']
            }),
            new PagingParams()
        );

        assert.isObject(clusters);
        assert.lengthOf(clusters.data, 1);

        // Get clusters filtered by type
        clusters = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                type: 'tenants'
            }),
            new PagingParams()
        );

        assert.isObject(clusters);
        assert.lengthOf(clusters.data, 2);

        // Get clusters filtered by active
        clusters = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                active: true
            }),
            new PagingParams()
        );

        assert.isObject(clusters);
        assert.lengthOf(clusters.data, 2);

        // Get clusters filtered by open
        clusters = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                open: true
            }),
            new PagingParams()
        );

        assert.isObject(clusters);
        assert.lengthOf(clusters.data, 1);
    }
}
