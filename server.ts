import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { handlePredictTokens } from "./routes/predict";
import { handleTutorChat } from "./routes/tutor";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/api/predict-tokens", handlePredictTokens);
app.post("/api/tutor-chat", handleTutorChat);

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Corriendo en http://localhost:${PORT}`);
  });
}

startServer();
