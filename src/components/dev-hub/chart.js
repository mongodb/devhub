import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { buildQueryString } from '../../utils/query-string';
import styled from '@emotion/styled';

const DEFAULT_CHART_HEIGHT = '570';
const DEFAULT_CHART_WIDTH = '760';
const DEFAULT_CHART_THEME = 'dark';

const buildChartUrl = options => {
    const params = {
        autorefresh: options.autorefresh,
        id: options.id,
        theme: options.theme || DEFAULT_CHART_THEME,
    };
    const queryString = buildQueryString(params);
    return `${options.url}/embed/charts${queryString}`;
};

const StyledChart = styled('iframe')`
    ${({ customAlign }) => !customAlign && `float: ${customAlign};`};
    max-width: 100%;
`;

const Chart = ({ nodeData: { options } }) => {
    const chartHeight = options.height || DEFAULT_CHART_HEIGHT;
    const chartWidth = options.width || DEFAULT_CHART_WIDTH;
    const chartTitle = options.title;
    const customAlign = options.align;
    const chartSrc = useMemo(() => buildChartUrl(options), [options]);
    return (
        <StyledChart
            customAlign={customAlign}
            height={chartHeight}
            title={chartTitle}
            src={chartSrc}
            width={chartWidth}
        />
    );
};

Chart.propTypes = {
    className: PropTypes.string,
    nodeData: PropTypes.shape({
        options: PropTypes.shape({
            align: PropTypes.string,
            autorefresh: PropTypes.string,
            height: PropTypes.string,
            id: PropTypes.string,
            theme: PropTypes.string,
            url: PropTypes.string,
            width: PropTypes.string,
        }),
    }),
};

export default Chart;
