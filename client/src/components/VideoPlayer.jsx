import React, { useEffect, useRef, useState } from "react";
import { Heart, Pause, Play, Share2, Volume2, VolumeX } from "lucide-react";
import useIntersection from "../hooks/useIntersection";
import { likeVideo, shareVideo } from "../services/api";

export default function VideoPlayer({ video, active, isActive, onLiked }) {
  const videoRef = useRef(null);
  const [wrapRef, isVisible] = useIntersection({
    threshold: 0.35,
    rootMargin: "300px"
  });

  const shouldPlay = active ?? isActive ?? true;
  const src = video.videoUrl || video.url;

  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!shouldPlay || !isVisible) {
      el.pause();
      setPlaying(false);
    }
  }, [shouldPlay, isVisible]);

  useEffect(() => {
    setLoading(true);
    setProgress(0);
    setPlaying(false);
  }, [src]);

  const togglePlay = async () => {
    const el = videoRef.current;
    if (!el || !src) return;

    try {
      if (el.paused) {
        el.muted = muted;
        await el.play();
        setPlaying(true);
        setLoading(false);
      } else {
        el.pause();
        setPlaying(false);
      }
    } catch (error) {
      console.error("Video play failed:", error);
      console.log("Video URL:", src);
      alert(`Video play failed. URL: ${src}`);
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    const nextMuted = !muted;

    setMuted(nextMuted);

    if (el) {
      el.muted = nextMuted;
    }
  };

  const handleProgress = () => {
    const el = videoRef.current;
    if (el?.duration) {
      setProgress((el.currentTime / el.duration) * 100);
    }
  };

  const handleLike = async () => {
    const result = await likeVideo(video._id);
    onLiked(video._id, result.likes);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}?video=${video._id}`;
    await navigator.clipboard?.writeText(url);
    await shareVideo(video._id, "copy-link");
    alert("Video link copied!");
  };

  return (
    <article ref={wrapRef} className="player-card">
      {loading && <div className="spinner" />}

      {isVisible && src && (
        <video
          ref={videoRef}
          src={src}
          poster={video.thumbnailUrl}
          muted={muted}
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setLoading(false)}
          onCanPlay={() => setLoading(false)}
          onPlaying={() => {
            setLoading(false);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onWaiting={() => setLoading(true)}
          onError={(e) => {
            console.error("Video load error:", src, e);
            setLoading(false);
          }}
          onTimeUpdate={handleProgress}
        />
      )}

      <div className="progress">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="player-overlay">
        <h3>{video.title}</h3>
        <p>{video.description}</p>

        <div className="controls">
          <button onClick={togglePlay}>{playing ? <Pause /> : <Play />}</button>
          <button onClick={toggleMute}>{muted ? <VolumeX /> : <Volume2 />}</button>
          <button onClick={handleLike}>
            <Heart /> {video.likes}
          </button>
          <button onClick={handleShare}>
            <Share2 />
          </button>
        </div>
      </div>
    </article>
  );
}