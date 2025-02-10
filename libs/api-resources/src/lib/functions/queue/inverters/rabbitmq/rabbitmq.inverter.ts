/* eslint-disable no-tabs */
import { Channel, ConsumeMessage } from "amqplib";
import { QueueInverter, QueueMessage } from "../queue-inverter.type";
import { createRabbitMQConnection, createRabbitMqConsumer, publishRabbitMQMessage } from "./rabbitmq.functions";
import { RetryQueue } from "../../../../enums";

export type RabbitMqConfig = {
  url: string;
  env: string;
};

export class RabbitMqInverter extends QueueInverter<RabbitMqConfig, Promise<Channel>> {
	config: RabbitMqConfig;

	constructor( config: RabbitMqConfig ) {
		super( config );
	}

	async connect(): Promise<Channel> {
		return await createRabbitMQConnection( this.config.url );
	}

	async publishMessage<MessageType = unknown>( queue: string, message: QueueMessage<MessageType> ): Promise<void> {
		const channel = await this.connect();
		await publishRabbitMQMessage( channel, queue, message );
	}

	async createConsumer( queue: string ): Promise<Channel> {
		const channel = await this.connect();
		return createRabbitMqConsumer( channel, queue, );
	}

	async listenForMessagesOn<MessageType = unknown>(
		queue: string, callback: ( message: MessageType | QueueMessage<MessageType> ) => Promise<void>
	): Promise<void> {
		// const consumer = await this.createConsumer( queue );
		// consumer.consume( queue, ( msg: ConsumeMessage ) => {
		// 	if ( msg ) {
		// 		const { payload, retryConfig } = ( JSON.parse( msg.content.toString() ) as QueueMessage<MessageType> );
		// 		callback(
		// 			queue === RetryQueue ? { payload, retryConfig} : payload
		// 		).then(
		// 			() => console.log( queue, 'message handled' )
		// 		).catch( error => {
		// 			console.error( 'Failed to handle message:', error );
		// 			console.log( 'Pushing to retry queue' );
		// 			this.publishMessage( RetryQueue, { payload, retryConfig } );
		// 		} ).finally( () => {
		// 			console.log( queue, 'message acknowledged' );
		// 			consumer.ack( msg );
		// 		} );
		// 	}
		// } );
	}
}
