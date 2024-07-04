const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const titleElement = document.getElementById('title');
const artistElement = document.getElementById('artist');
const progressBar = document.querySelector('.progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');

const playlist = [
    { title: 'Like I Do', artist: 'J.Tajor', src: 'Audio/myrecording.mp3' },
    { title: 'Attention', artist: 'Charlie Puth', src: 'Audio/myrecording2.mp3' },
    { title: 'Savage Love', artist: 'Jawash 685', src: 'Audio/myrecording3.mp3' },
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
    const song = playlist[index];
    audio.src = song.src;
    titleElement.textContent = song.title;
    artistElement.textContent = song.artist;
    updatePlayButton();
}

function playSong() {
    audio.play();
    isPlaying = true;
    updatePlayButton();
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    updatePlayButton();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
}

function updatePlayButton() {
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationElement.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeElement.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', updateProgress);

// Load the first song
loadSong(currentSongIndex);
