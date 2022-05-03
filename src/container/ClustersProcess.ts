import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

import { ClustersServiceFactory } from '../build/ClustersServiceFactory';

export class ClustersProcess extends ProcessContainer {

    public constructor() {
        super("clusters", "Working clusters microservice");
        this._factories.add(new ClustersServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
