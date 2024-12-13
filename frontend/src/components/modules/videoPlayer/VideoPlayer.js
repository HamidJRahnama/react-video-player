import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js"; // Ensure HLS.js is imported

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

// ********************* FINAL VERSION OF BUTE RANGE REQUEST **************************** //

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const VideoPlayer = () => {
//   const { videoId } = useParams(); // Get videoId from URL params
//   const [quality, setQuality] = useState("720"); // Default quality

//   const videoSrc = `http://localhost:8000/videos/${videoId}/${quality}`; // Dynamic URL based on quality

//   return (
//     <div>
//       <h1>Video Player</h1>
//       <div>
//         <button onClick={() => setQuality("360")}>360p</button>
//         <button onClick={() => setQuality("480")}>480p</button>
//         <button onClick={() => setQuality("720")}>720p</button>
//       </div>
//       <video
//         controls
//         width="800"
//         src={videoSrc}
//         type="video/mp4"
//         onError={(e) => console.error("Error loading video:", e)}
//       >
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// };

// export default VideoPlayer;
