Eos = require('eosjs');

// Default configuration (additional options below)
config = {
    chainId: null, // 32 byte (64 char) hex string
    keyProvider: ['PrivateKeys...'], // WIF string or array of keys..
    httpEndpoint: 'http://127.0.0.1:8888',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
};

eos = Eos(config);

class EosService {
	async put (args) {
		try {
            eos.transaction(
                {
                    // ...headers,
                    actions: [
                        {
                            account: contractName, //eos.token
                            name: contractFunction, //transfer
                            authorization: [{
                                actor: accountName, //inita
                                permission: 'active'
                            }],
                            data: {
                                //input args here when done
                                memo: ''
                            }
                        }
                    ]
                }
                // options -- example: {broadcast: false}
            )
			//return data
		} catch (err) {
			log.err(err);
			throw err;
		}
	}

    async getData(args) {
        eos.getTableRows({
            json: true,
            code: contractName, //eos.token
            scope: accountName, //not sure about this but i think it may be the account name
            table: tableName, //the name of the table
            limit: numberOfResults //maximum number of results
        }).then(
            (result) => {
            	//do something
                //const row = result.rows.find(row => row.balance.split(" ")[1].toLowerCase() === 'eos');
                //globals.balance = row ? row.balance.split(" ")[0] : 0;
                //m.redraw();
            }).catch(
            (error) => {
			//error
            })
    }
 }

 module.exports = new EosService();