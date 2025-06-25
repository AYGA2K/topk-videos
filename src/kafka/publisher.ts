import { startProducer, sendVideoData } from "../kafka/producer";
import { video } from "../lib/heap";

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

const videoMap = new Map<string, string>();
ids.forEach((id, index) => {
	videoMap.set(id, names[index]);
});

function getRandomVideo(): video {
	const id = ids[Math.floor(Math.random() * ids.length)];
	const name = videoMap.get(id)!;
	return {
		id,
		name,
		views: Math.floor(Math.random() * 10),
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
