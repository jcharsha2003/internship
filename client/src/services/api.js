// src/services/api.js

const BASE_URL = 'http://localhost:5000/api'; // Adjust the base URL if needed


// Function to aggregate data
const aggregateSalesData = (orders, interval) => {
    const sales = {};

    orders.forEach(order => {
        const date = new Date(order.created_at);
        let key;

        if (interval === 'daily') {
            key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        } else if (interval === 'monthly') {
            key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        } else if (interval === 'quarterly') {
            const quarter = Math.ceil((date.getMonth() + 1) / 3);
            key = `${date.getFullYear()}-Q${quarter}`;
        } else if (interval === 'yearly') {
            key = `${date.getFullYear()}`;
        }

        if (!sales[key]) sales[key] = 0;
        sales[key] += parseFloat(order.total_price);
    });

    return sales;
};

export const fetchTotalSalesData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/orders`);
        const orders = await response.json();

        // Process data for different intervals
        const dailySales = aggregateSalesData(orders, 'daily');
        const monthlySales = aggregateSalesData(orders, 'monthly');
        const quarterlySales = aggregateSalesData(orders, 'quarterly');
        const yearlySales = aggregateSalesData(orders, 'yearly');

        // Convert aggregated data to chart-friendly format
        const formatData = (salesData) => ({
            labels: Object.keys(salesData).sort(),
            values: Object.values(salesData).sort((a, b) => new Date(a) - new Date(b)),
        });

        return {
            daily: formatData(dailySales),
            monthly: formatData(monthlySales),
            quarterly: formatData(quarterlySales),
            yearly: formatData(yearlySales),
        };
    } catch (error) {
        console.error('Error fetching total sales data:', error);
        return { daily: { labels: [], values: [] }, monthly: { labels: [], values: [] }, quarterly: { labels: [], values: [] }, yearly: { labels: [], values: [] } };
    }
};

// Fetch sales growth data
export const fetchGrowthData = async () => {
    const response = await fetch(`${BASE_URL}/orders`);
    const orders = await response.json();
    // Process the orders to calculate sales growth rate over time
    // (You need to implement this based on your requirements)
    return {
        labels: [], // Populate with appropriate labels
        values: [], // Populate with appropriate values
    };
};

// Fetch new customers data
export const fetchNewCustomersData = async () => {
    const response = await fetch(`${BASE_URL}/customers`);
    const customers = await response.json();
    // Process the customers to get new customers added over time
    // (You need to implement this based on your requirements)
    return {
        labels: [], // Populate with appropriate labels
        values: [], // Populate with appropriate values
    };
};

// Fetch repeat customers data
export const fetchRepeatCustomersData = async () => {
    const response = await fetch(`${BASE_URL}/customers`);
    const customers = await response.json();
    // Process the customers to get repeat customers
    // (You need to implement this based on your requirements)
    return {
        labels: [], // Populate with appropriate labels
        values: [], // Populate with appropriate values
    };
};

// Fetch geographical distribution data
export const fetchGeoData = async () => {
    const response = await fetch(`${BASE_URL}/customers`);
    const customers = await response.json();
    // Process the customers to get geographical distribution
    // (You need to implement this based on your requirements)
    return customers.map(customer => ({
        lat: customer.addresses[0]?.latitude || 0, // Adjust based on your data structure
        lng: customer.addresses[0]?.longitude || 0, // Adjust based on your data structure
        name: customer.first_name + ' ' + customer.last_name
    }));
};

// Fetch customer lifetime value data
export const fetchLifetimeValueData = async () => {
    const response = await fetch(`${BASE_URL}/customers`);
    const customers = await response.json();
    // Process the customers to get customer lifetime value by cohorts
    // (You need to implement this based on your requirements)
    return {
        labels: [], // Populate with appropriate labels
        values: [], // Populate with appropriate values
    };
};
