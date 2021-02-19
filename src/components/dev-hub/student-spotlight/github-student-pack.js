import React from 'react';
import styled from '@emotion/styled';
import githubStudentPackPng from '../../../images/github-backpack-mongo.png';
import Link from '../link';
import MediaBlock from '../media-block';
import { H4, P, P2 } from '../text';
import { screenSize, size } from '../theme';

const StyledMediaBlock = styled(MediaBlock)`
    background-color: ${({ theme }) => theme.colorMap.devBlack};
    padding: ${size.xlarge} ${size.xxlarge};
    @media ${screenSize.upToMedium} {
        padding: ${size.large} ${size.default} 48px;
    }
`;

const LightText = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

// We want to push the image all the way to the right instead of center
const ImageContainer = styled('div')`
    display: flex;
    justify-content: flex-end;
    object-fit: contain;
`;

// We want this content centered and, on mobile, the text centered as well
const Centered = styled('div')`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    @media ${screenSize.upToLarge} {
        align-items: center;
        text-align: center;
    }
`;

const WhiteLink = styled(Link)`
    color: ${({ theme }) => theme.colorMap.devWhite};
`;

const StyledLink = P2.withComponent(WhiteLink);

const GithubBackpackImg = () => (
    <ImageContainer>
        <img
            alt="Backpack with GitHub logo plus MongoDB leaf"
            height="240"
            src={githubStudentPackPng}
            width="359"
        />
    </ImageContainer>
);

const GithubStudentContent = () => (
    <Centered>
        <H4>
            Get excusive student access to MongoDB Atlas, University on-demand
            content and certifications.
        </H4>
        <LightText>
            Students can apply for the GitHub Student Developer Pack and get
            access to MongoDB Atlas, University on-demand content and
            certifications.
        </LightText>
        <StyledLink tertiary href="https://www.mongodb.com/students">
            GitHub Student Developer Pack
        </StyledLink>
    </Centered>
);

const GithubStudentPack = () => (
    <StyledMediaBlock reverse mediaComponent={<GithubBackpackImg />}>
        <GithubStudentContent />
    </StyledMediaBlock>
);

export default GithubStudentPack;
