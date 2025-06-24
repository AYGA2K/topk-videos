import { Router } from "express";
import { topK } from "../controllers/top-k";

export const router = Router();
router.get("/top-k/:k", topK);
