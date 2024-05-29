import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";

const VideoPlayer = ({ item, is_showing }) => {
  const opts = {
    height: "450",
    width: "100%",
  };

  const ref = useRef();

  useEffect(() => {
    ref?.current?.internalPlayer?.stopVideo();
  }, [is_showing]);

  return <YouTube videoId={item.video} opts={opts} ref={ref} />;
};

export default VideoPlayer;
