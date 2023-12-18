import React, { useEffect, useRef, useState } from 'react';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createPortal } from 'react-dom';

const useConst = (init) => {
    // We cannot useMemo, because it is not guranteed to never rerun.
    // https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
    const ref = useRef(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref.current;
}

const MUINewWindow = ({ title, children, onClose, windowFeatures = "width=600,height=640,left=200,top=200" }) => {
    const titleEl = useConst(() => document.createElement("title"));
    const containerEl = useConst(() => document.createElement("div"));
    const cache = useConst(() =>
        createCache({ key: "external", container: containerEl })
    );
    const [isOpened, setOpened] = useState(false);

    useEffect(() => {
        const externalWindow = window.open(
            "",
            "",
            windowFeatures
        );

        // if window.open fails
        if (!externalWindow) {
            onClose();
            return;
        }

        externalWindow.addEventListener("beforeunload", onClose);

        externalWindow.document.head.appendChild(titleEl);
        externalWindow.document.body.appendChild(containerEl);

        setOpened(true);

        return () => {
            externalWindow.close();
        };
    }, []);

    useEffect(() => {
        titleEl.innerText = title;
    }, [title, titleEl]);

    return isOpened
        ? createPortal(
            <CacheProvider value={cache}>
                {children}
            </CacheProvider>,
            containerEl
        )
        : null;
};

export default MUINewWindow;