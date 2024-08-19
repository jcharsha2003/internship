// src/components/RepeatCustomersChart.js

import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title } from 'chart.js';
import { fetchRepeatCustomersData } from '../services/api';

ChartJS.register(ArcElement, Title);

const RepeatCustomersChart = () => {
    const [repeatCustomersData, setRepeatCustomersData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const getData = async () => {
            const data = await fetchRepeatCustomersData();
            setRepeatCustomersData({
                labels: data.labels,
                datasets: [
                    {
                        label: 'Repeat Customers',
                        data: data.values,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                    }
                ]
            });
        };
        getData();
    }, []);

    return <Doughnut data={repeatCustomersData} />;
};

export default RepeatCustomersChart;
