// DEVHUB-175
export const updateLinksForAttribution = () => {
    const links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        const t = links.item(i);
        if (t.href.includes('https://www.mongodb.com/cloud/atlas/signup')) {
            t.setAttribute(
                'href',
                t.href.replace(
                    'https://www.mongodb.com/cloud/atlas/signup?',
                    'https://www.mongodb.com/cloud/atlas/signup?tck=nraboy&'
                )
            );
        }
    }
};
