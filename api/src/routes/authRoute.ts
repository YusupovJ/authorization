import { Router } from "express";
import authGuard from "../middlewares/authGuard";
import authController from "../controllers/authController";

const authRoute = Router();

authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);
authRoute.post("/refresh", authController.refresh);
authRoute.post("/logout", authGuard, authController.logout);
authRoute.get("/me", authController.me);

export default authRoute;
