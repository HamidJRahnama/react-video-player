// uploadHandler.js
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
const { mkdir } = require("fs");
const { createVideoQualities } = require("./videoProcessor");
const { updateMetadata } = require("./metadataHandler"); // Correctly import updateMetadata

const mkdirAsync = promisify(mkdir);

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const videoFolder = uuidv4();
    const uploadPath = path.join(req.videoBasePath, videoFolder);
    await mkdirAsync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}.mp4`);
  },
});

const upload = multer({ storage });

module.exports = async (req, res, videoBasePath) => {
  req.videoBasePath = videoBasePath;
  upload.single("video")(req, res, async (err) => {
    if (err) {
      console.error("Upload error:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("Error uploading video.");
    }

    const { filename, destination } = req.file;
    const videoFolder = path.basename(destination);

    // Extract title and description from the form data
    const title = req.body.title;
    const description = req.body.description;

    const metadata = { title, description, videoFile: filename };
    await updateMetadata(videoFolder, metadata);

    await createVideoQualities(videoFolder, filename, videoBasePath);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Video uploaded successfully. Available at /videos/${videoFolder}`);
  });
};

// ********************* FINAL VERSION OF BUTE RANGE REQUEST **************************** //

// const multer = require("multer");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");
// const { promisify } = require("util");
// const { mkdir } = require("fs");
// const { createVideoQualities } = require("./videoProcessor");
// const { updateMetadata } = require("./metadataHandler");

// const mkdirAsync = promisify(mkdir);

// const storage = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     const videoFolder = uuidv4();
//     const uploadPath = path.join(req.videoBasePath, videoFolder);
//     await mkdirAsync(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${uuidv4()}.mp4`);
//   },
// });

// const upload = multer({ storage });

// module.exports = async (req, res, videoBasePath) => {
//   req.videoBasePath = videoBasePath;
//   upload.single("video")(req, res, async (err) => {
//     if (err) {
//       console.error("Upload error:", err);
//       res.writeHead(500, { "Content-Type": "text/plain" });
//       return res.end("Error uploading video.");
//     }

//     const { filename, destination } = req.file;
//     const videoFolder = path.basename(destination);

//     // Extract title and description from the form data
//     const title = req.body.title;
//     const description = req.body.description;

//     const metadata = { title, description, videoFile: filename };
//     await updateMetadata(videoFolder, metadata);

//     await createVideoQualities(videoFolder, filename, videoBasePath);

//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end(`Video uploaded successfully. Available at /videos/${videoFolder}`);
//   });
// };
