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

// ********************* FINAL VERSION OF BUTE RANGE REQUEST **************************** //

// // // // // // THE SIXTH VERSION || i it just module base
// const { createServer } = require("http");
// const { stat, createReadStream, existsSync } = require("fs");
// const { promisify } = require("util");
// const path = require("path");
// const uploadHandler = require("./uploadHandler");
// const { getVideoList } = require("./metadataHandler");

// const fileInfo = promisify(stat);

// const videoBasePath = path.resolve(__dirname, "../public/videos");

// createServer(async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Range");

//   if (req.method === "OPTIONS") {
//     res.writeHead(204);
//     return res.end();
//   }

//   try {
//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const pathname = url.pathname;

//     if (pathname === "/") {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("Welcome to the Video API!");
//       return;
//     }

//     if (pathname === "/videos") {
//       return await getVideoList(req, res, videoBasePath);
//     }

//     if (pathname === "/video/upload" && req.method === "POST") {
//       return await uploadHandler(req, res, videoBasePath);
//     }

//     const videoMatch = pathname.match(/^\/videos\/([^\/]+)\/(360|480|720)$/);
//     if (videoMatch) {
//       const videoName = videoMatch[1];
//       const quality = videoMatch[2];

//       const videoFolderPath = path.join(videoBasePath, videoName);
//       const outputFileName = `${videoName}-${quality}.mp4`;
//       const outputPath = path.join(videoFolderPath, outputFileName);

//       if (!existsSync(outputPath)) {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         return res.end("Requested video quality not found.");
//       }

//       const range = req.headers.range;
//       if (range) {
//         const { size } = await fileInfo(outputPath);
//         let [start, end] = range.replace(/bytes=/, "").split("-");
//         start = parseInt(start, 10);
//         end = end ? parseInt(end, 10) : size - 1;

//         if (start >= size || end >= size || start > end) {
//           res.writeHead(416, { "Content-Range": `bytes */${size}` });
//           return res.end();
//         }

//         res.writeHead(206, {
//           "Content-Range": `bytes ${start}-${end}/${size}`,
//           "Accept-Ranges": "bytes",
//           "Content-Length": end - start + 1,
//           "Content-Type": "video/mp4",
//         });

//         return createReadStream(outputPath, { start, end }).pipe(res);
//       } else {
//         const { size } = await fileInfo(outputPath);
//         res.writeHead(200, {
//           "Content-Length": size,
//           "Content-Type": "video/mp4",
//         });

//         return createReadStream(outputPath).pipe(res);
//       }
//     }

//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Route not found");
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.writeHead(500, { "Content-Type": "text/plain" });
//     res.end("Internal Server Error");
//   }
// }).listen(8000, () => console.log("Server running at http://localhost:8000/"));

// // // // THE FIFTH VERSION || i just installed ffmpeg but the FORTH VERSION ISWORKING OK
// const { createServer } = require("http");
// const { stat, createReadStream, existsSync, readdir, mkdir } = require("fs");
// const { promisify } = require("util");
// const path = require("path");
// const ffmpeg = require("fluent-ffmpeg");
// const ffmpegPath = require("ffmpeg-static");
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");

// const fileInfo = promisify(stat);
// const readdirAsync = promisify(readdir);
// const mkdirAsync = promisify(mkdir);

// const videoBasePath = path.resolve(__dirname, "../public/videos");

// // Set ffmpegPath for fluent-ffmpeg
// ffmpeg.setFfmpegPath(ffmpegPath);

// // Configure Multer for File Uploads
// const storage = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     const videoFolder = uuidv4();
//     const uploadPath = path.join(videoBasePath, videoFolder);
//     await mkdirAsync(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${uuidv4()}.mp4`);
//   },
// });

// const upload = multer({ storage });

// // Helper function to create video quality versions
// async function createVideoQualities(videoFolder, videoFile) {
//   const originalVideoPath = path.join(videoBasePath, videoFolder, videoFile);
//   const qualityFolderPath = path.join(videoBasePath, videoFolder);

//   const qualities = [
//     { quality: "360", size: "640x360", bitrate: "800k" },
//     { quality: "480", size: "854x480", bitrate: "1000k" },
//     { quality: "720", size: "1280x720", bitrate: "1500k" },
//   ];

//   qualities.forEach(({ quality, size, bitrate }) => {
//     const outputFile = `${videoFolder}-${quality}.mp4`;
//     const outputPath = path.join(qualityFolderPath, outputFile);

