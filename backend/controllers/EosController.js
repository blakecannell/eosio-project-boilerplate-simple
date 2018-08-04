config = {
    chainId: null, // 32 byte (64 char) hex string
    keyProvider: ['5JXYNSdz1h9UgrRpvWQiGi21VB269BQ31CVRSNXQRMRTjY9kjRE'], // WIF string or array of keys..
    httpEndpoint: 'Ec2-52-10-35-115.us-west-2.compute.amazonaws.com',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
};
accountName = "johnsmith123";
contractName = "Straasapp111";
tableName = "proposal";
numberOfResults = "100";


class EosController {
	constructor() {
	}

	async createProposal (req, res) {
		try {
            const response = eos.contract(contractName).then(contractName => contractName.createprop(req.body));
			res.send(response);
		} catch (err) {
			console.log.error(err);
			res.status(500).send(err);
		}
	}

    async castVote (req, res) {
        try {
            const response = eos.contract(contractName).then(contractName => contractName.castvote(req.body));
            res.send(response);
        } catch (err) {
            console.log.error(err);
            res.status(500).send(err);
        }
    }

	async getAll (req, res) {
		try {
			const response = eos.getTableRows(
                {
                    json: true,
                    code: contractName, //eos.token
                    scope: accountName, //not sure about this but i think it may be the account name
                    table: tableName, //the name of the table
                    limit: numberOfResults //maximum number of
                }
            ).then(
                (result) => {
                	return result
                }).catch(
                (err) => {
                    console.log.error(err);
                    res.status(500).send(err);
                });
            res.send(response);
		} catch (err) {
			console.log.error(err);
			res.status(500).send(err);
		}
	}

	async getById(req, res) {
        try {
            const response = eos.getTableRows(
                {
                    json: true,
                    code: contractName, //eos.token
                    scope: accountName, //not sure about this but i think it may be the account name
                    table: tableName, //the name of the table
					lower_bound: req.body,
                    limit: numberOfResults //maximum number of
                }
            ).then(
                (result) => {
                    return result
                }).catch(
                (err) => {
                    console.log.error(err);
                    res.status(500).send(err);
                });
            res.send(response);
        } catch (err) {
            console.log.error(err);
            res.status(500).send(err);
        }
	}

}

module.exports = EosController;