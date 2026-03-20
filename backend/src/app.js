import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
const openApiDocument = YAML.load("./swagger/openapi.yaml");

// Required when running behind Nginx/Render/Vercel proxy so rate-limiter can resolve client IP.
app.set("trust proxy", 1);

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300
  })
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use("/api/v1", routes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || "Internal server error"
  });
});

export default app;