//     if (!existsSync(outputPath)) {
//       ffmpeg(originalVideoPath)
//         .size(size)
//         .videoCodec("libx264")
//         .output(outputPath)
//         .outputOptions(`-b:v ${bitrate}`)
//         .on("end", () => console.log(`Generated ${outputFile}`))
//         .on("error", (err) =>
//           console.error(`Error generating ${outputFile}: ${err.message}`)
//         )
//         .run();
//     }
//   });
// }

// // Create HTTP Server
// createServer(async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Range");

//   if (req.method === "OPTIONS") {
//     res.writeHead(204);
//     return res.end();
//   }

//   try {
//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const pathname = url.pathname;

//     // Welcome route
//     if (pathname === "/") {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("Welcome to the Video API!");
//       return;
//     }

//     // List available video folders
//     if (pathname === "/videos") {
//       const folders = await readdirAsync(videoBasePath, {
//         withFileTypes: true,
//       });
//       const videoFolders = folders
//         .filter((dirent) => dirent.isDirectory())
//         .map((dirent) => dirent.name);

//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(videoFolders));
//       return;
//     }

//     // Video upload route
//     if (pathname === "/video/upload" && req.method === "POST") {
//       upload.single("video")(req, res, async (err) => {
//         if (err) {
//           console.error("Upload error:", err);
//           res.writeHead(500, { "Content-Type": "text/plain" });
//           return res.end("Error uploading video.");
//         }

//         const { filename, destination } = req.file;
//         const videoFolder = path.basename(destination);

//         // Generate quality versions
//         await createVideoQualities(videoFolder, filename);

//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end(
//           `Video uploaded successfully. Available at /videos/${videoFolder}`
//         );
//       });
//       return;
//     }

//     // Video streaming route
//     const videoMatch = pathname.match(/^\/videos\/([^\/]+)\/(360|480|720)$/);
//     if (videoMatch) {
//       const videoName = videoMatch[1];
//       const quality = videoMatch[2];

//       const videoFolderPath = path.join(videoBasePath, videoName);
//       const outputFileName = `${videoName}-${quality}.mp4`;
//       const outputPath = path.join(videoFolderPath, outputFileName);

//       if (!existsSync(outputPath)) {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         return res.end("Requested video quality not found.");
//       }

//       const range = req.headers.range;
//       if (range) {
//         const { size } = await fileInfo(outputPath);
//         let [start, end] = range.replace(/bytes=/, "").split("-");
//         start = parseInt(start, 10);
//         end = end ? parseInt(end, 10) : size - 1;

//         if (start >= size || end >= size || start > end) {
//           res.writeHead(416, { "Content-Range": `bytes */${size}` });
//           return res.end();
//         }

//         res.writeHead(206, {
//           "Content-Range": `bytes ${start}-${end}/${size}`,
//           "Accept-Ranges": "bytes",
//           "Content-Length": end - start + 1,
//           "Content-Type": "video/mp4",
//         });

//         createReadStream(outputPath, { start, end }).pipe(res);
//       } else {
//         const { size } = await fileInfo(outputPath);
//         res.writeHead(200, {
//           "Content-Length": size,
//           "Content-Type": "video/mp4",
//         });

//         createReadStream(outputPath).pipe(res);
//       }
//       return;
//     }

//     // Fallback for unmatched routes
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Route not found");
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.writeHead(500, { "Content-Type": "text/plain" });
//     res.end("Internal Server Error");
//   }
// }).listen(8000, () => console.log("Server running at http://localhost:8000/"));

// // // // THE Forth VERSION || THE UPLOAD FEATURE IS WORKING OK
// const { createServer } = require("http");
// const {
//   stat,
//   createReadStream,
//   existsSync,
//   readdir,
//   writeFile,
//   mkdir,
// } = require("fs");
// const { promisify } = require("util");
// const path = require("path");
// const ffmpeg = require("fluent-ffmpeg");
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");

// const fileInfo = promisify(stat);
// const readdirAsync = promisify(readdir);
// const mkdirAsync = promisify(mkdir);

// const videoBasePath = path.resolve(__dirname, "../public/videos");

// // Configure Multer for File Uploads
// const storage = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     const videoFolder = uuidv4();
//     const uploadPath = path.join(videoBasePath, videoFolder);
//     await mkdirAsync(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${uuidv4()}.mp4`); // Save video with a unique name
//   },
// });

// const upload = multer({ storage });

