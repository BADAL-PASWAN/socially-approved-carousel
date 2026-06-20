const sampleVideos = Array.from({ length: 36 }, (_, index) => {
  const id = index + 1;
  const videoPool = [
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  ];

  return {
    title: `Socially Approved #${id}`,
    description: `Short user generated travel/fashion style video number ${id}.`,
    videoUrl: videoPool[index % videoPool.length],
    thumbnailUrl: `https://picsum.photos/seed/social-${id}/480/720`,
    likes: Math.floor(Math.random() * 500)
  };
});

export default sampleVideos;
