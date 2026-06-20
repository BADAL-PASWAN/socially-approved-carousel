import express from 'express';
import { getVideos, likeVideo, shareVideo } from '../controllers/videoController.js';

const router = express.Router();

router.get('/videos', getVideos);
router.post('/like', likeVideo);
router.post('/share', shareVideo);

export default router;
