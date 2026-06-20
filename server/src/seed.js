import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "./models/Video.js";
import sampleVideos from "../data/videos.js";

dotenv.config();

const videoUrls = [
  "http://localhost:5173/videos/video1.mp4",
  "http://localhost:5173/videos/video2.mp4",
  "http://localhost:5173/videos/video3.mp4",
  "http://localhost:5173/videos/video4.mp4",
  "http://localhost:5173/videos/video5.mp4"
];

const updatedVideos = sampleVideos.map((video, index) => ({
  ...video,
  videoUrl: videoUrls[index % videoUrls.length]
}));

try {
  await mongoose.connect(process.env.MONGO_URI);

  await Video.deleteMany({});
  await Video.insertMany(updatedVideos);

  console.log(`Seeded ${updatedVideos.length} playable videos`);

  await mongoose.disconnect();
} catch (error) {
  console.error(error);
  process.exit(1);
}