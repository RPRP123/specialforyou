const wrapper = document.querySelector('.wrapper');
const question = document.querySelector('.question');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');
const wrapperRect = wrapper.getBoundingClientRect();
const noBtnRect = noBtn.getBoundingClientRect();

const videoContainer = document.getElementById('videoContainer');
const video = document.getElementById('jumpscareVideo');
const exitBtn = document.getElementById('exitBtn');

yesBtn.addEventListener('click', () => {
    question.innerHTML = 'I have something in mind that might just be your favorite. Would you like a surprise?';
    videoContainer.style.display = 'flex';
    video.removeAttribute('controls');
    video.muted = false; // Unmute video
    video.volume = 1.0; // Set volume to maximum
    video.play();

    // Request full screen
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) { // Firefox
        videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
        videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) { // IE/Edge
        videoContainer.msRequestFullscreen();
    }

    // Show the exit button after 8 seconds
    setTimeout(() => {
        document.getElementById('exitFullscreen').style.display = 'block';
    }, 8000);

    // Event listener to replay the video once it ends
    video.addEventListener('ended', () => {
        video.play();
    });
});

// Exit full screen and hide the video container when exit button is clicked
exitBtn.addEventListener('click', () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
    videoContainer.style.display = 'none';
    video.pause();
    video.currentTime = 0;
});

// Hide video and show the wrapper again when exiting full screen
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        videoContainer.style.display = 'none';
        video.pause();
        video.currentTime = 0;
        document.getElementById('exitFullscreen').style.display = 'none';
    }
});

noBtn.addEventListener('mouseover', () => {
    const i = Math.floor(Math.random() * (wrapperRect.width - noBtnRect.width)) + 1;
    const j = Math.floor(Math.random() * (wrapperRect.height - noBtnRect.height)) + 1;
    noBtn.style.left = i + 'px';
    noBtn.style.top = j + 'px';
});
