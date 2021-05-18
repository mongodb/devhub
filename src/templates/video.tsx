import React from 'react';
import { Video as IVideo } from '~src/interfaces/video';

type VideoProps = {
    pageContext: {
        data: IVideo;
    };
};

const Video = ({ pageContext: { data: video } }: VideoProps) => {
    console.log(video);

    return <>666 TEST</>;
};
export default Video;
