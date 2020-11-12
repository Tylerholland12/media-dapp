pragma solidity ^0.5.0;

contract MediaDapp {
  uint public videoCount = 0;
  string public name = "MediaDapp";
  //create public mapping for storing videos
  mapping(uint => Video) public videos;

  //Create Struct Models
  struct Video {
    uint id;
    string hash;
    string title;
    address author;

  }


  //Create Event
  event VideoUploaded(
    uint id,
    string hash,
    string title,
    address author
  );


  constructor() public {
  }

  function uploadMedia(string memory _videoHash, string memory _title) public {
    // Make sure the video hash exists
    require(bytes(_videoHash).length > 0);

    // Make sure video title exists
    require(bytes(_title).length > 0);

    // Make sure uploader address exists
    require(msg.sender!=address(0));


    // Increment video id
    videoCount ++;

    // upload video to contract
    videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);

    // Trigger an event
    emit VideoUploaded(videoCount, _videoHash, _title, msg.sender);

  }
}
