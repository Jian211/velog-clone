import React, { useState, useEffect } from "react";



interface Args extends IntersectionObserverInit {
    freezeOnceVisible? : boolean
}

const useIntersectionObserver = (
    elementRef: React.RefObject<Element>, 
    {
        root = null,
        rootMargin= '0%',
        threshold = 0.5,
        freezeOnceVisible= false        
    }:Args
): IntersectionObserverEntry | undefined => {

    const [entry, setEntry] = useState<IntersectionObserverEntry>();
    const frozen = entry?.isIntersecting && freezeOnceVisible;

    const updateEntry = ([entry]: IntersectionObserverEntry[]) => setEntry(entry);
    

    useEffect(()=> {
        const node = elementRef?.current // DOM Ref
        const hasIOSupport = !!window.IntersectionObserver

        if(!hasIOSupport || frozen || !node) return

        const observerParams = { threshold, root, rootMargin }
        const observer = new IntersectionObserver(updateEntry, observerParams)

        observer.observe(node)  // 관찰 시작

        return () => observer.disconnect()
        
    },[elementRef?.current,JSON.stringify(threshold), root, rootMargin, frozen])

    return entry
}

export default useIntersectionObserver;