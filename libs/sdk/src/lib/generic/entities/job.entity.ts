import { IBaseModel } from "../models";

export enum JobStatus {
    initiated = "initiated",
    pending = "pending",
    completed = "completed",
    failed = "failed"
}
export enum JobTask {
    kyc = "kyc",
}

export enum JobClientType {
    user = "user",
    business = "business",
    admin = "admin",
    system = "system"
}

export type JobChanges = Record<string, {
	oldValue: unknown,
	newValue: unknown
}>

export interface IJobEvent {
	timestamp: Date;
	action: string;
	changes?: JobChanges
}

export interface IJob<T = unknown> extends IBaseModel {
    status: JobStatus;
    client: {
        type: JobClientType;
        id?: string;
    };
    reports: Array<string>;
    description: string;
    task: JobTask;
    metadata: T;
	events: Array<IJobEvent>
}