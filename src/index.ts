import express from "express";
import { days } from "./days";

const port = 3024;

const app = express();

app.use(express.json());

app.get("/aoc/:day/:part", async ({ params, query }, res) => {
  const day = parseInt(params.day);
  const part = parseInt(params.part);
  const isSample = typeof query.sample !== "undefined";

  const result = await days(day, part, isSample);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
