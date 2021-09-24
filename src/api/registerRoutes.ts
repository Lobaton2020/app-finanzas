import { Main } from "../lib/core/main/Main";
import userRouter from "./users/routes/user.router";

export default (main:Main) => {
    userRouter(main)
}