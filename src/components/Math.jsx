import { useRef, useEffect } from 'react'

import 'katex/dist/katex.min.css';
import katex from 'katex';

export function Math({ type = 'inline', children }) {

    const containerRef = useRef();

    useEffect(() => {
        katex.render(children, containerRef.current);
    }, [children]);

    return <span ref={containerRef} />
}