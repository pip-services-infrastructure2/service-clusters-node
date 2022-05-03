import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { ClustersServiceFactory } from '../build/ClustersServiceFactory';

export class ClustersLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("clusters", "Working clusters function");
        this._dependencyResolver.put('controller', new Descriptor('service-clusters', 'controller', 'default', '*', '*'));
        this._factories.add(new ClustersServiceFactory());
    }
}

export const handler = new ClustersLambdaFunction().getHandler();