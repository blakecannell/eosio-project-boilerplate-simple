const EosService = require("../services/EosService");


class EosController {
	constructor() {
	}

	async createProposal (req, res) {
		//sort out the args here
		try {
			const response = await EosService.put(args);
			res.send(response);
		} catch (err) {
			console.log.error(err);
			res.status(500).send(err);
		}
	}

	async getData (req, res) {
		//sort out the args here
		try {
			const response = await EosService.getData(args)
            res.send(response);
		} catch (err) {
			console.log.error(err);
			res.status(500).send(err);
		}
	}
}

module.exports = EosController;