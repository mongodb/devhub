import React from 'react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import { H1 } from '../components/dev-hub/text';
import Logo from '../components/dev-hub/icons/mdb-leaf';
import { size } from '../components/dev-hub/theme';
import Layout from '../components/dev-hub/layout';
import Link from '../components/dev-hub/link';

const Container = styled('div')`
    margin: ${size.xlarge} auto;
    text-align: center;
`;
export default () => (
    <Layout>
        <Helmet>
            <title>404 | MongoDB Developer Hub</title>
        </Helmet>
        <Container>
            <Logo height={70} />
            <H1>Page not found</H1>
            <Link tertiary to="/">
                Go to the homepage
            </Link>
        </Container>
    </Layout>
);
