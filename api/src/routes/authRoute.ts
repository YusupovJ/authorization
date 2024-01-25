import { Router } from "express";
import authGuard from "../middlewares/authGuard";
import authController from "../controllers/authController";

const authRoute = Router();

authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);
authRoute.post("/logout", authGuard, authController.logout);
authRoute.get("/refresh", authController.refresh);
authRoute.get("/me", authGuard, authController.me);

export default authRoute;
