import React from 'react';
import dlv from 'dlv';
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
    const {
        OneStarRatingFlow,
        TwoStarRatingFlow,
        ThreeStarRatingFlow,
        FourStarRatingFlow,
        FiveStarRatingFlow,
    } = dlv(data, 'strapiFeedbackRatingFlow', {});
    // Uncomment below to see shape of data, other forms
    // console.log(data);
    // TODO: Implement feedback UI
    return (
        <CMSForm form={OneStarRatingFlow ? OneStarRatingFlow.forms[1] : []} />
    );
};

export default FeedbackContainer;
