import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com"
  }
];

// GET /
app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Express TypeScript API is running"
  });
});

// GET /api/health
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "healthy"
  });
});

// GET /api/users
app.get("/api/users", (_req: Request, res: Response) => {
  res.json(users);
});

// POST /api/echo
app.post("/api/echo", (req: Request, res: Response) => {
  res.json({
    received: req.body
  });
});

// Start the HTTP server
const endpoint = process.env.AWS_LAMBDA_HTTP_ENDPOINT ?? "127.0.0.1:3000";

const separatorIndex = endpoint.lastIndexOf(":");
const host = endpoint.substring(0, separatorIndex);
const port = Number(endpoint.substring(separatorIndex + 1));

app.listen(port, host, () => {
  console.log(`API listening on http://${host}:${port}`);
});