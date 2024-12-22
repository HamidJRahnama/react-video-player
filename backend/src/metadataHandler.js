const { writeFile, readFile, readdir, existsSync } = require("fs");
const { promisify } = require("util");
const path = require("path");

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);
const readdirAsync = promisify(readdir);

const metadataPath = path.join(__dirname, "../public/metadata.json");

exports.updateMetadata = async (videoFolder, metadata) => {
  let data = { count: 0, next: null, prev: null, results: [] };

  if (existsSync(metadataPath)) {
    data = await readFileAsync(metadataPath, "utf8").then(JSON.parse);
  }

  const existingIndex = data.results.findIndex(
    (item) => item.id === videoFolder
  );
  if (existingIndex !== -1) {
    data.results[existingIndex] = { id: videoFolder, ...metadata };
  } else {
    data.count += 1;
    data.results.push({ id: videoFolder, ...metadata });
  }

  await writeFileAsync(metadataPath, JSON.stringify(data, null, 2));
};

exports.getVideoList = async (req, res, videoBasePath) => {
  try {
    let metadata = { count: 0, next: null, prev: null, results: [] };

    if (existsSync(metadataPath)) {
      metadata = await readFileAsync(metadataPath, "utf8").then(JSON.parse);
    }

    // Get list of existing video folders
    const folders = await readdirAsync(videoBasePath, { withFileTypes: true });
    const videoFolders = folders
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // Remove metadata entries for deleted video folders
    metadata.results = metadata.results.filter((item) =>
      videoFolders.includes(item.id)
    );
    metadata.count = metadata.results.length;

    // Add missing video folders to metadata with default values
    videoFolders.forEach((folder) => {
      if (!metadata.results.some((item) => item.id === folder)) {
        metadata.results.push({
          id: folder,
          title: "Unknown Title",
          description: "No Description",
          videoFile: "Unknown",
        });
      }
    });

    metadata.count = metadata.results.length;

    // Save the updated metadata
    await writeFileAsync(metadataPath, JSON.stringify(metadata, null, 2));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(metadata));
  } catch (error) {
    console.error("Error reading video folders:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error reading video folders");
  }
};
