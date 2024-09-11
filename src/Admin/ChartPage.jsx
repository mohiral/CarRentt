// Import necessary dependencies
import React, { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the components with Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    // Create a reference to the canvas element
    const chartRef = useRef(null);

    // Example data and options for the chart
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(75,192,192,0.4)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    useEffect(() => {
        const chart = chartRef.current;

        return () => {
            // Destroy the chart instance on component unmount
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    return (
        <div>
            <Bar ref={chartRef} data={data} options={options} />
        </div>
    );
};

export default BarChart;
