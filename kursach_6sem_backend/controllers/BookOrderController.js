const {Book, BookOrder} = require('../models/models')

class BookOrderController {
    async create(req, res) {
        const {name, author, article_number, count, categoryId, orderId} = req.body
        const article = await BookOrder.create({name, author, article_number, count, categoryId, orderId})
        return res.json(article)
    }

    async getAll(req, res) {
        const {order_id} = req.params
        const orderArticle = await BookOrder.findAll(
            {
                where: {orderId: order_id}
            }
        )
        return res.json(orderArticle)
    }

    async getOne(req, res) {
        const {order_id, obj_id} = req.params
        const orderArticle = await BookOrder.findOne(
            {
                where: {
                    orderId: order_id,
                    id: obj_id,
                },
            },
        )
        return res.json(orderArticle)
    }

    async update(req, res) {
        const {order_id, obj_id} = req.params
        const {name, author, article_number, count, categoryId, orderId} = req.body

        try {
            const orderArticle = BookOrder.update(
                {name, author, article_number, count, categoryId, orderId},
                {
                    where: {
                        id: obj_id,
                        orderId: order_id,
                    }
                }
            )
            res.json(orderArticle);
        } catch (e) {
            res.status(400).json({message: "Ошибка валидации"})
        }
    }

    async delete(req, res) {
        const {order_id, obj_id} = req.params
        try {
            await BookOrder.destroy({
                where: {
                    id: obj_id,
                    orderId: order_id,
                }
            })
            res.status(204).json();
        } catch (e) {
            res.status(400).json({message: "Ошибка валидации"})
        }
    }

}

module.exports = new BookOrderController()
