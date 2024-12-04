import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook

const VideoPlayer = () => {
  const { videoId } = useParams();  // Get videoId from URL params
  console.log("videoId in VideoPlayer:", videoId); // Debugging line

  const [quality, setQuality] = useState("720p"); // Default quality

  const videoSrc = `http://localhost:8000/videos/${videoId}`; // Dynamic URL based on quality

  console.log("VIDEOSRC ==> ", videoSrc)
  console.log("VIDEO ID ==> ", videoId)
  return (
    <div>
      <h1>Video Player</h1>
      <div>
        <button onClick={() => setQuality("360p")}>360p</button>
        <button onClick={() => setQuality("480p")}>480p</button>
        <button onClick={() => setQuality("720p")}>720p</button>
      </div>
      <video
        controls
        width="800"
        src={videoSrc}
        typeof="video/mp4"
        onError={(e) => console.error("Error loading video:", e)}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;


// import React, { useState } from "react";

// const VideoPlayer = ({ videoId }) => {
//   const [quality, setQuality] = useState("720p"); // Default quality

//   const videoSrc = `http://localhost:8000/videos/?videoId=${videoId}&quality=${quality}`; // Dynamic URL based on quality

//   return (
//     <div>
//       <h1>Video Player</h1>
//       <div>
//         <button onClick={() => setQuality("360p")}>360p</button>
//         <button onClick={() => setQuality("480p")}>480p</button>
//         <button onClick={() => setQuality("720p")}>720p</button>
//       </div>
//       <video
//         controls
//         width="800"
//         src={videoSrc}
//         onError={(e) => console.error("Error loading video:", e)}
//       >
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// };

// export default VideoPlayer;
