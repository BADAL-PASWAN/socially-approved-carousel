import React from "react";
import useIntersection from '../hooks/useIntersection';

export default function VideoCard({ video, onOpen }) {
  const [ref, isVisible] = useIntersection({ threshold: 0.15, rootMargin: '300px' });

  return (
    <button ref={ref} className="video-card" onClick={onOpen} aria-label={`Open ${video.title}`}>
      {isVisible ? <img src={video.thumbnailUrl} alt={video.title} loading="lazy" /> : <div className="skeleton" />}
      <div className="card-gradient" />
      <div className="card-info">
        <h3>{video.title}</h3>
        <p>{video.likes} likes</p>
      </div>
    </button>
  );
}
