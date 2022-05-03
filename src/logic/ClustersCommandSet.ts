import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Schema } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { ClusterV1 } from '../data/version1/ClusterV1';
import { ClusterV1Schema } from '../data/version1/ClusterV1Schema';
import { IClustersController } from './IClustersController';

export class ClustersCommandSet extends CommandSet {
    private _logic: IClustersController;

    constructor(logic: IClustersController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetClustersCommand());
		this.addCommand(this.makeGetClusterByIdCommand());
		this.addCommand(this.makeCreateClusterCommand());
		this.addCommand(this.makeUpdateClusterCommand());
		this.addCommand(this.makeDeleteClusterByIdCommand());
		this.addCommand(this.makeAddTenantCommand());
		this.addCommand(this.makeRemoveTenantCommand());
    }

	private makeGetClustersCommand(): ICommand {
		return new Command(
			"get_clusters",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                return await this._logic.getClusters(correlationId, filter, paging);
            }
		);
	}

	private makeGetClusterByIdCommand(): ICommand {
		return new Command(
			"get_cluster_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('cluster_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let cluster_id = args.getAsString("cluster_id");
				return await this._logic.getClusterById(correlationId, cluster_id);
            }
		);
	}

	private makeCreateClusterCommand(): ICommand {
		return new Command(
			"create_cluster",
			new ObjectSchema(true)
				.withRequiredProperty('cluster', new ClusterV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let cluster = args.get("cluster");
				return await this._logic.createCluster(correlationId, cluster);
            }
		);
	}

	private makeUpdateClusterCommand(): ICommand {
		return new Command(
			"update_cluster",
			new ObjectSchema(true)
				.withRequiredProperty('cluster', new ClusterV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let cluster = args.get("cluster");
				return await this._logic.updateCluster(correlationId, cluster);
            }
		);
	}
	
	private makeDeleteClusterByIdCommand(): ICommand {
		return new Command(
			"delete_cluster_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('cluster_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let clusterId = args.getAsNullableString("cluster_id");
				return await this._logic.deleteClusterById(correlationId, clusterId);
			}
		);
	}

	private makeAddTenantCommand(): ICommand {
		return new Command(
			"add_tenant",
			new ObjectSchema(true)
				.withRequiredProperty('tenant_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let tenantId = args.getAsNullableString("tenant_id");
				return await this._logic.addTenant(correlationId, tenantId);
			}
		);
	}

	private makeRemoveTenantCommand(): ICommand {
		return new Command(
			"remove_tenant",
			new ObjectSchema(true)
				.withRequiredProperty('tenant_id', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let tenantId = args.getAsNullableString("tenant_id");
				return await this._logic.removeTenant(correlationId, tenantId);
			}
		);
	}

}