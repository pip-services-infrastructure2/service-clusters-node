import { ConfigParams } from 'pip-services3-commons-nodex';

import { ClustersMemoryPersistence } from '../../src/persistence/ClustersMemoryPersistence';
import { ClustersPersistenceFixture } from './ClustersPersistenceFixture';

suite('ClustersMemoryPersistence', ()=> {
    let persistence: ClustersMemoryPersistence;
    let fixture: ClustersPersistenceFixture;
    
    setup(async () => {
        persistence = new ClustersMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new ClustersPersistenceFixture(persistence);
        
        await persistence.open(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

});