import { Request, Response } from "express";
import { heap } from "../main";

export function topK(req: Request, res: Response) {
	const k = parseInt(req.params.k);
	if (isNaN(k) || k <= 0) {
		res.status(400).json({ error: "Invalid 'k' parameter" });
		return;
	}
	const topK = heap.getTopK(k);
	res.json(topK);
}
