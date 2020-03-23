import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { buildQueryString } from '../../utils/query-string';
import styled from '@emotion/styled';

const DEFAULT_CHART_HEIGHT = '570';
const DEFAULT_CHART_WIDTH = '760';
const DEFAULT_CHART_THEME = 'dark';

const buildChartUrl = (baseUrl, options) => {
    const params = {
        autorefresh: options.autorefresh,
        id: options.id,
        theme: options.theme || DEFAULT_CHART_THEME,
    };
    const queryString = buildQueryString(params);
    return `${baseUrl}/embed/charts?${queryString}`;
};

const StyledChart = styled('iframe')`
    ${({ customAlign }) => !customAlign && `float: ${customAlign};`};
    ${({ chartWidth }) => `width: min(100%, ${chartWidth}px)`};
`;

const Chart = ({ nodeData: { options } }) => {
    const chartHostUrl = options.url;
    const chartHeight = options.height || DEFAULT_CHART_HEIGHT;
    const chartWidth = options.width || DEFAULT_CHART_WIDTH;
    const chartTitle = options.title || 'MongoDB Chart';
    const customAlign = options.align;
    const chartSrc = useMemo(() => buildChartUrl(chartHostUrl, options), [
        chartHostUrl,
        options,
    ]);
    return (
        <StyledChart
            height={chartHeight}
            src={chartSrc}
            title={chartTitle}
            chartWidth={chartWidth}
            customAlign={customAlign}
        />
    );
};

Chart.propTypes = {
    className: PropTypes.string,
    nodeData: PropTypes.shape({
        argument: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string.isRequired,
            })
        ),
        options: PropTypes.shape({
            autorefresh: PropTypes.string,
            height: PropTypes.string,
            id: PropTypes.string,
            theme: PropTypes.string,
            width: PropTypes.string,
        }),
    }),
    src: PropTypes.string,
};

export default Chart;
