import React from 'react';
import TotalSalesChart from './components/TotalSalesChart';
import SalesGrowthChart from './components/SalesGrowthChart';
import NewCustomersChart from './components/NewCustomersChart';
import RepeatCustomersChart from './components/RepeatCustomersChart';
import GeoDistributionChart from './components/GeoDistributionChart';
import CustomerLifetimeValueChart from './components/CustomerLifetimeValueChart';

function App() {
  return (
    <div className="App">
      <h1>Shopify Data Visualization</h1>
      <TotalSalesChart />
      <SalesGrowthChart />
      <NewCustomersChart />
      <RepeatCustomersChart />
      <GeoDistributionChart />
      <CustomerLifetimeValueChart />
    </div>
  );
}

export default App;
