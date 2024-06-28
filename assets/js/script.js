
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, options);
});

const videoSection = document.querySelector('.exercise-videos');

fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUHcFIpm8rD9IrlDrw4Ted-Q&key=AIzaSyCyp3Ow3XgHeRTDbfPUreXa7I5lQ1Tv6fY')
  .then(res => res.json())
  .then(data => {
    if (data.items.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.items.length);
      const randomVideo = data.items[randomIndex];
      const videoId = randomVideo.snippet.resourceId.videoId;

      function onYouTubeIframeAPIReady() {
        new YT.Player('player', {
          videoId: videoId,
          events: {
            'onReady': onPlayerReady,
          }
        });
      }
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        onYouTubeIframeAPIReady();
      }

    } else {

      console.log('No videos found in the playlist.');
    }
  })
  .catch(err => {
    console.error('Error fetching YouTube playlist:', err);
  });

