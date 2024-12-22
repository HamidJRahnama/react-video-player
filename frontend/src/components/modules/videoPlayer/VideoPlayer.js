import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js";

const VideoPlayer = () => {
  const { videoId } = useParams(); // Get videoId from URL params
  const [quality, setQuality] = useState("index"); // Default quality

  useEffect(() => {
    const video = document.getElementById("video"); // Reference video element
    video.muted = true; // Set the muted attribute to true

    if (Hls.isSupported()) {
      const hls = new Hls();
      // Load HLS manifest file based on selected quality
      hls.loadSource(`http://localhost:8000/videos/${videoId}/${quality}.m3u8`);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // For Safari where HLS is natively supported
      video.src = `http://localhost:8000/videos/${videoId}/${quality}.m3u8`;
      video.addEventListener("canplay", () => {
        video.play();
      });
    }
  }, [videoId, quality]); // Re-run effect when videoId or quality changes

  return (
    <div>
      <h1>Video Player</h1>
      <div>
        <button onClick={() => setQuality("360")}>360p</button>
        <button onClick={() => setQuality("480")}>480p</button>
        <button onClick={() => setQuality("720")}>720p</button>
      </div>
      <video id="video" controls width="800">
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
