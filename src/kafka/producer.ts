import { Kafka } from "kafkajs";
import { video } from "../lib/heap";

const kafka = new Kafka({
	clientId: "video-producer",
	brokers: ["localhost:9092"],
});

const producer = kafka.producer();

export async function startProducer() {
	await producer.connect();
	console.log("Producer connected");
}

export async function sendVideoData(video: video) {
	await producer.send({
		topic: "video-views",
		messages: [{ value: JSON.stringify(video) }],
	});
}
