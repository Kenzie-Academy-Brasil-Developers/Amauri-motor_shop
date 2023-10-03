import "express-async-errors";
import express,{ Application } from "express";
import { userRouter } from "./routes/user.route";
import { handleError } from "./middlewares/handleError.middleware";
import { sessionRouter } from "./routes/session.router";
import { anouncimentRouter } from "./routes/anouncement.router";

const app: Application = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/anouncements", anouncimentRouter)



app.use(handleError);

export default app;