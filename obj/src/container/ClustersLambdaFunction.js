"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.ClustersLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const ClustersServiceFactory_1 = require("../build/ClustersServiceFactory");
class ClustersLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("clusters", "Working clusters function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-clusters', 'controller', 'default', '*', '*'));
        this._factories.add(new ClustersServiceFactory_1.ClustersServiceFactory());
    }
}
exports.ClustersLambdaFunction = ClustersLambdaFunction;
exports.handler = new ClustersLambdaFunction().getHandler();
//# sourceMappingURL=ClustersLambdaFunction.js.map