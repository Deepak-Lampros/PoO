// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./PooCertificateToken.sol";

contract Poo is PooCertificateToken{

    struct user{
        string name;
        string email;
        string profile_url;
    }

    mapping(address=>user) public userData;

    function registerUser(string memory _name,string memory _email,string memory _profile_url ) public {
        
        userData[msg.sender] = user(_name,_email,_profile_url);
    }

    function getUser() public view returns(user memory){
        return userData[msg.sender];
    }

   function UpdateProfileUrl(string memory _profile_url) public {
       userData[msg.sender].profile_url = _profile_url;
   }

    function Updatename(string memory _name) public {
       userData[msg.sender].name = _name;
   }

   function updateEmail(string memory _email) public {
       userData[msg.sender].email = _email;
   }

}