// // Helper function to create video quality versions
// async function createVideoQualities(videoFolder, videoFile) {
//   const originalVideoPath = path.join(videoBasePath, videoFolder, videoFile);
//   const qualityFolderPath = path.join(videoBasePath, videoFolder);

//   const qualities = [
//     { quality: "360", size: "640x360", bitrate: "800k" },
//     { quality: "480", size: "854x480", bitrate: "1000k" },
//     { quality: "720", size: "1280x720", bitrate: "1500k" },
//   ];

//   qualities.forEach(({ quality, size, bitrate }) => {
//     const outputFile = `${videoFolder}-${quality}.mp4`; // Use videoFolder as the base name
//     const outputPath = path.join(qualityFolderPath, outputFile);

//     if (!existsSync(outputPath)) {
//       ffmpeg(originalVideoPath)
//         .size(size)
//         .videoCodec("libx264")
//         .output(outputPath)
//         .outputOptions(`-b:v ${bitrate}`)
//         .on("end", () => console.log(`Generated ${outputFile}`)) // Log success
//         .on("error", (err) =>
//           console.error(`Error generating ${outputFile}: ${err.message}`)
//         ) // Log errors
//         .run();
//     }
//   });
// }

// // Create HTTP Server
// createServer(async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Range");

//   if (req.method === "OPTIONS") {
//     res.writeHead(204);
//     return res.end();
//   }

//   try {
//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const pathname = url.pathname;

//     // Welcome route
//     if (pathname === "/") {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("Welcome to the Video API!");
//       return;
//     }

//     // List available video folders
//     if (pathname === "/videos") {
//       const folders = await readdirAsync(videoBasePath, {
//         withFileTypes: true,
//       });
//       const videoFolders = folders
//         .filter((dirent) => dirent.isDirectory())
//         .map((dirent) => dirent.name);

//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(videoFolders));
//       return;
//     }

//     // Video upload route
//     if (pathname === "/video/upload" && req.method === "POST") {
//       upload.single("video")(req, res, async (err) => {
//         if (err) {
//           console.error("Upload error:", err);
//           res.writeHead(500, { "Content-Type": "text/plain" });
//           return res.end("Error uploading video.");
//         }

//         const { filename, destination } = req.file;
//         const videoFolder = path.basename(destination);

//         // Generate quality versions
//         await createVideoQualities(videoFolder, filename);

//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end(
//           `Video uploaded successfully. Available at /videos/${videoFolder}`
//         );
//       });
//       return;
//     }

//     // Video streaming route
//     const videoMatch = pathname.match(/^\/videos\/([^\/]+)\/(360|480|720)$/);
//     if (videoMatch) {
//       const videoName = videoMatch[1];
//       const quality = videoMatch[2];

//       const videoFolderPath = path.join(videoBasePath, videoName);
//       const outputFileName = `${videoName}-${quality}.mp4`; // Match the generated file name
//       const outputPath = path.join(videoFolderPath, outputFileName);

//       if (!existsSync(outputPath)) {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         return res.end("Requested video quality not found.");
//       }

//       const range = req.headers.range;
//       if (range) {
//         const { size } = await fileInfo(outputPath);
//         let [start, end] = range.replace(/bytes=/, "").split("-");
//         start = parseInt(start, 10);
//         end = end ? parseInt(end, 10) : size - 1;

//         if (start >= size || end >= size || start > end) {
//           res.writeHead(416, { "Content-Range": `bytes */${size}` });
//           return res.end();
//         }

//         res.writeHead(206, {
//           "Content-Range": `bytes ${start}-${end}/${size}`,
//           "Accept-Ranges": "bytes",
//           "Content-Length": end - start + 1,
//           "Content-Type": "video/mp4",
//         });

//         createReadStream(outputPath, { start, end }).pipe(res);
//       } else {
//         const { size } = await fileInfo(outputPath);
//         res.writeHead(200, {
//           "Content-Length": size,
//           "Content-Type": "video/mp4",
//         });

//         createReadStream(outputPath).pipe(res);
//       }
//       return;
//     }

//     // Fallback for unmatched routes
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Route not found");
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.writeHead(500, { "Content-Type": "text/plain" });
//     res.end("Internal Server Error");
//   }
// }).listen(8000, () => console.log("Server running at http://localhost:8000/"));

// // // THE Third VERSION || this one upload videos but it has some problem
// const { createServer } = require("http");
// const { stat, createReadStream, existsSync, readdir, writeFile, mkdir } = require("fs");
// const { promisify } = require("util");
// const path = require("path");
// const ffmpeg = require("fluent-ffmpeg");
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");

