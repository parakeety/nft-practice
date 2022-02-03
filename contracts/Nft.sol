//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract Nft is ERC721PresetMinterPauserAutoId {
  address proxyRegistryAddress;

  constructor(
    address _proxyRegistryAddress,
    string memory _name,
    string memory _symbol,
    string memory _baseTokenURI
  )
  ERC721PresetMinterPauserAutoId(_name, _symbol, _baseTokenURI)
  {
    proxyRegistryAddress = _proxyRegistryAddress;
  }

  function isApprovedForAll(address _owner, address _operator)
  public override view returns (bool)
  {
    ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
    if (address(proxyRegistry.proxies(_owner)) == _operator) {
      return true;
    }

    return super.isApprovedForAll(_owner, _operator);
  }
}
