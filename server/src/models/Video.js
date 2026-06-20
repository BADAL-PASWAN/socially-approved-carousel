import mongoose from 'mongoose';

const shareSchema = new mongoose.Schema(
  {
    platform: { type: String, default: 'copy-link' },
    ip: String,
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: String }],
    shares: [shareSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Video', videoSchema);
