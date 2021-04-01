import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

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
    // console.log(data);
    // TODO: Implement feedback UI
    return <div />;
};

export default FeedbackContainer;