// const fileInfo = promisify(stat);
// const readdirAsync = promisify(readdir);
// const mkdirAsync = promisify(mkdir);

// const videoBasePath = path.resolve(__dirname, "../public/videos");

// // Configure Multer for File Uploads
// const storage = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     const videoFolder = uuidv4();
//     const uploadPath = path.join(videoBasePath, videoFolder);
//     await mkdirAsync(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${uuidv4()}.mp4`); // Save video with a unique name
//   },
// });

// const upload = multer({ storage });

// // Helper function to create video quality versions
// async function createVideoQualities(videoFolder, videoFile) {
//   const originalVideoPath = path.join(videoBasePath, videoFolder, videoFile);
//   const qualityFolderPath = path.join(videoBasePath, videoFolder);

//   const qualities = [
//     { quality: "360", size: "640x360", bitrate: "800k" },
//     { quality: "480", size: "854x480", bitrate: "1000k" },
//     { quality: "720", size: "1280x720", bitrate: "1500k" },
//   ];

//   qualities.forEach(({ quality, size, bitrate }) => {
//     const outputFile = `${videoFile.split(".")[0]}-${quality}.mp4`;
//     const outputPath = path.join(qualityFolderPath, outputFile);

//     if (!existsSync(outputPath)) {
//       ffmpeg(originalVideoPath)
//         .size(size)
//         .videoCodec("libx264")
//         .output(outputPath)
//         .outputOptions(`-b:v ${bitrate}`)
//         .on("error", (err) => console.error(`FFmpeg error: ${err.message}`))
//         .run();
//     }
//   });
// }

// // Create HTTP Server
// createServer(async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Range");

//   if (req.method === "OPTIONS") {
//     res.writeHead(204);
//     return res.end();
//   }

//   try {
//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const pathname = url.pathname;

//     // Welcome route
//     if (pathname === "/") {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("Welcome to the Video API!");
//       return;
//     }

//     // List available video folders
//     if (pathname === "/videos") {
//       const folders = await readdirAsync(videoBasePath, { withFileTypes: true });
//       const videoFolders = folders
//         .filter((dirent) => dirent.isDirectory())
//         .map((dirent) => dirent.name);

//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(videoFolders));
//       return;
//     }

//     // Video upload route
//     if (pathname === "/video/upload" && req.method === "POST") {
//       upload.single("video")(req, res, async (err) => {
//         if (err) {
//           console.error("Upload error:", err);
//           res.writeHead(500, { "Content-Type": "text/plain" });
//           return res.end("Error uploading video.");
//         }

//         const { filename, destination } = req.file;
//         const videoFolder = path.basename(destination);

//         // Generate quality versions
//         await createVideoQualities(videoFolder, filename);

//         res.writeHead(200, { "Content-Type": "text/plain" });
//         res.end(`Video uploaded successfully. Available at /videos/${videoFolder}`);
//       });
//       return;
//     }

//     // Video streaming route
//     const videoMatch = pathname.match(/^\/videos\/([^\/]+)\/(360|480|720)$/);
//     if (videoMatch) {
//       const videoName = videoMatch[1];
//       const quality = videoMatch[2];

//       const videoFolderPath = path.join(videoBasePath, videoName);
//       const outputFileName = `${videoName}-${quality}.mp4`;
//       const outputPath = path.join(videoFolderPath, outputFileName);

//       if (!existsSync(outputPath)) {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         return res.end("Requested video quality not found.");
//       }

//       const range = req.headers.range;
//       if (range) {
//         const { size } = await fileInfo(outputPath);
//         let [start, end] = range.replace(/bytes=/, "").split("-");
//         start = parseInt(start, 10);
//         end = end ? parseInt(end, 10) : size - 1;

//         if (start >= size || end >= size || start > end) {
//           res.writeHead(416, { "Content-Range": `bytes */${size}` });
//           return res.end();
//         }

//         res.writeHead(206, {
//           "Content-Range": `bytes ${start}-${end}/${size}`,
//           "Accept-Ranges": "bytes",
//           "Content-Length": end - start + 1,
//           "Content-Type": "video/mp4",
//         });

//         createReadStream(outputPath, { start, end }).pipe(res);
//       } else {
//         const { size } = await fileInfo(outputPath);
//         res.writeHead(200, {
//           "Content-Length": size,
//           "Content-Type": "video/mp4",
//         });

//         createReadStream(outputPath).pipe(res);
//       }
//       return;
//     }

