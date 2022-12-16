import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class ClustersCommandableHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/clusters');
        this._dependencyResolver.put('controller', new Descriptor('service-clusters', 'controller', 'default', '*', '1.0'));
    }
}