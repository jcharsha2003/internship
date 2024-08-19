// src/components/SalesGrowthChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { fetchGrowthData } from '../services/api';

// Register components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement // Make sure this is registered
);

const SalesGrowthChart = () => {
    const [growthData, setGrowthData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const getData = async () => {
            const data = await fetchGrowthData();
            setGrowthData({
                labels: data.labels,
                datasets: [
                    {
                        label: 'Sales Growth',
                        data: data.values,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                    }
                ]
            });
        };
        getData();
    }, []);

    return <Bar data={growthData} />;
};

export default SalesGrowthChart;
