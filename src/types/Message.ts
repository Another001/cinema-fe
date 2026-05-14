export interface MessageGetRes{
  messageId: number,
  message: string,
  createdAt: string,
  senderId: number,
}

export interface ContactGetResDTO{
  conversationId: number,
  nameContact: string,
  previewMessage: PreviewMessageResDTO
}

export interface UserGetResDTO{
  userId: number,
  phoneNumber: string,
  name: string,
}

export interface PreviewMessageResDTO{
  lastMessageId: number
  lastMessage: string,
  senderName: string,
  senderId: number,
  timeLastMessage: string,
  isSeen: boolean
}

export interface MessageSeenStatus{
  userId: number,
  lastSeenMessage: number
}

export interface UpdateSideBar{
  conversationId: number,
  lastMessage: string,
  lastMessageId: number,
  senderId: number,
  createdAt: string,
}