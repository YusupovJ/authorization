import { Router } from "express";
import AuthController from "../controllers/authController";
import authGuard from "../middlewares/authGuard";

const authRoute = Router();

authRoute.post("/register", AuthController.register);
authRoute.post("/login", AuthController.login);
authRoute.post("/refresh", AuthController.refresh);
authRoute.post("/logout", authGuard, AuthController.logout);
authRoute.get("/me", AuthController.me);

export default authRoute;
