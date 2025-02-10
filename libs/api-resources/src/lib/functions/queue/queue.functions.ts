import { RabbitMqConfig, RabbitMqInverter } from "./inverters";

export function getQueueService( config: RabbitMqConfig ) {
	return new RabbitMqInverter( config );
}