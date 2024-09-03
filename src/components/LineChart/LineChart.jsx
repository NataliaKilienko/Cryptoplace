import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChart = ({ historicalData }) => {
    
    const labels = historicalData.prices.map(item =>
        new Date(item[0]).toLocaleDateString()
    );
    const dataPoints = historicalData.prices.map(item => item[1]);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Price',
                data: dataPoints,
                borderColor: '#4500c6',
                backgroundColor: 'rgba(69, 0, 198, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, 
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#FFFFFF' },
            },
            y: {
                grid: { color: '#32245e' },
                ticks: {
                    color: '#FFFFFF',
                    callback: function(value) {
                        return value >= 1 
                            ? value.toLocaleString()
                            : value.toFixed(8);
                    }
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: { color: '#FFFFFF' },
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y >= 1 
                                ? context.parsed.y.toLocaleString() 
                                : context.parsed.y.toFixed(8);
                        }
                        return label;
                    }
                },
                backgroundColor: '#2d204b',
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF',
                borderColor: '#4500c6',
                borderWidth: 1,
            },
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
        },
    };
    
    return (
        <div style={{ height: '400px', width: '100%', maxWidth: '100%' }}>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default LineChart;
