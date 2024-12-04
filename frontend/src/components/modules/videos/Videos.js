// THIS VERTION IS WORKING OK WITH NODE FORTH VERTION

import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";  // Import axios

const Videos = () => {
  const [videoFolders, setVideoFolders] = useState([]);  // State to store video folders

  useEffect(() => {
    // Fetch the video list from the API when the component mounts
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/videos");
        setVideoFolders(response.data);  // Update state with the fetched video folders
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // Function to handle video playback
  const handlePlayVideo = (videoId, quality) => {
    const videoUrl = `http://localhost:8000/videos/${videoId}/${quality}`;
    const videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.src = videoUrl;
    videoPlayer.play();  // Start playing the video
  };

  return (
    <Container>
      <Row className="bg-white rounded my-3">
        <div>
          <ButtonGroup>
            {/* Map through the videoFolders state to create dynamic links */}
            {videoFolders.length > 0 ? (
              videoFolders.map((videoId) => (
                <div key={videoId}>
                  <h5>{videoId}</h5>
                  <Button onClick={() => handlePlayVideo(videoId, "360")}>Play 360p</Button>
                  <Button onClick={() => handlePlayVideo(videoId, "480")}>Play 480p</Button>
                  <Button onClick={() => handlePlayVideo(videoId, "720")}>Play 720p</Button>
                </div>
              ))
            ) : (
              <p>Loading videos...</p>
            )}
          </ButtonGroup>
          <h3>Videos</h3>
        </div>

        {/* Video Player */}
        <video id="videoPlayer" controls width="100%" style={{ marginTop: "20px" }}>
          <source src="" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Row>
    </Container>
  );
};

export default Videos;