//     // Fallback for unmatched routes
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Route not found");
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.writeHead(500, { "Content-Type": "text/plain" });
//     res.end("Internal Server Error");
//   }
// }).listen(8000, () => console.log("Server running at http://localhost:8000/"));

// // THE Third VERSION || this one upload videos but it has some problem
// const { createServer } = require("http");
// const { stat, createReadStream, existsSync, readdir, writeFile, mkdir } = require("fs");
// const { promisify } = require("util");
// const path = require("path");
// const ffmpeg = require("fluent-ffmpeg");
// const { v4: uuidv4 } = require("uuid");

// const fileInfo = promisify(stat);
// const readdirAsync = promisify(readdir);
// const writeFileAsync = promisify(writeFile);
// const mkdirAsync = promisify(mkdir);  // Added this line

// const videoBasePath = path.resolve(__dirname, "../public/videos");

// // Helper function to list video folders
// async function listVideoFolders() {
//   try {
//     const folders = await readdirAsync(videoBasePath, { withFileTypes: true });
//     return folders.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
//   } catch (error) {
//     console.error("Error reading video folders:", error);
//     return [];
//   }
// }

// // Helper function to parse multipart form data (video upload)
// function parseFormData(req) {
//   return new Promise((resolve, reject) => {
//     const boundary = `--${req.headers["content-type"].split("boundary=")[1]}`;
//     const chunks = [];

//     req.on("data", (chunk) => chunks.push(chunk));
//     req.on("end", () => {
//       const buffer = Buffer.concat(chunks);
//       const parts = buffer.toString().split(boundary).filter((part) => part.trim());

//       let fileBuffer = null;
//       parts.forEach((part) => {
//         // Look for the "Content-Disposition" header
//         if (part.includes('Content-Disposition: form-data; name="video";')) {
//           // Extract file content after header and before trailing boundary
//           const contentIndex = part.indexOf("\r\n\r\n") + 4;
//           const fileContent = part.slice(contentIndex, part.lastIndexOf("\r\n"));
//           fileBuffer = Buffer.from(fileContent, "binary");
//         }
//       });

//       if (fileBuffer) {
//         resolve(fileBuffer);
//       } else {
//         reject(new Error("No file found in the form data."));
//       }
//     });

//     req.on("error", reject);
//   });
// }

// // Helper function to create video quality versions
// async function createVideoQualities(videoFolder, videoFile) {
//   const originalVideoPath = path.join(videoBasePath, videoFolder, videoFile);
//   const qualityFolderPath = path.join(videoBasePath, videoFolder);

//   // Generate 3 quality versions using FFmpeg
//   const qualities = [
//     { quality: "360", size: "640x360", bitrate: "800k" },
//     { quality: "480", size: "854x480", bitrate: "1000k" },
//     { quality: "720", size: "1280x720", bitrate: "1500k" }
//   ];

//   qualities.forEach(({ quality, size, bitrate }) => {
//     const outputFile = `${videoFolder}-${quality}.mp4`;
//     const outputPath = path.join(qualityFolderPath, outputFile);

//     if (!existsSync(outputPath)) {
//       ffmpeg(originalVideoPath)
//         .size(size)
//         .videoCodec('libx264')
//         .output(outputPath)
//         .outputOptions(`-b:v ${bitrate}`)
//         .run();
//     }
//   });
// }

// // Handle the request
// createServer(async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Range");

//   // Handle OPTIONS preflight requests
//   if (req.method === "OPTIONS") {
//     res.writeHead(204);
//     return res.end();
//   }

//   try {
//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const pathname = url.pathname;

//     // Welcome message
//     if (pathname === "/") {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("Welcome to the Video API!");
//       return;
//     }

//     // List videos route
//     if (pathname === "/videos") {
//       const videoFolders = await listVideoFolders();
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(videoFolders));
//       return;
//     }

//     // Video upload route (updated to /video/upload)
//     if (pathname === "/video/upload" && req.method === "POST") {
//       const videoBuffer = await parseFormData(req);

//       if (!videoBuffer) {
//         res.writeHead(400, { "Content-Type": "text/plain" });
//         res.end("Error uploading video.");
//         return;
//       }

//       // Generate unique video ID using UUID
//       const videoId = uuidv4();
//       const videoFolder = `${videoId}`;
//       const videoFolderPath = path.join(videoBasePath, videoFolder);

//       // Create the folder for the uploaded video
//       if (!existsSync(videoFolderPath)) {
//         await mkdirAsync(videoFolderPath);
//       }

