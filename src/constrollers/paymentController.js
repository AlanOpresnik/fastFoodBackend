const MercadoPago = require('mercadopago');

const client = new MercadoPago.MercadoPagoConfig({
    accessToken:"APP_USR-2313020214010464-042020-e081e4d8d66c8815b48219404edcbf40-1777879429"
}
);

const createOrder = async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: 'ARS',
                }
            ],
            back_urls: {
                success: 'https://www.youtube.com/watch?v=-VD-l5BQsuE&ab_channel=onthecode',
                failure: 'https://www.youtube.com/',
                pending: 'https://www.youtube.com/'
            }
        };

        const preference =  new MercadoPago.Preference(client);
        const result = await preference.create({body});
        res.json({
            result: result
        });
        console.log(result.id);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Error al crear el pedido",
            data: error,
        });
    }
};

module.exports = { createOrder };
