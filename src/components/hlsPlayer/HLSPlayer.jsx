import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const HLSPlayer = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  React.useEffect(() => {
    const options = {
      autoplay: true,
      controls: true,
      sources: [
        {
          src: props.link,
          type: "application/x-mpegURL",
        },
      ],
    };

    const onReadyHandler = typeof props.onReady === 'function' ? props.onReady : undefined;

    console.log('onReadyHandler', onReadyHandler)
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      // Add class to center the play button
      videoElement.classList.add('vjs-big-play-centered');

      // Set width to 100%
      videoElement.style.width = '100%';
      videoElement.style.minHeight = '300px';
      videoElement.style.height = '100%';

      // Append the element to the DOM
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReadyHandler && onReadyHandler(player);
      });

    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [props.link, props.onReady]); // <-- Add props.link and props.onReady to the dependency array

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default HLSPlayer;
