import Video from '../models/Video.js';

export const getVideos = async (_req, res) => {
  const videos = await Video.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, count: videos.length, videos });
};

export const likeVideo = async (req, res) => {
  const { videoId, userId } = req.body;
  const userKey = userId || req.ip;

  if (!videoId) return res.status(400).json({ success: false, message: 'videoId is required' });

  const video = await Video.findById(videoId);
  if (!video) return res.status(404).json({ success: false, message: 'Video not found' });

  const alreadyLiked = video.likedBy.includes(userKey);
  if (alreadyLiked) {
    video.likedBy = video.likedBy.filter((id) => id !== userKey);
    video.likes = Math.max(0, video.likes - 1);
  } else {
    video.likedBy.push(userKey);
    video.likes += 1;
  }

  await video.save();
  res.json({ success: true, liked: !alreadyLiked, likes: video.likes, videoId });
};

export const shareVideo = async (req, res) => {
  const { videoId, platform = 'copy-link' } = req.body;
  if (!videoId) return res.status(400).json({ success: false, message: 'videoId is required' });

  const video = await Video.findById(videoId);
  if (!video) return res.status(404).json({ success: false, message: 'Video not found' });

  video.shares.push({ platform, ip: req.ip });
  await video.save();

  res.json({ success: true, videoId, shares: video.shares.length });
};
