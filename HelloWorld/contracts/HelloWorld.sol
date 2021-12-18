// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {
    string private helloWorld = "Hello World!";

    function getHelloMessage() public view returns (string memory) {
        return helloWorld;
    }
}

