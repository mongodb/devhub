import React from 'react';
import Tooltip from './tooltip';
import ListIcon from './list-icon';
import { P, H2 } from './text';

const ContentsMenu = ({ title }) => (
    <Tooltip hasGradientBorder position={'right'} trigger={<ListIcon />}>
        <div>
            <H2 bold>Title</H2>
            <P>I'm REVEALED AGAIN!</P>
            <P>I'm REVEALED AGAIN!</P>
            <P>I'm REVEALED AGAIN!</P>
            <P>I'm REVEALED AGAIN!</P>
            <P>I'm REVEALED AGAIN!</P>
            <P>I'm REVEALED AGAIN!</P>
            <P>I'm REVEALED AGAIN!</P>
        </div>
    </Tooltip>
);

export default ContentsMenu;
