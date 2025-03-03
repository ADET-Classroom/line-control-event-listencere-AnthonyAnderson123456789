// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

// import {Ownable} from "@openzeppelin/contracts@5.2.0/access/Ownable.sol";

contract LineControl {


    string[] public currentStudents;

    event StudentsComing(uint currentStudentCount);

    event TooSmall(string message);


    constructor() {}

    function compareStrings(string memory a, string memory b)internal pure returns (bool){
        bytes32 hash1 = keccak256(abi.encodePacked(a));
        bytes32 hash2 = keccak256(abi.encodePacked(b));
        return hash1 == hash2;

    }


    function sendStudents (string[] memory _studentIds) public{

        for (uint256 i = 0; i < _studentIds.length; i++){
            currentStudents.push(_studentIds[i]);
        }
        
        emit StudentsComing(currentStudents.length);
    }

    function finalize(string memory student) public {
        if (currentStudents.length < 2){
            emit TooSmall("Not enough students");
            return;
        }else{
            for (uint256 i = 0; i < currentStudents.length; i++ ) { 
                bool result = compareStrings(currentStudents[i], student);
                if(result == true){
                    delete (currentStudents[i]);
                    currentStudents[i] = currentStudents[currentStudents.length - 1];
                    currentStudents.pop();
                }
        }
    }

}
}