//       // Save the uploaded video in the new folder
//       const videoFilePath = path.join(videoFolderPath, `${videoId}.mp4`);
//       await writeFileAsync(videoFilePath, videoBuffer);

//       // Generate video quality versions after the upload
//       await createVideoQualities(videoFolder, `${videoId}.mp4`);

//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end(`Video uploaded successfully. Available at /videos/${videoId}`);
//       return;
//     }

//     // Video streaming route (dynamic video folder and quality)
//     const videoMatch = pathname.match(/^\/videos\/([^\/]+)\/(360|480|720)$/);
//     if (videoMatch) {
//       const videoName = videoMatch[1];  // e.g., video1, video2, etc.
//       const quality = videoMatch[2];    // e.g., 360, 480, 720

//       const videoFolderPath = path.join(videoBasePath, videoName);
//       const originalVideoPath = path.join(videoFolderPath, `${videoName}.mp4`);
//       const outputFileName = `${videoName}-${quality}.mp4`;
//       const outputPath = path.join(videoFolderPath, outputFileName);

//       // Check if the video file exists, and create it if necessary
//       if (!existsSync(outputPath)) {
//         let ffmpegCommand = ffmpeg(originalVideoPath);
//         switch (quality) {
//           case '360':
//             ffmpegCommand = ffmpegCommand.size('640x360').videoCodec('libx264').output(outputPath).outputOptions('-b:v 800k');
//             break;
//           case '480':
//             ffmpegCommand = ffmpegCommand.size('854x480').videoCodec('libx264').output(outputPath).outputOptions('-b:v 1000k');
//             break;
//           case '720':
//             ffmpegCommand = ffmpegCommand.size('1280x720').videoCodec('libx264').output(outputPath).outputOptions('-b:v 1500k');
//             break;
//         }
//         ffmpegCommand.run();
//       }

//       // Handle partial content (for video streaming)
//       const range = req.headers.range;
//       if (range) {
//         const { size } = await fileInfo(outputPath);
//         let [start, end] = range.replace(/bytes=/, "").split("-");
//         start = parseInt(start, 10);
//         end = end ? parseInt(end, 10) : size - 1;

//         res.writeHead(206, {
//           "Content-Range": `bytes ${start}-${end}/${size}`,
//           "Accept-Ranges": "bytes",
//           "Content-Length": end - start + 1,
//           "Content-Type": "video/mp4",
//         });

//         createReadStream(outputPath, { start, end }).pipe(res);
//       } else {
//         // Handle full video stream
//         const { size } = await fileInfo(outputPath);
//         res.writeHead(200, {
//           "Content-Length": size,
//           "Content-Type": "video/mp4",
//         });

//         createReadStream(outputPath).pipe(res);
//       }
//       return;
//     }

//     // If route not found
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Route not found");
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.writeHead(500, { "Content-Type": "text/plain" });
//     res.end("Internal Server Error");
//   }
// }).listen(8000, () => console.log("Server running at http://localhost:8000/"));

// THE SECOND VERSION
// const { createServer } = require("http");
// const { stat, createReadStream, existsSync, readdir } = require("fs");
// const { promisify } = require("util");
// const path = require("path");
// const ffmpeg = require("fluent-ffmpeg");

// const fileInfo = promisify(stat);
// const readdirAsync = promisify(readdir);

// // Base path for videos
// const videoBasePath = path.resolve(__dirname, "../public/videos");

// // Helper function to list video folders
// async function listVideoFolders() {
//   try {
//     const folders = await readdirAsync(videoBasePath, { withFileTypes: true });
//     return folders.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
//   } catch (error) {
//     console.error("Error reading video folders:", error);
//     return [];
//   }
// }

// // Handle the request
// createServer(async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Range");

//   // Handle OPTIONS preflight requests
//   if (req.method === "OPTIONS") {
//     res.writeHead(204);
//     return res.end();
//   }

//   try {
//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const pathname = url.pathname;

//     // Welcome message
//     if (pathname === "/") {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("Welcome to the Video API!");
//       return;
//     }

//     // List videos route
//     if (pathname === "/videos") {
//       const videoFolders = await listVideoFolders();
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(videoFolders));
//       return;
//     }

//     // Video streaming route (dynamic video folder and quality)
//     const videoMatch = pathname.match(/^\/videos\/([^\/]+)\/(360|480|720)$/);
//     if (videoMatch) {
//       const videoName = videoMatch[1];  // e.g., video1, video2, etc.
//       const quality = videoMatch[2];    // e.g., 360, 480, 720

