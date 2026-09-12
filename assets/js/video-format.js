(function () {
  document.querySelectorAll('#case-grid video').forEach((video, index) => {
    video.src = `assets/video/${index + 1}-web.mp4`;
    video.preload = 'none';
    video.setAttribute('controlsList', 'nodownload noplaybackrate');
    video.disablePictureInPicture = true;
    video.addEventListener('contextmenu', event => event.preventDefault());
  });
})();
