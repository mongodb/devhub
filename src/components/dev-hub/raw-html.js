import React, { useEffect, useMemo, useRef, useState } from 'react';
import sanitizeHtml from 'sanitize-html';

// To allow additional embeds/iframes, update these arrays based on inclusion tag
// (iframe vs script)
const ALLOWED_IFRAME_HOSTNAMES = ['open.spotify.com'];
const ALLOWED_SCRIPT_SRCS = [
    'https://platform.twitter.com/widgets.js',
    'https://www.tiktok.com/embed.js',
];

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
                    'iframe',
                    'script',
                ]),
                // Need to lock script srcs to include tiktok, spotify, twitter
                allowedAttributes: false,
                allowedIframeHostnames: ALLOWED_IFRAME_HOSTNAMES,
                allowVulnerableTags: true,
                exclusiveFilter: frame => {
                    return (
                        frame.tag === 'script' &&
                        ALLOWED_SCRIPT_SRCS.includes(frame.src)
                    );
                },
            }),
        [value]
    );
    // We would like script tags to load in external JS in this case
    useEffect(() => {
        if (contentRef && contentRef.current && !hasRenderedScript) {
            const fragment = document
                .createRange()
                .createContextualFragment(sanitizedHTML);
            contentRef.current.appendChild(fragment);
            // This prevents double-addition of the script tags globally
            setHasRenderedScript(true);
        }
    }, [hasRenderedScript, sanitizedHTML]);
    if (containsScript) {
        return <div ref={contentRef} />;
    } else if (isInlineElement(sanitizedHTML)) {
        return <span dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
    }
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default RawHTML;
