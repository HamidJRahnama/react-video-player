const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");

const inputFilePath = path.resolve(
  __dirname,
  "../public/videos/video1/video1.mp4"
);
const outputFilePath = path.resolve(
  __dirname,
  "../public/videos/video1/video1-480.mp4"
);

// Set the ffmpeg path for fluent-ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

// Start the conversion process
ffmpeg(inputFilePath)
  .outputOptions(["-c:v libx264", "-b:v 1000k", "-s 854x480"])
  .output(outputFilePath)
  .on("end", () => {
    console.log("480p version generated successfully.");
  })
  .on("error", (err) => {
    console.error("Error generating 480p version:", err.message);
  })
  .run();
