import { Main } from "../lib/core/main/Main";
import authRoutes from "./auth/routes/auth.routes";
import userRouter from "./users/routes/user.routes";
import inflowRoutes from "./inflows/routes/inflow.routes";
import outflowRoutes from "./outflows/routes/outflow.routes";
import adminRoutes from "./admin/routes/admin.routes";
import reportsRoutes from "./reports/routes/reports.routes";

export default (main:Main) => {

    authRoutes(main)
    userRouter(main)
    outflowRoutes(main)
    inflowRoutes(main)
    adminRoutes(main)
    reportsRoutes(main)
}