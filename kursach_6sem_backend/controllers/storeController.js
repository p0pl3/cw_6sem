const {Store, User} = require('../models/models')
const ApiError = require('../error/ApiError');

class StoreController {
    async create(req, res) {
        const {name, address} = req.body;
        const store = await Store.create({name, address});
        return res.json(store);
    }

    async getAll(req, res) {
        const stores = await Store.findAll();
        return res.json(stores);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const store = await Store.findOne(
            {
                where: {
                    id: id,
                }
            },
        );
        return res.json(store);
    }

    async getAvailable(req, res) {
        const store = await Store.findAll(
            {
                include: [
                    {
                        model: User,
                        where: {id: req.user.id}
                    },
                ]
            },
        );
        return res.json(store);
    }

    async update(req, res) {
        const {id} = req.params;
        const {name, address} = req.body;

        try {
            const store = Store.update(
                {name, address},
                {
                    where: {
                        id: id,
                    }
                }
            )
            return res.json(store);
        } catch (e) {
            res.status(400).json({message: "Ошибка валидации"});
        }
    }

    async delete(req, res) {
        const {id} = req.params;
        try {
            await Store.destroy({
                where: {
                    id: id,
                }
            });
            return res.status(204).json();
        } catch (e) {
            res.status(400).json({message: "Ошибка валидации"});
        }
    }
}

module.exports = new StoreController()
