import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const getVideos = async () => (await api.get('/videos')).data.videos;
export const likeVideo = async (videoId) => (await api.post('/like', { videoId })).data;
export const shareVideo = async (videoId, platform) => (await api.post('/share', { videoId, platform })).data;
