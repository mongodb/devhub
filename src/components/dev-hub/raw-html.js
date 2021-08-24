import React, { useEffect, useMemo, useRef, useState } from 'react';
import sanitizeHtml from 'sanitize-html';

const isInlineElement = html => html === '<br />';

const RawHTML = ({ nodeData }) => {
    const [hasRenderedScript, setHasRenderedScript] = useState(false);
    const { value } = nodeData;
    const containsScript = value.match(/<script/);
    const contentRef = useRef();
    const sanitizedHTML = useMemo(
        () =>
            sanitizeHtml(value, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                    'img',
                    'script',
                ]),
                // Need to lock script srcs to include tiktok, spotify, twitter
                allowedAttributes: false,
                allowVulnerableTags: true,
            }),
        [value]
    );
    useEffect(() => {
        if (contentRef && contentRef.current && !hasRenderedScript) {
            const fragment = document
                .createRange()
                .createContextualFragment(sanitizedHTML);
            contentRef.current.appendChild(fragment);
            setHasRenderedScript(true);
            // Need to prevent double-addition of the script tags globally
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (containsScript) {
        return <div ref={contentRef} />;
    } else if (isInlineElement(sanitizedHTML)) {
        return <span dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
    }
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default RawHTML;
