the file and folder structure in backend
/backend
├── node_modules/ # Node.js modules (auto-generated)
├── public/
│ └── videos/ # Folder containing all video files
│ ├── video1/ # Folder for video1 files
│ │ ├── video1.mp4 # Original video
│ │ ├── video1-360.mp4 # 360p quality video
│ │ ├── video1-480.mp4 # 480p quality video
│ │ └── video1-720.mp4 # 720p quality video
│ ├── video2/ # Folder for video2 files (future use)
│ │ ├── video2.mp4 # Original video
│ │ ├── video2-360.mp4 # 360p quality video
│ │ ├── video2-480.mp4 # 480p quality video
│ │ └── video2-720.mp4 # 720p quality video
├── src/
│ ├── http.js # API server logic for handling video streaming and routes
│ └── index.js # Server initialization (could be empty or just require http.js)
├── package.json # Node.js project configuration
├── package-lock.json # Auto-generated lock file for npm dependencies
└── README.md # Project description or documentation

1: fluent-ffmpeg
u need to generate each videos quality for quality options

    npm install fluent-ffmpeg

    the command for generate quality :
        360 => ffmpeg -i ../public/videos/video1/video1.mp4 -c:v libx264 -b:v 800k -s 640x360 ../public/videos/video1/video1-360.mp4

        480 => ffmpeg -i ../public/videos/video1/video1.mp4 -c:v libx264 -b:v 1000k -s 854x480 ../public/videos/video1/video1-480.mp4

        720 => ffmpeg -i ../public/videos/video1/video1.mp4 -c:v libx264 -b:v 1500k -s 1280x720 ../public/videos/video1/video1-720.mp4

        just this for now
