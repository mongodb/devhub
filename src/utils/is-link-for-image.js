export const isLinkForImage = link =>
    !!link && /\.jpg$|\.png$|\.jpeg$|\.svg$/.test(link);
