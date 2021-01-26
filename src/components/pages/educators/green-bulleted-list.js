import React from 'react';
import styled from '@emotion/styled';
import { P } from '../../dev-hub/text';

const GreenBullet = styled('ul')`
    color: ${({ theme }) => theme.colorMap.darkGreen};
    list-style-type: circle;
`;

const WhiteBulletText = styled(P)`
    color: white;
    margin-bottom: 0;
`;

const GreenBulletedList = ({ children }) => (
    <GreenBullet>
        {children.map(content => (
            <li key={content}>
                <WhiteBulletText>{content}</WhiteBulletText>
            </li>
        ))}
    </GreenBullet>
);

export default GreenBulletedList;