//       const videoFolderPath = path.join(videoBasePath, videoName);
//       const originalVideoPath = path.join(videoFolderPath, `${videoName}.mp4`);
//       const outputFileName = `${videoName}-${quality}.mp4`;
//       const outputPath = path.join(videoFolderPath, outputFileName);

//       // Check if the video file exists, and create it if necessary
//       if (!existsSync(outputPath)) {
//         let ffmpegCommand = ffmpeg(originalVideoPath);
//         switch (quality) {
//           case '360':
//             ffmpegCommand = ffmpegCommand.size('640x360').videoCodec('libx264').output(outputPath).outputOptions('-b:v 800k');
//             break;
//           case '480':
//             ffmpegCommand = ffmpegCommand.size('854x480').videoCodec('libx264').output(outputPath).outputOptions('-b:v 1000k');
//             break;
//           case '720':
//             ffmpegCommand = ffmpegCommand.size('1280x720').videoCodec('libx264').output(outputPath).outputOptions('-b:v 1500k');
//             break;
//         }
//         ffmpegCommand.run();
//       }

//       // Handle partial content (for video streaming)
//       const range = req.headers.range;
//       if (range) {
//         const { size } = await fileInfo(outputPath);
//         let [start, end] = range.replace(/bytes=/, "").split("-");
//         start = parseInt(start, 10);
//         end = end ? parseInt(end, 10) : size - 1;

//         res.writeHead(206, {
//           "Content-Range": `bytes ${start}-${end}/${size}`,
//           "Accept-Ranges": "bytes",
//           "Content-Length": end - start + 1,
//           "Content-Type": "video/mp4",
//         });

//         createReadStream(outputPath, { start, end }).pipe(res);
//       } else {
//         // Handle full video stream
//         const { size } = await fileInfo(outputPath);
//         res.writeHead(200, {
//           "Content-Length": size,
//           "Content-Type": "video/mp4",
//         });

//         createReadStream(outputPath).pipe(res);
//       }
//       return;
//     }

//     // If route not found
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Route not found");
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.writeHead(500, { "Content-Type": "text/plain" });
//     res.end("Internal Server Error");
//   }
// }).listen(8000, () => console.log("Server running at http://localhost:8000/"));

// // THE FIRST VERSION || STREAM MULTIPLE VIDEO => WORK WITH REACT FIRST VERSION

// const { createServer } = require("http");
// const { stat, createReadStream, existsSync } = require("fs");
// const { promisify } = require("util");
// const path = require("path");

// const fileInfo = promisify(stat);

// // Map videoIds to video file paths
// const videoMap = {
//   video1: "../public/videos/video1.mp4",
//   video2: "../public/videos/video2.mp4",
//   video3: "../public/videos/video3.mp4",
// };

// createServer(async (req, res) => {
//   // Add CORS headers
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Range");

//   // Handle OPTIONS preflight requests
//   if (req.method === "OPTIONS") {
//     res.writeHead(204);
//     return res.end();
//   }

//   try {
//     // Parse the videoId from the query parameters
//     const url = new URL(req.url, `http://${req.headers.host}`);
//     const videoId = url.searchParams.get("videoId");

//     // Check if the videoId exists in the mapping
//     if (!videoId || !videoMap[videoId]) {
//       res.writeHead(404, { "Content-Type": "text/plain" });
//       return res.end("Video not found");
//     }

//     // Get the file path for the corresponding videoId
//     const filePath = path.resolve(__dirname, videoMap[videoId]);

//     // Check if the video file exists
//     if (!existsSync(filePath)) {
//       res.writeHead(404, { "Content-Type": "text/plain" });
//       return res.end("Video file not found");
//     }

//     const { size } = await fileInfo(filePath);
//     const range = req.headers.range;

//     // Handle partial content (for video streaming)
//     if (range) {
//       let [start, end] = range.replace(/bytes=/, "").split("-");
//       start = parseInt(start, 10);
//       end = end ? parseInt(end, 10) : size - 1;

//       res.writeHead(206, {
//         "Content-Range": `bytes ${start}-${end}/${size}`,
//         "Accept-Ranges": "bytes",
//         "Content-Length": end - start + 1,
//         "Content-Type": "video/mp4",
//       });

//       const stream = createReadStream(filePath, { start, end });
//       stream.pipe(res);
//     } else {
//       // Serve the full video if no range header is provided
//       res.writeHead(200, {
//         "Content-Length": size,
//         "Content-Type": "video/mp4",
//       });

