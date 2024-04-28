const MercadoPago = require('mercadopago');
const fetch = require('node-fetch'); // Asumiendo que estás utilizando Node.js para tu backend
const Order = require('../models/Order.js');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');


const client = new MercadoPago.MercadoPagoConfig({
    accessToken: "APP_USR-2313020214010464-042020-e081e4d8d66c8815b48219404edcbf40-1777879429"
});

const createOrder = async (req, res) => {
    try {
        // Obtener datos de la solicitud
        const externalReference = uuidv4();
        const { products, userId, price, quantity, userEmail, name, dni, payment_method, shipping_method, cp } = req.body;

        // Crear los items para la preferencia de MercadoPago
        const items = products.map(product => ({
            title: product.title,
            quantity: Number(quantity),
            unit_price: Number(product.price),
            currency_id: 'ARS',
        }));

        // Crear la preferencia de MercadoPago
        const body = {
            items: items,
            back_urls: {
                success: 'https://fastfood-front-six.vercel.app/#/payment/success',
                failure: 'http://localhost:5173/#/',
                pending: 'http://localhost:5173/#/payment/success'
            },
            auto_return: "approved",
            Notification_url: "https://zapatillasapi.site/mp/webHook",
            external_reference: externalReference
        };

        const preference = new MercadoPago.Preference(client);
        const result = await preference.create({ body });

        // Guardar la orden en la base de datos
        const order = new Order({
            userId: userId,
            name: name,
            cp: cp,
            dni: dni,
            payment_method: payment_method,
            shipping_method: shipping_method,
            userEmail: userEmail,
            products: products, // Guardar los productos en la orden
            totalAmount: Number(price), // Calcular el monto total
            status: 'pendiente',
            external_reference: result.external_reference,
        });
        await order.save();

        res.json({
            result: result
        });

    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({
            status: "error",
            message: "Error al crear la orden",
            data: error,
        });
    }
};

const webHook = async (req, res) => {
    const paymentId = req.query.id;


    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${client.accessToken}`
            }
        })
        console.log(response)
        if (response.ok) {
            const paymentData = await response.json();
            const externalReference = paymentData.external_reference;

            // Buscar la orden en la base de datos utilizando la external_reference asociada con el pago
            const order = await Order.findOne({ external_reference: externalReference });

            // Verificar si se encontró la orden
            if (!order) {
                throw new Error('No se encontró la orden asociada con el pago');
            }

            // Actualizar el estado de la orden si el pago está aprobado
            if (paymentData.status === 'approved') {
                await Order.findOneAndUpdate(
                    { external_reference: externalReference },
                    { $set: { status: 'success' } }
                );
            }

            // Enviar una respuesta de éxito con un código 200
            res.sendStatus(200);
        }
    } catch (error) {
        res.status(500).send('Error al manejar el webhook de MercadoPago');
    }
}


const getOrderById = async (req, res) => {
    const externalReference = req.params.id; // Aquí utilizamos la external_reference como el parámetro de la solicitud

    try {
        // Buscar la orden en la base de datos por external_reference
        const order = await Order.findOne({ external_reference: externalReference });

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error al buscar la orden",
            data: error,
        });
    }
}

const CreateToken = async (req, res) => {
    try {
        // Obtener el total de la compra desde la solicitud
        const { total } = req.body;

        // Verificar si el total está presente en la solicitud
        if (!total) {
            return res.status(400).json({ message: 'Se requiere el total de la compra' });
        }



        // Crear el token JWT con el total de la compra como payload
        const token = jwt.sign({ total }, null, { algorithm: 'none' });

        // Enviar el token generado como respuesta
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error al crear el token:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


module.exports = { createOrder, webHook, getOrderById, CreateToken };


