import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { ClusterV1 } from '../data/version1/ClusterV1';
import { IClustersController } from './IClustersController';
export declare class ClustersController implements IConfigurable, IReferenceable, ICommandable, IClustersController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getClusters(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ClusterV1>>;
    getClusterById(correlationId: string, id: string): Promise<ClusterV1>;
    createCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1>;
    updateCluster(correlationId: string, cluster: ClusterV1): Promise<ClusterV1>;
    deleteClusterById(correlationId: string, id: string): Promise<ClusterV1>;
    addTenant(correlationId: string, tenantId: string): Promise<ClusterV1>;
    removeTenant(correlationId: string, tenantId: string): Promise<ClusterV1>;
}
