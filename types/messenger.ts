export type ChatResponse = {
  room: string;
  messages: Chat[];
};

export type Chat = {
  messageId: number;
  senderId: number;
  recipientId: number;
  content: string;
  isImage: boolean;
};

export type ChatCommunicate = {
  room: string;
  senderId: number;
  receiverId: number;
  content: string;
  isImage: boolean;
};

export type ChatCard = {
  latestMessage: string;
  latestMessageAt: Date;
  receiverId: number;
  receiverAvatar: string;
  receiverName: string;
};
