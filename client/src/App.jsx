import React from "react";
import { useEffect, useState } from 'react';
import { getVideos } from './services/api';
import VideoCard from './components/VideoCard';
import VideoModal from './components/VideoModal';
import './styles.css';

export default function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    getVideos().then(setVideos).finally(() => setLoading(false));
  }, []);

  const updateLike = (videoId, likes) => {
    setVideos((list) => list.map((v) => (v._id === videoId ? { ...v, likes } : v)));
  };

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Video commerce carousel</p>
        <h1>Socially Approved</h1>
        <p>Fast, lazy-loaded video carousel with like, share, progress tracking, and modal playback.</p>
      </section>

      {loading ? <p className="loading-text">Loading videos...</p> : (
        <section className="outer-carousel">
          {videos.map((video, index) => (
            <VideoCard key={video._id} video={video} onOpen={() => setSelectedIndex(index)} />
          ))}
        </section>
      )}

      {selectedIndex !== null && (
        <VideoModal
          videos={videos}
          startIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onLiked={updateLike}
        />
      )}
    </main>
  );
}
