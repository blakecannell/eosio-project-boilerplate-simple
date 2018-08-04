Eos = require('eosjs');
config = {
    chainId: null, // 32 byte (64 char) hex string
    keyProvider: ['5JXYNSdz1h9UgrRpvWQiGi21VB269BQ31CVRSNXQRMRTjY9kjRE'], // WIF string or array of keys..
    httpEndpoint: 'http://Ec2-52-10-35-115.us-west-2.compute.amazonaws.com:8888',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
};
accountName = "johnsmith123";
contractName = "straasapp112";
tableName = "proposal";
numberOfResults = 100;

options = {
    authorization: 'johnsmith123@active',
    broadcast: true,
    sign: true
}

eos = Eos(config);
class EosController {
	constructor() {
	}

	async createProposal (req, res) {
		try {
            const { hash, title } = req.body;
            const response = await eos.contract(contractName).then(contractName => contractName.createprop(accountName, title, hash, options));
			res.send(response);
		} catch (err) {
			console.log(err);
			res.status(500).send(err);
		}
	}

    async castVote (req, res) {
        try {
            const { proposal, vote } = req.body;
            const response = await eos.contract(contractName).then(contractName => contractName.castvote(accountName, proposal, vote, options));
            res.send(response);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

	async getAll (req, res) {
		try {
			console.log(req.body);
			const result = await eos.getTableRows(
                {
                    json: true,
                    code: contractName, //eos.token
                    scope: contractName, //
                    table: tableName, //the name of the table
                    limit: numberOfResults //maximum number of
                });
            res.send(result);
		} catch (err) {
			console.log(err);
			res.status(500).send(err);
		}
	}

	async getById(req, res) {
        try {
            const id = req.params.id;
            const response = await eos.getTableRows(
                {
                    json: true,
                    code: contractName, //eos.token
                    scope: contractName, //
                    table: tableName, //the name of the table
					table_key: 0,
                    lower_bound: id,
                    limit: numberOfResults //maximum number of
                }
            );
            res.send(response);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
	}

}

module.exports = EosController;