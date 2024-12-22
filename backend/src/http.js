const { createServer } = require("http");
const { stat, createReadStream, existsSync } = require("fs");
const { promisify } = require("util");
const path = require("path");
const uploadHandler = require("./uploadHandler");
const { getVideoList } = require("./metadataHandler");

const fileInfo = promisify(stat);

const videoBasePath = path.resolve(__dirname, "../public/videos");

createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Range");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Welcome to the Video API!");
      return;
    }

    if (pathname === "/videos") {
      return await getVideoList(req, res, videoBasePath);
    }

    if (pathname === "/video/upload" && req.method === "POST") {
      return await uploadHandler(req, res, videoBasePath);
    }

    if (pathname.startsWith("/videos/")) {
      const videoPath = path.join(
        videoBasePath,
        pathname.replace("/videos/", "")
      );
      if (existsSync(videoPath)) {
        res.writeHead(200, {
          "Content-Type": pathname.endsWith(".m3u8")
            ? "application/vnd.apple.mpegurl"
            : "video/mp2t",
        });
        return createReadStream(videoPath).pipe(res);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("File not found");
      }
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  } catch (error) {
    console.error("Error processing request:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}).listen(8000, () => console.log("Server running at http://localhost:8000/"));
