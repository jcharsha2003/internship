// src/components/TotalSalesChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { fetchTotalSalesData } from '../services/api';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title);

const TotalSalesChart = () => {
    const [salesData, setSalesData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const getData = async () => {
            const data = await fetchTotalSalesData();
            setSalesData({
                labels: data.daily.labels,
                datasets: [
                    {
                        label: 'Total Sales',
                        data: data.daily.values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                    }
                ]
            });
        };
        getData();
    }, []);

    return <Bar data={salesData} />;
};

export default TotalSalesChart;
