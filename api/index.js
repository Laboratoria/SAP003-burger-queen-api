import express from 'express'
import bodyParser from 'body-parser'
import menuRoutes from './server/routes/MenuRoutes'
import tableRoutes from './server/routes/TableRoutes'
import orderRoutes from './server/routes/OrderRoutes'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 3000

app.use('/api/menus', menuRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/orders', orderRoutes);

app.get('*', (req, res) => res.status(200).send({
   message: 'Esta é a API da nossa hamburgueria.'
}))

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`)
})

export default app