const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const OneSignal = require("onesignal-node");
const Router = require("./routes/routes");

const client = new OneSignal.Client(
  process.env.ONESIGNAL_APPID,
  process.env.ONESIGNAL_API_KEY
);
var cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connection established!");
  })
  .catch((err) => console.log(err));

app.use(Router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}
app.get("/", (req, res) => {
  res.send(`Server is running!`);
});

app.get("/sendnoty", async (req, res) => {
  const notification = {
    contents: {
      en: "Hello from ONESIGNAL",
    },
    included_segments: ["Subscribed Users"],
  };

  // using async/await
  try {
    const response = await client.createNotification(notification);
  } catch (e) {
    if (e instanceof OneSignal.HTTPError) {
      // When status code of HTTP response is not 2xx, HTTPError is thrown.
      console.log(e.statusCode);
      console.log(e.body);
    }
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
