import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { ClustersMemoryPersistence } from './ClustersMemoryPersistence';
import { ClusterV1 } from '../data/version1/ClusterV1';
export declare class ClustersFilePersistence extends ClustersMemoryPersistence {
    protected _persister: JsonFilePersister<ClusterV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
