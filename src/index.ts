import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(express.static("public"));

app.get("/api/:date?", (req: Request, res: Response) => {
  try {
    const unixNumber = Number(req.params.date);
    let date;

    if (Number.isNaN(unixNumber)) {
      date = req.params.date ? new Date(req.params.date) : new Date();
    } else {
      date = new Date(unixNumber);
    }

    if (date instanceof Date && !Number.isNaN(date.getTime())) {
      res.status(200).json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    } else {
      res.status(400).json({
        error: "Invalid Date",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Invalid Date",
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
