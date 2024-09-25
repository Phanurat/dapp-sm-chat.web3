// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChatDapp {
    struct Message {
        address sender;
        string content;
        uint256 timestamp;
    }

    Message[] public messages;

    // Event to emit whenever a new message is sent
    event NewMessage(address indexed sender, string content, uint256 timestamp);

    // Function to send a message
    function sendMessage(string memory _content) public {
        messages.push(Message(msg.sender, _content, block.timestamp));
        emit NewMessage(msg.sender, _content, block.timestamp);
    }

    // Function to get all messages
    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }
}
