import express from 'express';
import bodyParser from 'body-parser';
import OrderRoutes from './server/routes/OrderRoutes';
import OrderItensRoutes from './server/routes/OrderItensRoutes';
import ProductRoutes from './server/routes/ProductRoutes';
import TableRoutes from './server/routes/TableRoutes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use('/api/order', OrderRoutes);
app.use('/api/orderitens', OrderItensRoutes);
app.use('/api/product', ProductRoutes);
app.use('/api/table', TableRoutes);

app.get('*', (req, res) => res.status(200).send({
  message: 'Esta é a API do God Save the Queen - BAR.'
}));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`)
});

export default app;