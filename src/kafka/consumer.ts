import { Kafka } from "kafkajs";
import { heap } from "../main";
import { video } from "../lib/heap";

const kafka = new Kafka({
	clientId: "video-consumer",
	brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({
	groupId: "video-group-" + Date.now(),
});

export async function startKafkaConsumer() {
	await consumer.connect();
	await consumer.subscribe({ topic: "video-views", fromBeginning: true });
	await consumer.run({
		eachMessage: async ({ message }) => {
			const str = message.value?.toString();
			if (!str) return;
			const video = JSON.parse(str) as video;
			if (heap.has(video.id)) {
				heap.updateCount(video.id, video.views);
			} else {
				heap.push(video);
			}
		},
	});
}
