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

// ********************* FINAL VERSION OF BUTE RANGE REQUEST **************************** //
// const ffmpeg = require("fluent-ffmpeg");
// const ffmpegPath = require("ffmpeg-static");
// const path = require("path");
// const { existsSync } = require("fs");

// ffmpeg.setFfmpegPath(ffmpegPath);

// exports.createVideoQualities = async (
//   videoFolder,
//   videoFile,
//   videoBasePath
// ) => {
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
// };
