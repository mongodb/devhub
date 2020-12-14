import React from 'react';
import styled from '@emotion/styled';
import githubStudentPackPng from '../../../images/github-backpack-mongo.png';
import Link from '../link';
import MediaBlock from '../media-block';
import { H4, P } from '../text';
import { screenSize } from '../theme';

const SectionContent = styled('div')`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    @media ${screenSize.upToLarge} {
        align-items: center;
        text-align: center;
    }
`;

const LightText = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.colorMap.devWhite};
`;

const ImageContainer = styled('div')`
    display: flex;
    justify-content: flex-end;
`;

const GithubBackpackImg = () => (
    <ImageContainer>
        <img
            src={githubStudentPackPng}
            alt="Backpack with GitHub logo plus MongoDB leaf"
        />
    </ImageContainer>
);

const GithubStudentContent = () => (
    <SectionContent>
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
    </SectionContent>
);

const GithubStudentPack = () => (
    <MediaBlock reverse mediaComponent={<GithubBackpackImg />}>
        <GithubStudentContent />
    </MediaBlock>
);

export default GithubStudentPack;
