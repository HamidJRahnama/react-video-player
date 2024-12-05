import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Videos = () => {
  const [videoFolders, setVideoFolders] = useState([]); // State to store video folders

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/videos");
        setVideoFolders(response.data.results); // Update state with the fetched video folders
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <Container>
      <Row className="bg-white rounded my-3">
        {videoFolders.length > 0 ? (
          videoFolders.map((video) => (
            <Col lg={4} className="mb-3" key={video.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{video.title}</Card.Title>
                  <Card.Text>{video.description}</Card.Text>
                  <Link to={`/video/${video.id}`}>
                    <Button>Watch Video</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Loading videos...</p>
        )}
      </Row>
    </Container>
  );
};

export default Videos;
