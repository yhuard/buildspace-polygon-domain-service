# Notes

Function definition:

```sol
function getAddress(string calldata name) public view returns (address) {
```

- `calldata` - this indicates the “location” of where the name argument should be stored. Since it costs real money to process data on the blockchain, Solidity lets you indicate where reference types should be stored. `calldata` is non-persistent and can’t be modified. We like this because it takes the least amount of gas!
- `public` - this is a visibility modifier. We want our function to be accessible by everyone, including other contracts.
- `view` - this just means that the function is only viewing data on the contract, not modifying it.
- `returns (string)` - the contract returns a string variable when called.

---

```sol
function price(string calldata name) public pure returns (uint256) {
```

Looking closer at the price function, we see that it is a pure function - meaning it doesn’t read or modify contract state. It’s just a helper. Could we do it on the front-end using JavaScript etc.? Yeah, but it wouldn’t be as secure! Here, we calculate final price on-chain.

---

```sol
require(msg.value >= _price, "Not enough Matic paid");
```

Here we check if the “value” of the “msg” sent is above a certain amount. “Value” is the amount of Matic sent and “msg” is the transaction.

---

Since the MATIC token has 18 decimals, we need to put \* 10\*\*18 at the end of the prices.

---

Polygon faucet: https://faucet.polygon.technology/
Explorer: https://mumbai.polygonscan.com/
MM: https://mumbai.polygonscan.com/address/0x896629eAF8dDDFb01FF7A9022aBB834524164597
OpenSea: https://testnets.opensea.io

---

Contracts:

- https://mumbai.polygonscan.com/address/0x53fBB088BD2E2FA8993e23C33e3fA6c6D0dC69dA (buidl name service) - https://testnets.opensea.io/collection/buidl-name-service-jukwwtogvt
- https://mumbai.polygonscan.com/address/0x85075801fCE359F1d5283F70184Dd5F4804d0308 (buidlers name service) - https://testnets.opensea.io/collection/buidlers-name-service

---

Replit:

- project: https://replit.com/@yhuard/domain-starter-project
- demo: https://domain-starter-project.yhuard.repl.co/
