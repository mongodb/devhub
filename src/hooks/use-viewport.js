import { useEffect } from 'react';

const useViewport = () => {
    useEffect(() => {
        const viewport = document.querySelector('meta[name=viewport]');
        viewport.setAttribute(
            'content',
            viewport.content + ', height=' + window.innerHeight
        );
    }, []);
};

export default useViewport;
