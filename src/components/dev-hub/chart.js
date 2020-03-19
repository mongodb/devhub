import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { getNestedValue } from '../../utils/get-nested-value';

const DEFAULT_CHART_HEIGHT = '570';
const DEFAULT_CHART_WIDTH = '760';

const Chart = ({ nodeData: { argument, options, src } }) => {
    const imgSrc = src || getNestedValue([0, 'value'], argument);
    const chartHeight = options.height || DEFAULT_CHART_HEIGHT;
    const chartWidth = options.width || DEFAULT_CHART_WIDTH;
    const chartTitle = options.title || 'MongoDB Chart';
    const chartSrc = useMemo(() => `${imgSrc}&theme=dark`, [imgSrc]);
    return (
        <iframe
            height={chartWidth}
            src={chartSrc}
            title={chartTitle}
            width={chartHeight}
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
            align: PropTypes.string,
            alt: PropTypes.string,
            checksum: PropTypes.string,
            height: PropTypes.string,
            scale: PropTypes.string,
            title: PropTypes.string,
            width: PropTypes.string,
        }),
    }),
    src: PropTypes.string,
};

export default Chart;
