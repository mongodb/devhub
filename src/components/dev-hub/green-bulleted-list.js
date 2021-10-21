import React from 'react';
import styled from '@emotion/styled';
import { P } from '~components/dev-hub/text';
import { size } from '~components/dev-hub/theme';

const GreenBullet = styled('ul')`
    color: ${({ theme }) => theme.colorMap.darkGreen};
    list-style-type: circle;
`;

const ListItemWithSpacing = styled('li')`
    margin-bottom: ${size.default};
`;

export const DefaultBulletText = styled(P)`
    color: ${({ theme }) => theme.colorMap.devWhite};
    margin-bottom: 0;
`;

const GreenBulletedList = ({
    BulletText = DefaultBulletText,
    children,
    ...props
}) => (
    <GreenBullet {...props}>
        {children.map(content => (
            <ListItemWithSpacing key={content}>
                <BulletText>{content}</BulletText>
            </ListItemWithSpacing>
        ))}
    </GreenBullet>
);

export default GreenBulletedList;
