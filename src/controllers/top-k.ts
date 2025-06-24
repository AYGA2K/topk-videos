import { Request, Response } from "express";
import { MinHeap, video } from "../lib/heap";

export function topK(req: Request, res: Response) {
	const k = parseInt(req.params.k);

	if (isNaN(k) || k <= 0) {
		return res.status(400).json({ error: "Invalid 'k' parameter" });
	}

	const videos: video[] = [
		{ id: "v1", name: "Intro to TypeScript", count: 120 },
		{ id: "v2", name: "Understanding Closures", count: 85 },
		{ id: "v3", name: "React Hooks Crash Course", count: 310 },
		{ id: "v4", name: "JavaScript Promises", count: 200 },
		{ id: "v5", name: "CSS Grid Tutorial", count: 150 },
		{ id: "v6", name: "Async/Await Explained", count: 180 },
		{ id: "v10", name: "Svelte in 30 Minutes", count: 900 },
		{ id: "v10", name: "Svelte in 30 Minutes", count: 90 },
		{ id: "v10", name: "Svelte in 30 Minutes", count: 90 },
		{ id: "v9", name: "Vue 3 Composition API", count: 160 },
		{ id: "v11", name: "Deno vs Node.js", count: 70 },
		{ id: "v12", name: "Type Narrowing in TS", count: 110 },
		{ id: "v13", name: "Deploy with Docker", count: 220 },
		{ id: "v14", name: "RxJS Basics", count: 140 },
		{ id: "v15", name: "React Native Setup", count: 100 },
		{ id: "v16", name: "Tailwind CSS Guide", count: 190 },
		{ id: "v17", name: "Debugging in Chrome", count: 80 },
		{ id: "v18", name: "Functional Programming", count: 210 },
		{ id: "v19", name: "GraphQL API Tutorial", count: 250 },
		{ id: "v20", name: "Understanding V8 Engine", count: 95 },
	];

	const heap = new MinHeap();

	videos.forEach((video) => {
		if (heap.has(video.id)) {
			heap.updateCount(video.id, video.count);
		} else {
			heap.push(video);
		}
	});

	const result: video[] = [];
	while (!heap.isEmpty() && result.length < k) {
		const item = heap.pop();
		if (item) result.push(item);
	}

	return res.json(result.reverse());
}
