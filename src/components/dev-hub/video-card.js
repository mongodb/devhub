import React from 'react';
import styled from '@emotion/styled';
import Card from './card';
import { Modal } from './modal';
import VideoEmbed from './video-embed';
import { size } from './theme';

export const VideoCard = styled(Card)`
    flex: 1 1 360px;
    cursor: pointer;
`;

export const VideoModal = ({ id, name, trigger, thumbnail }) => (
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
