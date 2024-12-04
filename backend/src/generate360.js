const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");

const inputFilePath = path.resolve(
  __dirname,
  "../public/videos/video1/video1.mp4"
);
const outputFilePath = path.resolve(
  __dirname,
  "../public/videos/video1/video1-360.mp4"
);

// Set the ffmpeg path for fluent-ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

// Start the conversion process
ffmpeg(inputFilePath)
  .outputOptions(["-c:v libx264", "-b:v 800k", "-s 640x360"])
  .output(outputFilePath)
  .on("end", () => {
    console.log("360p version generated successfully.");
  })
  .on("error", (err) => {
    console.error("Error generating 360p version:", err.message);
  })
  .run();
