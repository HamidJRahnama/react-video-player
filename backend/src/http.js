const { createServer } = require("http");
const { stat, createReadStream } = require("fs");
const { promisify } = require("util");
const filename = "../public/videos/video1.mp4";
const fileInfo = promisify(stat);

createServer(async (req, res) => {
  const { size } = await fileInfo(filename);
  const range = req.headers.range;
  console.log("RANGE", range);

  // res.writeHead(200, {
  //   "Content-Length": size,
  //   "Content-Type": "video/mp4",
  // });

  if (range) {
    let [start, end] = range.replace(/bytes=/, "").split("-");
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;

    res.writeHead(206, {
      "Contennt-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": start - end + 1,
      "Content-Type": "video/mp4",
    });

    createReadStream(filename, { start, end }).pipe(res);
  } else {
    res.writeHead(206, {
      "Content-Length": size,
      "Content-Type": "video/mp4",
    });
  }

  //   res.writeHead(200, {
  //     "Content-Length": size,
  //     "Content-Type": "video/mp4",
  //   });
  // res.writeHead(200, {
  //   "Content-type": "text",
  // });
  createReadStream(filename).pipe(res);
}).listen(8000, () => console.log("http://localhost:8000/"));
