import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import CMSForm from '~components/dev-hub/cms-form';

const feedbackItems = graphql`
    query FeedbackItems {
        strapiFeedbackRatingFlow {
            ...FeedbackFlows
        }
    }
`;

const FeedbackContainer = () => {
    const data = useStaticQuery(feedbackItems);
    // Uncomment below to see shape of data
    console.log(data);
    // TODO: Implement feedback UI
    return (
        <CMSForm
            form={
                data
                    ? data.strapiFeedbackRatingFlow.OneStarRatingFlow.forms[0]
                    : []
            }
        />
    );
};

export default FeedbackContainer;
