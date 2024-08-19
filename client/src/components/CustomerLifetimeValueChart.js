// src/components/CustomerLifetimeValueChart.js

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { fetchLifetimeValueData } from '../services/api';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

const CustomerLifetimeValueChart = () => {
    const [lifetimeValueData, setLifetimeValueData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const getData = async () => {
            const data = await fetchLifetimeValueData();
            setLifetimeValueData({
                labels: data.labels,
                datasets: [
                    {
                        label: 'Lifetime Value',
                        data: data.values,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    }
                ]
            });
        };
        getData();
    }, []);

    return <Line data={lifetimeValueData} />;
};

export default CustomerLifetimeValueChart;
