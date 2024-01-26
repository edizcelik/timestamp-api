import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.static("public"));

app.get("/api/:date?", (req: Request, res: Response) => {
  try {
    const unixNumber = Number(req.params.date);
    const date = Number.isNaN(unixNumber)
      ? new Date(req.params.date)
      : new Date(unixNumber);

    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } catch (error) {
    res.status(400);
    res.json({
      error: "Invalid Date",
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
