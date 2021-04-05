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
                    name
                    required
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
                    name
                    required
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
                    name
                    required
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
                    name
                    required
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
                    name
                    required
                }
                cta
                description
                title
            }
        }
    }
`;
