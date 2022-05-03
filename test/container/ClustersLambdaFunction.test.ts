const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { ClusterV1 } from '../../src/data/version1/ClusterV1';
import { ClustersLambdaFunction } from '../../src/container/ClustersLambdaFunction';

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
    active_tenants: ['2', '3'],
    inactive_tenants: ['4']
};

suite('ClustersLambdaFunction', ()=> {
    let lambda: ClustersLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-clusters:persistence:memory:default:1.0',
            'controller.descriptor', 'service-clusters:controller:default:default:1.0'
        );

        lambda = new ClustersLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        var cluster1, cluster2;

        // Create one cluster
        let cluster = await lambda.act(
            {
                role: 'clusters',
                cmd: 'create_cluster',
                cluster: CLUSTER1
            }
        );

        assert.isObject(cluster);
        assert.equal(cluster.name, CLUSTER1.name);
        assert.equal(cluster.type, CLUSTER1.type);

        cluster1 = cluster;

        // Create another cluster
        cluster = await lambda.act(
            {
                role: 'clusters',
                cmd: 'create_cluster',
                cluster: CLUSTER2
            }
        );

        assert.isObject(cluster);
        assert.equal(cluster.name, CLUSTER2.name);
        assert.equal(cluster.type, CLUSTER2.type);

        cluster2 = cluster;

        // Get all clusters
        let page = await lambda.act(
            {
                role: 'clusters',
                cmd: 'get_clusters'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the cluster
        cluster1.version = '1.1.0';

        cluster = await lambda.act(
            {
                role: 'clusters',
                cmd: 'update_cluster',
                cluster: cluster1
            }
        );

        assert.isObject(cluster);
        assert.equal(cluster.version, '1.1.0');
        assert.equal(cluster.name, CLUSTER1.name);

        cluster1 = cluster;

        // Add tenant to cluster
        cluster = await lambda.act(
            {
                role: 'clusters',
                cmd: 'add_tenant',
                tenant_id: '5'
            }
        );

        assert.isObject(cluster);
        assert.isTrue(cluster.active);

        assert.isTrue(cluster.active_tenants.indexOf('5') >= 0);

        // Remove tenant from cluster
        cluster = await lambda.act(
            {
                role: 'clusters',
                cmd: 'remove_tenant',
                tenant_id: '5'
            }
        );

        assert.isObject(cluster);
        assert.isTrue(cluster.active_tenants.indexOf('5') < 0);

        // Delete cluster
        await lambda.act(
            {
                role: 'clusters',
                cmd: 'delete_cluster_by_id',
                cluster_id: cluster1.id
            }
        );

        // Try to get delete cluster
        cluster = await lambda.act(
            {
                role: 'clusters',
                cmd: 'get_cluster_by_id',
                cluster_id: cluster1.id
            }
        );

        assert.isNull(cluster);
    });
});