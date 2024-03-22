import React from 'react'

const useListenForOutsideClicks = (onOutsideClick: () => void) => {
  const elementRef = React.useRef<any>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        onOutsideClick?.();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }
  }, [onOutsideClick]);

  return { elementRef };
}

export default useListenForOutsideClicks;