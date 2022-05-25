import connectDB from "../models/index.js";

const RateModel = connectDB.rates;

const RateService = {};

RateService.getAllRates = async () => {
    return await RateModel.findAll({
        include: [{
            model: connectDB.users
        }, {
            model: connectDB.posts
        }]
    });
}

RateService.getRateById = async (id) => {
    return await RateModel.findOne({
        where: { id: id },
        include: [{
            model: connectDB.users
        }, {
            model: connectDB.posts
        }]
    })
}

RateService.updateRate = async (id, rate) => {

    const rateUpdate = await RateModel.findOne({ where: { id: id } });

    if (!rateUpdate) throw "Rate not found!!!";

    Object.assign(rateUpdate, rate);

    await rateUpdate.save();
}

RateService.deleteRate = async (id) => {
    const rateDelete = await RateModel.findOne({ where: { id: id } });

    if (!rateDelete) throw "Rate not found!!!";

    return await RateModel.destroy({ where: { id: id } });
}

RateService.createRate = async (rate) => {

    const rateCreate = new RateModel(rate);

    await rateCreate.save();
}

export default RateService;