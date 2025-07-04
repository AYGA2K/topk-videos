import type { Request, Response } from "express";
import { heap } from "../main";
import { type video, Window } from "../lib/heap";

export function topK(req: Request, res: Response): void {
	const k = Number.parseInt(req.params.k, 10);
	const windowParam = req.query.window;

	if (typeof windowParam !== "string") {
		res.status(400).json({ error: "Invalid or missing 'window' parameter" });
		return;
	}

	if (Number.isNaN(k) || k <= 0) {
		res.status(400).json({ error: "Invalid 'k' parameter" });
		return;
	}

	let topK: video[];

	switch (windowParam.toLowerCase()) {
		case "day":
			topK = heap.getTopK(k, Window.Day);
			break;
		case "week":
			topK = heap.getTopK(k, Window.Week);
			break;
		case "month":
			topK = heap.getTopK(k, Window.Month);
			break;
		default:
			res.status(400).json({
				error: "Invalid 'window' value. Must be 'day', 'week', or 'month'.",
			});
			return;
	}

	res.status(200).json(topK);
}
