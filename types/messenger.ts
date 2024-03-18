export type ChatResponse = {
  room: string;
  messages: Chat[];
};

export type Chat = {
  senderId: number;
  recipientId: number;
  content: string;
  isImage: boolean;
};

export type ChatCommunicate = {
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
