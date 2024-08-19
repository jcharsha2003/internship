const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const shopifyCustomersRouter = require('./API/shopifyCustomers');
const shopifyOrdersRouter = require('./API/shopifyOrders');
const shopifyProductsRouter = require('./API/shopifyProducts');

const app = express();
const port = process.env.PORT || 5432;
app.use(cors({ origin: true }));

app.use(express.json());
app.get("/",(req,res)=>{
  res.json("HELLO");
})
// MongoDB connection
mongoose.connect('mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/RQ_Analytics?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/customers', shopifyCustomersRouter);
app.use('/api/orders', shopifyOrdersRouter);
app.use('/api/products', shopifyProductsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
