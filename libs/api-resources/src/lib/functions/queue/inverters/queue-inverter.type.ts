export enum QueueRetryType {
	exponential = 'exponential',
	incremental = 'incremental',
	fixed = 'fixed'
}

export type QueueRetryConfig = {
	type: QueueRetryType;
	handlerQueue: string;
	retries: number;
	delay: number;
	maxRetries?: number;
};

export type QueueMessage<MessageType> = {
	payload: MessageType;
	retryConfig: QueueRetryConfig
}
export abstract class QueueInverter<QueueConfig = unknown, ChannelType = unknown> {
	config: QueueConfig;

	constructor( config: QueueConfig ) {
		this.config = config;
	}
	abstract connect(): void;
	abstract publishMessage<MessageType = unknown>( queue: string, message: QueueMessage<MessageType> ): void;
	abstract createConsumer( queue: string ): ChannelType;
	abstract listenForMessagesOn(
		queue: string,
		callback: ( message: unknown ) => Promise<void>
	): Promise<void>;
}