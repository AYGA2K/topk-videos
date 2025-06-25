import express from "express";
import { startPublishing } from "./kafka/publisher";
import { MinHeap } from "./lib/heap";
import { startKafkaConsumer } from "./kafka/consumer";
import { topK } from "./controllers/top-k";

export const heap = new MinHeap();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/top-k/:k", topK);

async function startApp() {
	try {
		console.log("📥 Starting Kafka consumer...");
		await startKafkaConsumer();

		console.log("📤 Starting publisher...");
		await startPublishing();

		app.listen(PORT, () => {
			console.log(`🚀 Server is running on port ${PORT}`);
		});
	} catch (err) {
		console.error("❌ Failed to start application:", err);
		process.exit(1);
	}
}

startApp();
