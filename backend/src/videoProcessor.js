const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const { existsSync } = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);

exports.createVideoQualities = async (
  videoFolder,
  videoFile,
  videoBasePath
) => {
  const originalVideoPath = path.join(videoBasePath, videoFolder, videoFile);
  const qualityFolderPath = path.join(videoBasePath, videoFolder);

  const hlsOutputPath = path.join(qualityFolderPath, "index.m3u8");
  if (!existsSync(hlsOutputPath)) {
    ffmpeg(originalVideoPath)
      .outputOptions([
        "-codec: copy",
        "-start_number 0",
        "-hls_time 10",
        "-hls_list_size 0",
        "-f hls",
      ])
      .output(hlsOutputPath)
      .on("end", () => console.log("HLS segments created"))
      .on("error", (err) =>
        console.error("Error creating HLS segments:", err.message)
      )
      .run();
  }
};
