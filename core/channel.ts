import * as fs from "fs";

export class Channel {
  token: string;
  constructor(token: string) {
    this.token = token;
  }

  async checkHealth() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${this.token}`,
      }
    };

    const responseRaw = await fetch("https://gate.whapi.cloud/health?wakeup=false", options);
    const response = await responseRaw.json();
    if (response.status.text !== "AUTH") throw "Channel not auth";
  }

  async sendLocalJPG(filePath: string, to: string, caption?: string): Promise<string>{
    let media: string;
    const base64 = fs.readFileSync(filePath, "base64"); // file to base64
    if (!base64 || base64 === "") {
      return "File is empty!";
    }
    console.log(`Encoded file: ${base64}`); // Log base64
    const fileName = filePath.split("/").pop(); // Get fileName from filePath
    media = `data:image/jpeg;name=${fileName};base64,${base64}`; // if you need send png - change jpeg to png
    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${this.token}`,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        to,
        media,
        caption
      }),
    };
    const url = "https://gate.whapi.cloud/messages/image";
    const response = await fetch(url, options);
    if(response.status === 200) return "success"
    throw response.statusText
  }
}
