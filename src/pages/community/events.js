import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Button from '../../components/dev-hub/button';
import Card from '../../components/dev-hub/card';
import GradientImage from '../../components/dev-hub/gradient-image';
import Layout from '../../components/dev-hub/layout';
import MediaBlock from '../../components/dev-hub/media-block';
import Link from '../../components/dev-hub/link';
import { Event, EventListPreview } from '../../components/dev-hub/events';
import { H1, H2, P, H4 } from '../../components/dev-hub/text';
import {
    size,
    colorMap,
    screenSize,
    fontSize,
} from '../../components/dev-hub/theme';

export default ({ ...data }) => {
    return (
        <Layout>
            <H1>Events</H1>
        </Layout>
    );
};
