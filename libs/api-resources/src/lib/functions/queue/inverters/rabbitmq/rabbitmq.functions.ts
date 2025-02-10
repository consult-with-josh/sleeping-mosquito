import { Channel, connect, Connection } from 'amqplib';
import { QueueMessage } from '../queue-inverter.type';

export async function createRabbitMQConnection( url: string ): Promise<Channel> {
	try {
		const connection: Connection = await connect( url );
		URL;
		const channel = await connection.createChannel();
		console.log( 'RabbitMQ Channel created successfully' );
		return channel;
	} catch ( error ) {
		console.error( 'Failed to create RabbitMQ connection:', error );
		throw error;
	}
}

export async function publishRabbitMQMessage<MessageType = unknown>(
	channel: Channel,
	queue: string,
	message: QueueMessage<MessageType>
) {
	try {
		await channel.assertQueue( queue, { durable: true } );
		channel.sendToQueue( queue, Buffer.from( JSON.stringify( message ) ), {
			persistent: true,
		} );
		console.log( `Message sent to queue '${queue}'` );
	} catch ( error ) {
		console.error( 'Failed to send message to queue:', error );
	}
}

export async function createRabbitMqConsumer(
	channel: Channel,
	queue: string
): Promise<Channel> {
	try {
		await channel.assertQueue( queue, { durable: true } );
		console.log( `Consumer bound to queue '${queue}'` );
		return channel;
	} catch ( error ) {
		console.error( 'Failed to bind consumer to queue:', error );
		throw error;
	}
}
