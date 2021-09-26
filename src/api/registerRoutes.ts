import { Main } from "../lib/core/main/Main";
import authRoutes from "./auth/routes/auth.routes";
import userRouter from "./users/routes/user.routes";

export default (main:Main) => {

    authRoutes(main)
    userRouter(main)
}