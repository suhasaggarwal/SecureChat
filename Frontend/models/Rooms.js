class Room {
  constructor(
    id,
    name,
    description,
    profile_pic,
    messages,
    members,
    lastMessageReadIndex,
    isGroup
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.lastMessage = "";
    this.lastTime = "";
    this.messages = messages;
    this.profile_pic = profile_pic;
    this.members = members;
    this.lastMessageReadIndex = lastMessageReadIndex;
    this.isGroup = isGroup;
  }
  updateLastMessage(message) {
    this.lastMessage = message;
  }
  updateLastTime(time) {
    this.lastTime = time;
  }
}

export default Room;
