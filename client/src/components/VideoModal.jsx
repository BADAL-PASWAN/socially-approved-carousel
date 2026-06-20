import React from "react";
import { X } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

export default function VideoModal({ videos, startIndex, onClose, onLiked }) {
  const maxActiveDistance = 5;

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <button className="close" onClick={onClose}><X /></button>
      <div className="modal-head">
        <h2>Socially Approved</h2>
        <p>Swipe horizontally. Only nearby videos are mounted to keep performance smooth.</p>
      </div>
      <div className="inner-carousel" style={{ scrollSnapType: 'x mandatory' }}>
        {videos.map((video, index) => {
          const shouldMount = Math.abs(index - startIndex) <= maxActiveDistance || index < 10;
          return (
            <div className="slide" key={video._id}>
              {shouldMount ? <VideoPlayer video={video} active={true} onLiked={onLiked} /> : <div className="player-card placeholder" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
