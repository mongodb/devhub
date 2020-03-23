import React, { useMemo } from 'react';
import { buildQueryString } from '../../utils/query-string';
import styled from '@emotion/styled';

const DEFAULT_CHART_AUTOREFRESH = 3600;
const DEFAULT_CHART_HEIGHT = '570';
const DEFAULT_CHART_WIDTH = '760';
const DEFAULT_CHART_THEME = 'dark';

const buildChartUrl = options => {
    const params = {
        autorefresh: options.autorefresh || DEFAULT_CHART_AUTOREFRESH,
        id: options.id,
        theme: options.theme || DEFAULT_CHART_THEME,
    };
    const queryString = buildQueryString(params);
    return `${options.url}/embed/charts${queryString}`;
};

const StyledChart = styled('iframe')`
    border: none;
    ${({ customAlign }) => !customAlign && `float: ${customAlign};`};
    max-width: 100%;
`;

const Chart = ({ nodeData: { options } }) => {
    const chartSrc = useMemo(() => buildChartUrl(options), [options]);
    return (
        <StyledChart
            customAlign={options.align}
            height={options.height || DEFAULT_CHART_HEIGHT}
            title={options.title}
            src={chartSrc}
            width={options.width || DEFAULT_CHART_WIDTH}
        />
    );
};

export default Chart;
