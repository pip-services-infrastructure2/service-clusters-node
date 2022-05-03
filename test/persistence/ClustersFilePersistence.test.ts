import { ClustersFilePersistence } from '../../src/persistence/ClustersFilePersistence';
import { ClustersPersistenceFixture } from './ClustersPersistenceFixture';

suite('ClustersFilePersistence', ()=> {
    let persistence: ClustersFilePersistence;
    let fixture: ClustersPersistenceFixture;
    
    setup(async () => {
        persistence = new ClustersFilePersistence('./data/clusters.test.json');

        fixture = new ClustersPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(() => {
        persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

});