import React from 'react';
import styled from '@emotion/styled';
import { P } from '../../dev-hub/text';

const GreenBullet = styled('ul')`
    color: ${({ theme }) => theme.colorMap.darkGreen};
    list-style-type: circle;
`;

export const BulletText = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    margin-bottom: 0;
`;

const GreenBulletedList = ({ children, ...props }) => (
    <GreenBullet {...props}>
        {children.map(content => (
            <li key={content}>
                <BulletText>{content}</BulletText>
            </li>
        ))}
    </GreenBullet>
);

export default GreenBulletedList;
