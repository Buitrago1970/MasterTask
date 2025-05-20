import { useEffect, useState } from 'react';

const QUERY = '(min-width: 840px)';

export default function useIsDesktop840() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const listener = () => setIsDesktop(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return isDesktop;
} 