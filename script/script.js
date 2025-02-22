document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const audioSource = document.getElementById('audioSource');
    const playPauseBtn = document.getElementById('playPause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progressBar = document.getElementById('progressBar');
    const playPauseIcon = playPauseBtn.querySelector('img');
    const songTitle = document.getElementById('songTitle');
    const songArtwork = document.getElementById('songArtwork');

    let isPlaying = false;

    // Список треков
    const playlist = [
        {
            title: "New Jeans",
            src: "src/audio/NewJeans - New Jeans.mp3",
            artwork: "src/img/newjeans.jpg"
        },
        {
            title: "Super Shy",
            src: "src/audio/NewJeans - Super Shy.mp3",
            artwork: "src/img/newjeans.jpg"
        },
        {
            title: "Fellas in Paris",
            src: "src/audio/Niggas in Paris .mp3",
            artwork: "src/img/toothless.gif"
        },
        {
            title: "Gold Digger",
            src: "src/audio/Gold Digger.mp3",
            artwork: "src/img/ans.jpg"
        },
        {
            title: "Issues",
            src: "src/audio/issues.mp3",
            artwork: "src/img/baha.jpg"
        },
        {
            title: "How Deep Is Your Love",
            src: "src/audio/How Deep Is Your Love.mp3",
            artwork: "src/img/san.gif"
        }
    ];
    let currentTrackIndex = 0;

    // Функция для загрузки трека
    function loadTrack(index) {
        audioSource.src = playlist[index].src;
        songTitle.textContent = playlist[index].title;
        songArtwork.src = playlist[index].artwork;
        audio.load(); // Перезагружаем аудио
        progressBar.value = 0; // Сбрасываем прогресс
        if (isPlaying) {
            audio.play();
        }
    }

    // Воспроизведение/Пауза
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseIcon.src = 'src/img/play-icon.png';
        } else {
            audio.play();
            playPauseIcon.src = 'src/img/pause-icon.png';
        }
        isPlaying = !isPlaying;
    });

    // Предыдущий трек
    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length; // Циклический переход
        loadTrack(currentTrackIndex);
    });

    // Следующий трек
    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length; // Циклический переход
        loadTrack(currentTrackIndex);
    });

    // Обновление прогресс-бара
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    });

    // Интерактивный ползунок
    progressBar.addEventListener('click', (e) => {
        const progressWidth = progressBar.offsetWidth;
        const clickPosition = e.offsetX;
        const newProgress = (clickPosition / progressWidth) * 100;
        const newTime = (newProgress / 100) * audio.duration;
        audio.currentTime = newTime;
        progressBar.value = newProgress;
    });

    // Автоматическое переключение на следующий трек по окончании
    audio.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
    });
});