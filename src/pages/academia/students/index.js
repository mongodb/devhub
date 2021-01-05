import React from 'react';
import Layout from '~components/dev-hub/layout';
import {
    GithubStudentPack,
    ShareProjectCTA,
} from '~components/dev-hub/student-spotlight';
import AllProjects from '~components/pages/students/all-projects';
import GalleryHeroBanner from '~components/pages/students/gallery-hero-banner';

const Students = () => {
    return (
        <Layout>
            <GalleryHeroBanner />
            <AllProjects />
            <ShareProjectCTA />
            <GithubStudentPack />
        </Layout>
    );
};

export default Students;
