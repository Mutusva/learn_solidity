// contract test code will go here
const assert =  require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // creates a constructor function to the web3, thats why we used capitalization. You will need to provide  a provider eg. ganache, rinkeby etc
// create an instance of web3
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile'); // interface is our ABI, bytecode is our compiled contract

// Mocha is a testing framework
let fetchedAccounts;
let inbox;
beforeEach(async () => {
    // Get a list of all accounts
    fetchedAccounts =  await web3.eth.getAccounts()
    
    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi there!']})   // remember of Inbox contract take an initial message in construct to initialise the contract.
    .send({from: fetchedAccounts[0], gas: '1000000'})
})

describe('Inbox test',() => {
    it('deploys a contract', () => {
        // whenever our contract get an address, we become sure that the contract has been deployed.
      assert.ok(inbox.options.address); // Ok checks if the property passed has a value
    });

    it('has a default message',async () => {
      const msg = await inbox.methods.message().call();
      assert.equal(msg, 'Hi there!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('Hi Innoe!').send({from: fetchedAccounts[0]});
        const msg =  await inbox.methods.message().call();
        assert.equal(msg, 'Hi Innoe!');
    });
});
