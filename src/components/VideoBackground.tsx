import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const VideoBackground = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  console.log("client:", isClient);
  return (
    <div className="relative">
      {isClient && (
        <div className="absolute inset-0 z-0">
          <ReactPlayer
            url="/videos/demo.mp4"
            playing={true}
            loop={true}
            muted={true}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
            controls={true}
          />
        </div>
      )}
      <div className="relative z-10">testing</div>
    </div>
  );
};

export default VideoBackground;
