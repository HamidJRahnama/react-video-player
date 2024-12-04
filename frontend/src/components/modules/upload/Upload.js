// import React, { useState } from "react";

// const Upload = () => {
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [uploadStatus, setUploadStatus] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file || !title || !description) {
//       setUploadStatus("Please complete all fields.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("video", file);
//     formData.append("title", title);
//     formData.append("description", description);

//     try {
//       const response = await fetch("http://localhost:8000/video/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const message = await response.text();
//         setUploadStatus(`Upload successful! ${message}`);
//       } else {
//         setUploadStatus("Upload failed.");
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setUploadStatus("Error uploading file.");
//     }
//   };

//   return (
//     <div>
//       <h1>Upload a Video</h1>
//       <input type="file" accept="video/mp4" onChange={handleFileChange} />
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button onClick={handleUpload}>Upload</button>
//       {uploadStatus && <p>{uploadStatus}</p>}
//     </div>
//   );
// };

// export default Upload;

import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch("http://localhost:8000/video/upload", {
        method: "POST",
        body: formData, // No custom Content-Type header
      });

      if (response.ok) {
        const message = await response.text();
        setUploadStatus(`Upload successful! ${message}`);
      } else {
        setUploadStatus("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file.");
    }
  };

  return (
    <div>
      <h1>Upload a Video</h1>
      <input type="file" accept="video/mp4" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default Upload;
