import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import cookieParser from "cookie-parser";
import routes from "./app/routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
const app: Application = express();

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json());
app.use(cookieParser())

app.use("/api", routes)

// Basic route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript + Express!");
});
// Global error handler
app.use(globalErrorHandler);
// Not found
app.use(notFound);

export default app;
