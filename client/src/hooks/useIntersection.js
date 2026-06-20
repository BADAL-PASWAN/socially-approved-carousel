import { useEffect, useRef, useState } from 'react';

export default function useIntersection(options = { threshold: 0.45, rootMargin: '250px' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}
