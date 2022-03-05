# Notes

Function definition:

```sol
function getAddress(string calldata name) public view returns (address) {
```

- `calldata` - this indicates the “location” of where the name argument should be stored. Since it costs real money to process data on the blockchain, Solidity lets you indicate where reference types should be stored. `calldata` is non-persistent and can’t be modified. We like this because it takes the least amount of gas!
- `public` - this is a visibility modifier. We want our function to be accessible by everyone, including other contracts.
- `view` - this just means that the function is only viewing data on the contract, not modifying it.
- `returns (string)` - the contract returns a string variable when called.
