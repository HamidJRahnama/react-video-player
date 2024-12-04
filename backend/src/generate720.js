const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");

const inputFilePath = path.resolve(
  __dirname,
  "../public/videos/video1/video1.mp4"
);
const outputFilePath = path.resolve(
  __dirname,
  "../public/videos/video1/video1-720.mp4"
);

// Set the ffmpeg path for fluent-ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

// Start the conversion process
ffmpeg(inputFilePath)
  .outputOptions(["-c:v libx264", "-b:v 1500k", "-s 1280x720"])
  .output(outputFilePath)
  .on("end", () => {
    console.log("720p version generated successfully.");
  })
  .on("error", (err) => {
    console.error("Error generating 720p version:", err.message);
  })
  .run();
