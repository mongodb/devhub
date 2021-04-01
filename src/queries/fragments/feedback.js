import { graphql } from 'gatsby';

export const feedbackFlows = graphql`
    fragment FeedbackFlows on StrapiFeedbackRatingFlow {
        OneStarRatingFlow {
            forms {
                FormElement {
                    type
                    labels {
                        label
                    }
                }
                cta
                description
                title
            }
        }
        TwoStarRatingFlow {
            forms {
                FormElement {
                    labels {
                        label
                    }
                    type
                }
                cta
                description
                title
            }
        }
        ThreeStarRatingFlow {
            forms {
                FormElement {
                    labels {
                        label
                    }
                    type
                }
                cta
                description
                title
            }
        }
        FourStarRatingFlow {
            forms {
                FormElement {
                    labels {
                        label
                    }
                    type
                }
                cta
                description
                title
            }
        }
        FiveStarRatingFlow {
            forms {
                FormElement {
                    labels {
                        label
                    }
                    type
                }
                cta
                description
                title
            }
        }
    }
`;
