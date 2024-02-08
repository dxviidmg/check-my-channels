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

      // Añadir la clase para centrar el botón de reproducción
      videoElement.classList.add('vjs-big-play-centered');

      // Establecer el 100% de ancho
      videoElement.style.width = '100%';
      videoElement.style.minHeight = '300px';
      videoElement.style.height = '100%';

      // Agregar el elemento al DOM
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
  }, [videoRef, props.onReady]);

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
