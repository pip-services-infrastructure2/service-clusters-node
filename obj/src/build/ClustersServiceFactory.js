"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClustersServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const ClustersMongoDbPersistence_1 = require("../persistence/ClustersMongoDbPersistence");
const ClustersFilePersistence_1 = require("../persistence/ClustersFilePersistence");
const ClustersMemoryPersistence_1 = require("../persistence/ClustersMemoryPersistence");
const ClustersController_1 = require("../logic/ClustersController");
const ClustersCommandableHttpServiceV1_1 = require("../services/version1/ClustersCommandableHttpServiceV1");
class ClustersServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(ClustersServiceFactory.MemoryPersistenceDescriptor, ClustersMemoryPersistence_1.ClustersMemoryPersistence);
        this.registerAsType(ClustersServiceFactory.FilePersistenceDescriptor, ClustersFilePersistence_1.ClustersFilePersistence);
        this.registerAsType(ClustersServiceFactory.MongoDbPersistenceDescriptor, ClustersMongoDbPersistence_1.ClustersMongoDbPersistence);
        this.registerAsType(ClustersServiceFactory.ControllerDescriptor, ClustersController_1.ClustersController);
        this.registerAsType(ClustersServiceFactory.HttpServiceDescriptor, ClustersCommandableHttpServiceV1_1.ClustersCommandableHttpServiceV1);
    }
}
exports.ClustersServiceFactory = ClustersServiceFactory;
ClustersServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-clusters", "factory", "default", "default", "1.0");
ClustersServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-clusters", "persistence", "memory", "*", "1.0");
ClustersServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-clusters", "persistence", "file", "*", "1.0");
ClustersServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-clusters", "persistence", "mongodb", "*", "1.0");
ClustersServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-clusters", "controller", "default", "*", "1.0");
ClustersServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-clusters", "service", "commandable-http", "*", "1.0");
//# sourceMappingURL=ClustersServiceFactory.js.map