//       const stream = createReadStream(filePath);
//       stream.pipe(res);
//     }
//   } catch (error) {
//     res.writeHead(500, { "Content-Type": "text/plain" });
//     res.end("Internal Server Error");
//   }
// }).listen(8000, () => console.log("http://localhost:8000/"));

// const { createServer } = require("http");
// const { stat, createReadStream } = require("fs");
// const { promisify } = require("util");
// const filename = "../public/videos/video1.mp4";
// const fileInfo = promisify(stat);

// createServer(async (req, res) => {
//   // Add CORS headers
//   res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
//   res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Range");

//   if (req.method === "OPTIONS") {
//     res.writeHead(204); // Handle preflight request
//     return res.end();
//   }

//   try {
//     const { size } = await fileInfo(filename);
//     const range = req.headers.range;

//     if (range) {
//       let [start, end] = range.replace(/bytes=/, "").split("-");
//       start = parseInt(start, 10);
//       end = end ? parseInt(end, 10) : size - 1;

//       res.writeHead(206, {
//         "Content-Range": `bytes ${start}-${end}/${size}`,
//         "Accept-Ranges": "bytes",
//         "Content-Length": end - start + 1,
//         "Content-Type": "video/mp4",
//       });

//       const stream = createReadStream(filename, { start, end });
//       stream.pipe(res);
//     } else {
//       res.writeHead(200, {
//         "Content-Length": size,
//         "Content-Type": "video/mp4",
//       });

//       const stream = createReadStream(filename);
//       stream.pipe(res);
//     }
//   } catch (error) {
//     res.writeHead(500, { "Content-Type": "text/plain" });
//     res.end("Internal Server Error");
//   }
// }).listen(8000, () => console.log("http://localhost:8000/"));

// // const { createServer } = require("http");
// // const { stat, createReadStream } = require("fs");
// // const { promisify } = require("util");

// // const filename = "../public/videos/video2.mp4";
// // const fileInfo = promisify(stat);
// // let i = 0;

// // createServer(async (req, res) => {
// //   const { size } = await fileInfo(filename);
// //   const range = req.headers.range;
// //   console.log("RANGE", range);

// //   i++;
// //   console.log(i);

// //   if (range) {
// //     let [start, end] = range.replace(/bytes=/, "").split("-");
// //     start = parseInt(start, 10);
// //     end = end ? parseInt(end, 10) : size - 1;

// //     res.writeHead(206, {
// //       "Content-Range": `bytes ${start}-${end}/${size}`,
// //       "Accept-Ranges": "bytes",
// //       "Content-Length": end - start + 1,
// //       "Content-Type": "video/mp4",
// //     });
// //     // Create read stream for the specific range.
// //     const stream = createReadStream(filename, { start, end });
// //     stream.pipe(res);
// //   } else {
// //     // If no range header, respond with the full video file.
// //     res.writeHead(200, {
// //       "Content-Length": size,
// //       "Content-Type": "video/mp4",
// //     });

// //     // Create read stream for the entire file.
// //     const stream = createReadStream(filename);
// //     stream.pipe(res);
// //   }
// // }).listen(8000, () => console.log("http://localhost:8000/"));

// ======

// const { createServer } = require("http");
// const { stat, createReadStream } = require("fs");
// const { promisify } = require("util");

// const filename = "../public/videos/video2.mp4";
// const fileInfo = promisify(stat);
// let i = 0;

// createServer(async (req, res) => {
//   const { size } = await fileInfo(filename);
//   const range = req.headers.range;
//   console.log("RANGE", range);

//   i++;
//   console.log(i);

//   if (range) {
//     let [start, end] = range.replace(/bytes=/, "").split("-");
//     start = parseInt(start, 10);
//     end = end ? parseInt(end, 10) : size - 1;

//     res.writeHead(206, {
//       "Content-Range": `bytes ${start}-${end}/${size}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": end - start + 1,
//       "Content-Type": "video/mp4",
//     });
//     // Create read stream for the specific range.
//     const stream = createReadStream(filename, { start, end });
//     stream.pipe(res);
//   } else {
//     // If no range header, respond with the full video file.
//     res.writeHead(200, {
//       "Content-Length": size,
//       "Content-Type": "video/mp4",
//     });

//     // Create read stream for the entire file.
//     const stream = createReadStream(filename);
//     stream.pipe(res);
//   }
// }).listen(8000, () => console.log("http://localhost:8000/"));
