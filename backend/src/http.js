const { createServer } = require("http");
const { stat, createReadStream } = require("fs");
const { promisify } = require("util");

const filename = "../public/videos/video2.mp4";
const fileInfo = promisify(stat);
let i = 0;

createServer(async (req, res) => {
  const { size } = await fileInfo(filename);
  const range = req.headers.range;
  console.log("RANGE", range);

  i++;
  console.log(i);

  if (range) {
    let [start, end] = range.replace(/bytes=/, "").split("-");
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    });
    // Create read stream for the specific range.
    const stream = createReadStream(filename, { start, end });
    stream.pipe(res);
  } else {
    // If no range header, respond with the full video file.
    res.writeHead(200, {
      "Content-Length": size,
      "Content-Type": "video/mp4",
    });

    // Create read stream for the entire file.
    const stream = createReadStream(filename);
    stream.pipe(res);
  }
}).listen(8000, () => console.log("http://localhost:8000/"));
