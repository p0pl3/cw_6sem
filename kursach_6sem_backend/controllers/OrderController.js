const uuid = require('uuid')
const path = require('path');
const {Order, Category, Role, Store, BookOrder, Book} = require('../models/models')
const {Op} = require('sequelize');
const ApiError = require('../error/ApiError');

class OrderController {

    async createInternalOrder(req, res, next) {
        try {
            let {date_arrive} = req.body
            let {store_id} = req.params
            const order = await Order.create({
                date_arrive: date_arrive,
                status: "CREATED",
                order_type: "INTERNAL",
                destinationId: store_id
            });
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest("Некоректный ввод"));
        }
    }

    async createExternalOrder(req, res, next) {
        try {
            let order;
            if (req.user.role.name === "EXTERNAL") {
                order = await Order.create({
                    date_arrive: req.body.date_arrive,
                    status: "CREATED",
                    order_type: "EXTERNAL",
                    destinationUserId: req.user.id
                });
            } else {
                order = await Order.create({
                    date_arrive: req.body.date_arrive,
                    status: "CREATED",
                    order_type: "EXTERNAL",
                    destinationId: req.body.storeId
                });
            }
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest("Некоректный ввод"));
        }
    }

    async performInternalOrder(req, res, next) {
        const {id, store_id} = req.params
        try {
            const order = Order.update(
                {
                    status: "ACCEPTED",
                    sourceId: store_id
                },
                {
                    where: {
                        id: id
                    }
                }
            );
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest("Некоректный ввод"));
        }
    }

    async performExternalOrder(req, res, next) {
        const {id} = req.params;

        try {
            let order;
            if (req.user.role.name === "EXTERNAL")
                order = Order.update(
                    {
                        status: "ACCEPTED",
                        sourceUserId: req.user.id
                    },
                    {
                        where: {
                            id: id
                        }
                    }
                )
            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest("Некоректный ввод"));
        }
    }

    async getAllAdmin(req, res) {
        const orders = await Order.findAll();
        return res.json(orders);
    }

    async getInternalBurseMy(req, res) {
        const {store_id} = req.params
        const orders = await Order.findAll({
            where: {
                status: 'CREATED',
                destinationId: store_id
            },
        });
        return res.json(orders);
    }

    async getInternalBurse(req, res) {
        const {store_id} = req.params
        const orders = await Order.findAll({
            where: {
                status: 'CREATED',
                [Op.or]: [
                    {
                        order_type: "INTERNAL",
                        destinationId: {
                            [Op.not]: store_id
                        }
                    },
                    {
                        order_type: "EXTERNAL",
                        destinationUserId: {
                            [Op.not]: null
                        }
                    }

                ]

            },
        });
        return res.json(orders);
    }


    async getExternalBurseMy(req, res) {
        const orders = await Order.findAll({
            where: {
                status: 'CREATED',
                order_type: "EXTERNAL",
                destinationUserId: req.user.id
            },
        });
        return res.json(orders);
    }

    async getExternalBurse(req, res) {
        const orders = await Order.findAll({
            where: {
                status: 'CREATED',
                order_type: "EXTERNAL",
                destinationUserId: {
                    [Op.or]: {
                        [Op.not]: req.user.id,
                        [Op.is]: null
                    }
                }

            },
        });
        return res.json(orders);
    }

    async getInternalOrders(req, res) {
        const {store_id} = req.params;
        const {page_size, page} = req.query

        let request_body = {}

        if (page_size && page) {
            request_body = {
                ...request_body,
                limit: page_size,
                offset: (page - 1) * page_size
            }
        }

        let where = {
            status: {
                [Op.not]: "CREATED",
            },
            [Op.or]: [
                {destinationId: store_id},
                {sourceId: store_id}
            ]
        }

        request_body = {
            ...request_body,
            where: where,
            order: [
                ['updatedAt', 'DESC']
            ]
        }

        const orders = await Order.findAll(request_body);
        return res.json(orders);
    }

    async getExternalOrders(req, res) {
        const userId = req.user.id
        const orders = await Order.findAll({
            where: {
                [Op.or]: [
                    {destinationUserId: userId},
                    {sourceUserId: userId},
                ]
            }
        });
        return res.json(orders);
    }

    async getLastInternalOrders(req, res) {
        const {store_id} = req.params;
        const orders = await Order.findAll(
            {
                limit: 10,
                where: {
                    status: "ACCEPTED",
                    [Op.or]: [
                        {destinationId: store_id},
                        {sourceId: store_id}
                    ]
                },
                order: [['updatedAt', 'DESC']]
            }
        );
        return res.json(orders);
    }

    async getLastExternalOrders(req, res) {
        const userId = req.user.id
        const orders = await Order.findAll(
            {
                limit: 10,
                where: {
                    status: "ACCEPTED",
                    order_type: "EXTERNAL",
                    [Op.or]: [
                        {destinationUserId: userId},
                        {sourceUserId: userId}
                    ]
                },
                order: [['updatedAt', 'DESC']]
            }
        );
        return res.json(orders);
    }


    async getOne(req, res) {
        const {id} = req.params
        const order = await Order.findOne(
            {
                where: {id},
                include: [
                    {model: BookOrder},
                ]
            },
        )
        return res.json(order)
    }

    async confirmOrder(req, res) {
        const {id} = req.params
        const order = await Order.findOne(
            {
                where: {
                    id: id,
                    [Op.not]: {
                        status: 'DONE'
                    }
                },
                include: [
                    {model: BookOrder},
                    {model: Store, as: 'destinationWarehouse'},
                    {model: Store, as: 'sourceWarehouse'},
                ]
            },
        )
        if (order) {
            order.status = "DONE";
            await order.save()
        } else {
            return res.status(400).json("Was done")
        }
        for (let count = 0; count < order.order_articles.length; count++) {
            const articles = order.order_articles[count]
            if (order.destinationId) {
                const articleDist = await Book.findOne(
                    {
                        where: {
                            article_number: articles.article_number,
                            storeId: order.destinationId
                        },
                    },
                )
                if (articleDist) {
                    articleDist.count += articles.count
                    await articleDist.save()
                } else {
                    await Book.create({
                        name: articles.name,
                        author: articles.author,
                        article_number: articles.article_number,
                        count: articles.count,
                        storeId: order.destinationId,
                        categoryId: articles.categoryId
                    });
                }
            }

            if (order.sourceId) {
                const articleSource = await Book.findOne(
                    {
                        where: {
                            article_number: articles.article_number,
                            storeId: order.sourceId
                        },
                    },
                )
                if (articleSource) {
                    articleSource.count -= articles.count
                    await articleSource.save()
                }
            }

        }


        return res.json(order)
    }
}

module.exports = new OrderController()
