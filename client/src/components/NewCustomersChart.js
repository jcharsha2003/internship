// src/components/NewCustomersChart.js

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title } from 'chart.js';
import { fetchNewCustomersData } from '../services/api';

ChartJS.register(ArcElement, Title);

const NewCustomersChart = () => {
    const [newCustomersData, setNewCustomersData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const getData = async () => {
            const data = await fetchNewCustomersData();
            setNewCustomersData({
                labels: data.labels,
                datasets: [
                    {
                        label: 'New Customers',
                        data: data.values,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                    }
                ]
            });
        };
        getData();
    }, []);

    return <Pie data={newCustomersData} />;
};

export default NewCustomersChart;
