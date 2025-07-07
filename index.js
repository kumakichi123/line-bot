const express = require("express");
const line = require("@line/bot-sdk");

const config = {
  channelAccessToken: "YOUR_CHANNEL_ACCESS_TOKEN",
  channelSecret: "YOUR_CHANNEL_SECRET"
};

const app = express();
const client = new line.Client(config);

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: `あなたのメッセージ: ${event.message.text}`
  });
}

app.listen(process.env.PORT || 3000);
