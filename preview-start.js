/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import { getPageData } from 'previewSetup'; // Alias found in gatsby-node and webpack.config.js
// Layouts
import Layout from './src/components/dev-hub/layout';
import DocumentBody from './src/components/DocumentBody';
import Guide from './src/templates/guide';
import Index from './src/templates/guides-index';

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.templates = {
            document: DocumentBody,
            guide: Guide,
            'guides-index': Index,
        };
        this.state = {
            pageData: null,
            Template: null,
        };
    }

    componentDidMount() {
        getPageData().then(pageData => {
            const Template = this.templates[pageData.template];
            this.setState({
                pageData,
                Template,
            });
        });
    }

    render() {
        const { pageData, Template } = this.state;

        return (
            <React.Fragment>
                {pageData && (
                    <Layout pageContext={pageData.context} path={pageData.path}>
                        <Template
                            pageContext={pageData.context}
                            refDocMapping={pageData.context.__refDocMapping}
                            path={pageData.path}
                        />
                    </Layout>
                )}
            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <Preview />,
    document.getElementById('app') // Found in index.html
);
