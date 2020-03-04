import React from 'react';
// import { Meta, Story, Preview } from '@storybook/addon-docs/blocks';
import { storiesOf } from '@storybook/react';
import { select, withKnobs } from '@storybook/addon-knobs';
import ArrowheadIcon from './arrowhead-icon';
import CopyIcon from './copy-icon';
import EnvelopeIcon from './envelope-icon';
import FacebookIcon from './facebook-icon';
import FolderIcon from './folder';
import GithubIcon from './github';
import LinkIcon from './link-icon';
import LinkedInIcon from './linkedin';
import ListIcon from './list-icon';
import LocationIcon from './location-icon';
import MongoDBLeaf from './mdb-leaf';
import MongoDBLogo from './mongodb-logo';
import ShareIcon from './share-icon';
import TwitchIcon from './twitch';
import TwitterIcon from './twitter-icon';
import Youtube from './youtube';
import { colorMap, size } from '../theme';
import styled from '@emotion/styled-base';

const Row = styled('div')`
    align-items: start;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: ${size.default} 0;
    max-width: 80%;
`;

storiesOf('Icons', module)
    .addDecorator(withKnobs)
    .add('all', () => {
        const color = select('color', Object.values(colorMap), colorMap.teal);
        return (
            <div>
                <Row>
                    <ArrowheadIcon color={color} />
                    <CopyIcon color={color} />
                    <EnvelopeIcon color={color} />
                    <FacebookIcon color={color} />
                </Row>
                <Row>
                    <FolderIcon color={color} />
                    <GithubIcon color={color} />
                    <LinkIcon color={color} />
                    <LinkedInIcon color={color} />
                </Row>
                <Row>
                    <ListIcon color={color} />
                    <LocationIcon color={color} />
                    <MongoDBLogo color={color} />
                    <ShareIcon color={color} />
                </Row>
                <Row>
                    <TwitchIcon color={color} />
                    <TwitchIcon color={color} />
                    <TwitterIcon color={color} />
                    <Youtube color={color} />
                </Row>
            </div>
        );
    });
