// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

/*
  Keeps track of addresses on the blockchain.
*/

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor() {
    owner = msg.sender;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
