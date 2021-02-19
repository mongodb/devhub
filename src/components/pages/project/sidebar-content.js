import React from 'react';
import styled from '@emotion/styled';
import Link from '~components/Link';
import { size } from '~components/dev-hub/theme';
import Students from './students';
import ToolsUsed from './tools-used';

const BottomBorder = styled('div')`
    border-bottom: 1px solid ${({ theme }) => theme.colorMap.greyDarkThree};
    margin-bottom: 24px;
`;

const LinksContainer = styled('div')`
    padding-bottom: ${size.large};
`;

const ProjectLink = styled(Link)`
    color: ${({ theme }) => theme.colorMap.devWhite};
    font-weight: bold;
`;

const ToolsUsedWithPadding = styled(ToolsUsed)`
    padding-bottom: ${size.large};
`;

const LinkIfExists = ({ label, to, ...props }) =>
    to ? (
        <ProjectLink tertiary to={to} {...props}>
            {label}
        </ProjectLink>
    ) : null;

const Links = ({ github_url, project_link }) => {
    const hasExternalLinks = !!(github_url || project_link);
    if (hasExternalLinks) {
        return (
            <LinksContainer>
                <LinkIfExists to={github_url} label="View Code" />
                <LinkIfExists
                    target="_blank"
                    to={project_link}
                    label="Live Demo"
                />
            </LinksContainer>
        );
    }
};

const SidebarContent = ({ github_url, project_link, students, tags }) => (
    <div>
        <BottomBorder>
            <ToolsUsedWithPadding tags={tags} />
            <Links github_url={github_url} project_link={project_link} />
        </BottomBorder>
        <Students students={students} />
    </div>
);

export default SidebarContent;
