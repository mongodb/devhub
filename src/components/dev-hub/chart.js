import React, { useMemo } from 'react';
import { css } from '@emotion/core';
import { buildQueryString } from '../../utils/query-string';
import styled from '@emotion/styled';

const DEFAULT_CHART_AUTOREFRESH = 3600;
const DEFAULT_CHART_HEIGHT = '570';
const DEFAULT_CHART_WIDTH = '760';
const DEFAULT_CHART_THEME = 'dark';

const getAlignment = align => {
    switch (align) {
        case 'left':
            return css`
                float: left;
            `;
        case 'right':
            return css`
                float: right;
            `;
        case 'center':
            return css`
                display: block;
                margin-left: auto;
                margin-right: auto;
            `;
        default:
            return null;
    }
};

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
    background: ${({ pageTheme, theme }) =>
        pageTheme === 'light' ? theme.colorMap.devWhite : 'transparent'};
    border: 1px solid ${({ theme }) => theme.colorMap.devWhite};
    ${({ customAlign }) => getAlignment(customAlign)};
    max-width: 100%;
`;

const Chart = ({ nodeData: { options } }) => {
    const chartSrc = useMemo(() => buildChartUrl(options), [options]);
    return (
        <StyledChart
            customAlign={options.align}
            pageTheme={options.theme}
            height={options.height || DEFAULT_CHART_HEIGHT}
            title={options.title}
            src={chartSrc}
            width={options.width || DEFAULT_CHART_WIDTH}
        />
    );
};

export default Chart;
