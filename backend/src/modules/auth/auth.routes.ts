import { Router } from "express";
import { googleAuthRedirect, googleAuthCallback } from "./auth.controller";

const router = Router();

router.get("/google", googleAuthRedirect);
router.get("/google/callback", googleAuthCallback);

export default router;
