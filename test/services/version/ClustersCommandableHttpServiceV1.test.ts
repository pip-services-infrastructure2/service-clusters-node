const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { ClusterV1 } from '../../../src/data/version1/ClusterV1';
import { ClustersMemoryPersistence } from '../../../src/persistence/ClustersMemoryPersistence';
import { ClustersController } from '../../../src/logic/ClustersController';
import { ClustersCommandableHttpServiceV1 } from '../../../src/services/version1/ClustersCommandableHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('ClustersCommandableHttpServiceV1', ()=> {    
    let persistence: ClustersMemoryPersistence;
    let service: ClustersCommandableHttpServiceV1;
    let rest: any;

    suiteSetup(async () => {
        persistence = new ClustersMemoryPersistence();
        let controller = new ClustersController();

        service = new ClustersCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-clusters', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-clusters', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-clusters', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(async () => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
        await persistence.clear(null);
    });
    
    
    test('CRUD Operations', async () => {
        let cluster1, cluster2: ClusterV1;

        // Create one cluster
        let cluster = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/clusters/create_cluster',
                {
                    cluster: CLUSTER1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(cluster);
        assert.equal(cluster.name, CLUSTER1.name);
        assert.equal(cluster.type, CLUSTER1.type);

        cluster1 = cluster;

        // Create another cluster
        cluster = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/clusters/create_cluster',
                {
                    cluster: CLUSTER2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(cluster);
        assert.equal(cluster.name, CLUSTER2.name);
        assert.equal(cluster.type, CLUSTER2.type);

        cluster2 = cluster;

        // Get all clusters
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/clusters/get_clusters',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the cluster
        cluster1.maintenance = true;
        cluster1.version = '1.1.0';

        cluster = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/clusters/update_cluster',
                {
                    cluster: cluster1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(cluster);
        assert.isTrue(cluster.active);
        assert.equal(cluster.name, cluster1.name);
        assert.equal(cluster.version, '1.1.0');

        cluster1 = cluster;

        // Add tenant to cluster
        cluster = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/clusters/add_tenant',
                {
                    tenant_id: '5'
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(cluster);
        assert.isTrue(cluster.active);

        assert.isTrue(cluster.active_tenants.indexOf('5') >= 0);

        // Remove tenant from cluster
        cluster = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/clusters/remove_tenant',
                {
                    tenant_id: '5'
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(cluster);
        assert.isTrue(cluster.active_tenants.indexOf('5') < 0);

        // Delete cluster
        cluster = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/clusters/delete_cluster_by_id',
                {
                    cluster_id: cluster1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(cluster);

        // Try to get delete cluster
        cluster = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/clusters/get_cluster_by_id',
                {
                    cluster_id: cluster1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(cluster);
    });
});