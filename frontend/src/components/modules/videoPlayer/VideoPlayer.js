import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { videoId } = useParams(); // Get videoId from URL params
  const [quality, setQuality] = useState("720"); // Default quality

  const videoSrc = `http://localhost:8000/videos/${videoId}/${quality}`; // Dynamic URL based on quality

  return (
    <div>
      <h1>Video Player</h1>
      <div>
        <button onClick={() => setQuality("360")}>360p</button>
        <button onClick={() => setQuality("480")}>480p</button>
        <button onClick={() => setQuality("720")}>720p</button>
      </div>
      <video
        controls
        width="800"
        src={videoSrc}
        type="video/mp4"
        onError={(e) => console.error("Error loading video:", e)}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
