import { sendVideoData, startProducer } from "../kafka/producer";
import type { video } from "../lib/heap";

const names = [
	"Naruto",
	"One Piece",
	"Bleach",
	"JJK",
	"AOT",
	"Chainsaw Man",
	"Demon Slayer",
	"Dragon Ball",
	"Mob Psycho",
	"Vinland Saga",
];

const ids = [
	"vid1",
	"vid2",
	"vid3",
	"vid4",
	"vid5",
	"vid6",
	"vid7",
	"vid8",
	"vid9",
	"vid10",
];

const videoMap = new Map<string, { name: string; timeStamp: Date }>();

function getRandomDate(start: Date, end: Date): Date {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime()),
	);
}

ids.forEach((id, index) => {
	const name = names[index];
	const now = new Date();
	let timeStamp: Date;

	const timeFrame = Math.floor(Math.random() * 3); // 0: today, 1: this week, 2: this month

	switch (timeFrame) {
		case 0: {
			// Today
			const startOfDay = new Date(now);
			startOfDay.setHours(0, 0, 0, 0);
			const endOfDay = new Date(now);
			endOfDay.setHours(23, 59, 59, 999);
			timeStamp = getRandomDate(startOfDay, endOfDay);
			break;
		}
		case 1: {
			// This week
			const startOfWeek = new Date(now);
			startOfWeek.setDate(now.getDate() - now.getDay());
			const endOfWeek = new Date(now);
			endOfWeek.setDate(now.getDate() + (6 - now.getDay()));
			timeStamp = getRandomDate(startOfWeek, endOfWeek);
			break;
		}
		case 2: {
			// This month
			const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
			const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
			timeStamp = getRandomDate(startOfMonth, endOfMonth);
			break;
		}
		default:
			timeStamp = new Date();
	}

	videoMap.set(id, { name, timeStamp });
});

function getRandomVideo(): video {
	const id = ids[Math.floor(Math.random() * ids.length)];
	const data = videoMap.get(id);

	const name = data?.name ?? "Unknown";
	const timeStamp = data?.timeStamp ?? new Date();

	return {
		id,
		name,
		views: Math.floor(Math.random() * 100),
		timeStamp,
	};
}

export async function startPublishing(interval = 1000) {
	await startProducer();
	setInterval(async () => {
		const v = getRandomVideo();
		console.log("Sending video data:", v);
		await sendVideoData(v);
	}, interval);
}
