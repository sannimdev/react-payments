import { useEffect, useRef } from 'react';

type THookForwardedRef = {
  forwardedRef: React.ForwardedRef<HTMLInputElement | HTMLButtonElement>;
};

export default ({ forwardedRef }: THookForwardedRef) => {
  const ref = useRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>;

  useEffect(() => {
    if (!forwardedRef) return;
    if (typeof forwardedRef === 'function') {
      forwardedRef(ref.current);
    } else {
      forwardedRef.current = ref.current;
    }
  }, []);

  return { ref };
};
