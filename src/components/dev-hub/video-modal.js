import React from 'react';
import { Modal } from './modal';
import VideoEmbed from './video-embed';
import { size } from './theme';

const VideoModal = ({ id, name, trigger, thumbnail }) => (
    <Modal
        dialogContainerStyle={{
            height: '90%',
            padding: `0 ${size.large}`,
            width: '90%',
        }}
        dialogMobileContainerStyle={{
            width: '100%',
        }}
        transparent
        triggerComponent={trigger}
    >
        <VideoEmbed
            nodeData={{
                argument: [{ value: id }],
                name: name,
            }}
            autoplay={true}
            thumbnail={thumbnail}
        />
    </Modal>
);

export default VideoModal;
