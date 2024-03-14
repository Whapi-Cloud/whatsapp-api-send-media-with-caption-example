const fs = require("fs");
const ChannelApi = require("./core/channel").Channel;

const filePath = "./YOUR_FILE.jpg"; // FIle path jpg
const mediaUrl = "YOUR URL"; // Media url
const token = "YOUR TOKEN"; // Channel token
const phone = "YOUR PHONE"; // Phone for sending
const text = "1row\n 2row \n3row \n 4row"; // Text for sending (caption)

async function start() {
  try {
    const channel = new ChannelApi(token);
    await channel.checkHealth();
    // for send jpg from local
    // if (!fs.existsSync(filePath)) throw "File not found";
    // const result = await channel.sendLocalJPG(filePath, phone, text);

    // for send media from url
    const result = await channel.sendUrlMedia(mediaUrl, phone, text)
    console.log(result); // if success - OK
  } catch (e) {
    console.log(e)
  }
}
start().then();
