import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import VideoJS from "./videoJS/VideoJS";

const TestA = () => {
  const playerRef = React.useRef(null);

  // Video.js player configuration
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", // Public HLS video source
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // Handle player events
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      <div>Video Player with Free API</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  );
};

export default TestA;
