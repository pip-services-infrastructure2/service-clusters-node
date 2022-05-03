import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';

import { ClusterV1 } from '../data/version1/ClusterV1';

export interface IClustersPersistence extends IGetter<ClusterV1, string>, IWriter<ClusterV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ClusterV1>>;

    getOneById(correlationId: string, id: string): Promise<ClusterV1>;

    create(correlationId: string, item: ClusterV1): Promise<ClusterV1>;

    update(correlationId: string, item: ClusterV1): Promise<ClusterV1>;

    deleteById(correlationId: string, id: string): Promise<ClusterV1>;
}
