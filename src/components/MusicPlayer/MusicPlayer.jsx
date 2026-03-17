import { useState, useRef, useEffect, useCallback } from 'react';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2, FiVolumeX, FiMusic, FiList } from 'react-icons/fi';
//songs
import song1 from '../../assets/Malare_Premam.mp3';
import song2 from '../../assets/Pularikalo_Charlie.mp3';
import song3 from '../../assets/Thanni Vachu Ponna Vacha.mp3';
import './MusicPlayer.css';

// ─── Playlist: add your tracks here ───
const tracks = [
    { title: 'Malare from Premam',       artist: '',  src: song1},
    { title: 'Pularikalo from Charlie',  artist: '',  src: song2},
    { title: 'Thanni Vachu Ponna Vacha from Jaihind',  artist: '',  src: song3},
    // { title: 'Song Title 4',  artist: '',  src: null /* replace with song4 */ },
    // { title: 'Song Title 5',  artist: '',  src: null /* replace with song5 */ },
];

const MusicPlayer = () => {
    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const [showList, setShowList] = useState(false);

    const currentTrack = tracks[trackIndex];

    // Waveform bars (random heights for visual effect)
    const bars = useRef(
        Array.from({ length: 28 }, () => 0.2 + Math.random() * 0.8)
    ).current;

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onLoaded = () => setDuration(audio.duration);
        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onEnded = () => playNext();

        audio.addEventListener('loadedmetadata', onLoaded);
        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('loadedmetadata', onLoaded);
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('ended', onEnded);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackIndex]);

    // When track changes, reset and auto-play if was playing
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentTrack.src) return;
        audio.load();
        setCurrentTime(0);
        setDuration(0);
        if (isPlaying) {
            audio.play().catch(() => {});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackIndex]);

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio || !currentTrack.src) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying, currentTrack.src]);

    const playNext = useCallback(() => {
        setTrackIndex((prev) => (prev + 1) % tracks.length);
    }, []);

    const playPrev = useCallback(() => {
        const audio = audioRef.current;
        // If more than 3s in, restart current track; otherwise go to previous
        if (audio && audio.currentTime > 3) {
            audio.currentTime = 0;
            setCurrentTime(0);
        } else {
            setTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
        }
    }, []);

    const selectTrack = useCallback((index) => {
        if (index === trackIndex) {
            togglePlay();
            return;
        }
        setTrackIndex(index);
        setIsPlaying(true);
    }, [trackIndex, togglePlay]);

    const toggleMute = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.muted = !isMuted;
        setIsMuted(!isMuted);
    }, [isMuted]);

    const handleVolumeChange = useCallback((e) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (audioRef.current) {
            audioRef.current.volume = val;
        }
        if (val === 0) setIsMuted(true);
        else setIsMuted(false);
    }, []);

    const handleProgressClick = useCallback((e) => {
        const rect = progressRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pct = x / rect.width;
        const newTime = pct * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    }, [duration]);

    const formatTime = (t) => {
        if (!t || isNaN(t)) return '0:00';
        const mins = Math.floor(t / 60);
        const secs = Math.floor(t % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className={`music-player ${isPlaying ? 'music-player--playing' : ''}`}>
            <audio ref={audioRef} src={currentTrack.src} preload="metadata" />

            {/* Vinyl disc */}
            <div className="music-player__disc">
                <div className={`music-player__vinyl ${isPlaying ? 'spinning' : ''}`}>
                    <div className="music-player__vinyl-inner">
                        <FiMusic />
                    </div>
                </div>
            </div>

            {/* Info & Controls */}
            <div className="music-player__body">
                <div className="music-player__info">
                    <span className="music-player__title">{currentTrack.title}</span>
                    <span className="music-player__artist">{currentTrack.artist}</span>
                    <span className="music-player__track-count">
                        {trackIndex + 1} / {tracks.length}
                    </span>
                </div>

                {/* Waveform visualizer */}
                <div className="music-player__waveform">
                    {bars.map((h, i) => {
                        const barProgress = (i / bars.length) * 100;
                        const isActive = barProgress < progress;
                        return (
                            <div
                                key={i}
                                className={`music-player__bar ${isActive ? 'active' : ''} ${isPlaying && isActive ? 'animating' : ''}`}
                                style={{
                                    '--bar-h': `${h * 100}%`,
                                    '--bar-delay': `${i * 0.04}s`,
                                }}
                            />
                        );
                    })}
                </div>

                {/* Progress bar */}
                <div
                    className="music-player__progress"
                    ref={progressRef}
                    onClick={handleProgressClick}
                >
                    <div
                        className="music-player__progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                    <div
                        className="music-player__progress-thumb"
                        style={{ left: `${progress}%` }}
                    />
                </div>

                <div className="music-player__time">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>

                {/* Bottom controls */}
                <div className="music-player__controls">
                    <div
                        className="music-player__volume-wrapper"
                        onMouseEnter={() => setShowVolume(true)}
                        onMouseLeave={() => setShowVolume(false)}
                    >
                        <button
                            className="music-player__btn music-player__btn--sm"
                            onClick={toggleMute}
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                            {isMuted || volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
                        </button>
                        <div className={`music-player__volume-slider ${showVolume ? 'visible' : ''}`}>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="music-player__volume-input"
                            />
                        </div>
                    </div>

                    <button
                        className="music-player__btn music-player__btn--sm"
                        onClick={playPrev}
                        aria-label="Previous track"
                    >
                        <FiSkipBack />
                    </button>

                    <button
                        className="music-player__btn music-player__btn--play"
                        onClick={togglePlay}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? <FiPause /> : <FiPlay />}
                    </button>

                    <button
                        className="music-player__btn music-player__btn--sm"
                        onClick={playNext}
                        aria-label="Next track"
                    >
                        <FiSkipForward />
                    </button>

                    <button
                        className={`music-player__btn music-player__btn--sm ${showList ? 'active' : ''}`}
                        onClick={() => setShowList(!showList)}
                        aria-label="Toggle track list"
                    >
                        <FiList />
                    </button>
                </div>

                {/* Track list */}
                <div className={`music-player__tracklist ${showList ? 'visible' : ''}`}>
                    {tracks.map((track, i) => (
                        <button
                            key={i}
                            className={`music-player__tracklist-item ${i === trackIndex ? 'active' : ''}`}
                            onClick={() => selectTrack(i)}
                        >
                            <span className="music-player__tracklist-num">{i + 1}</span>
                            <span className="music-player__tracklist-title">{track.title}</span>
                            {i === trackIndex && isPlaying && (
                                <span className="music-player__tracklist-playing">
                                    <span /><span /><span />
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
