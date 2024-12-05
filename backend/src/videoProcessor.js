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

  const qualities = [
    { quality: "360", size: "640x360", bitrate: "800k" },
    { quality: "480", size: "854x480", bitrate: "1000k" },
    { quality: "720", size: "1280x720", bitrate: "1500k" },
  ];

  qualities.forEach(({ quality, size, bitrate }) => {
    const outputFile = `${videoFolder}-${quality}.mp4`;
    const outputPath = path.join(qualityFolderPath, outputFile);

    if (!existsSync(outputPath)) {
      ffmpeg(originalVideoPath)
        .size(size)
        .videoCodec("libx264")
        .output(outputPath)
        .outputOptions(`-b:v ${bitrate}`)
        .on("end", () => console.log(`Generated ${outputFile}`))
        .on("error", (err) =>
          console.error(`Error generating ${outputFile}: ${err.message}`)
        )
        .run();
    }
  });
};
