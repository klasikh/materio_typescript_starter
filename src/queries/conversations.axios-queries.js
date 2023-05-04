
export const AXIOS_GET_CONVERSATIONS = `
  query {
    getConversations {
      _id
      creatorUser {
        _id
        name
        surname
        avatar {
            public_id
            url
          }
      }
      targetUser {
        _id
        name
        surname
        avatar {
            public_id
            url
          }
      }
      messages {
        senderId {
          _id
          name
          surname
          avatar {
            public_id
            url
          }
        }
        receiverId {
          _id
          name
          surname
          avatar {
            public_id
            url
          }
        }
        messageContent
        messageDate
      }
    }
  }
`;

export const AXIOS_GET_CONVERSATION = `
  query($id: ID!) {
    getConversation(id: $id) {
      _id
      creatorUser {
        _id
        name
        surname
        avatar {
            public_id
            url
          }
      }
      targetUser {
        _id
        name
        surname
        avatar {
            public_id
            url
          }
      }
      messages {
        _id
        messageDate
        senderId {
          _id
          name
          surname
          avatar {
            public_id
            url
          }
        }
        receiverId {
          _id
          name
          surname
          avatar {
            public_id
            url
          }
        }
        messageContent
      }
    }
  }
`;

export const AXIOS_GET_USER_CONVERSATIONS = `
  query($userId: ID!) {
    getUserConversations(userId: $userId) {
      _id
      creatorUser {
        _id
        name
        surname
        avatar {
            public_id
            url
          }
      }
      targetUser {
        _id
        name
        surname
        avatar {
            public_id
            url
          }
      }
      messages {
        _id
        messageDate
        senderId {
          _id
          name
          surname
          avatar {
            public_id
            url
          }
        }
        receiverId{
          _id
          name
          surname
          avatar {
            public_id
            url
          }
        } 
        messageContent
      }
    }
  }
`;

export const AXIOS_CHECK_CONVERSATION = `
  query($creatorId: ID!, $targetId: ID!) {
    checkConversation(creatorId: $creatorId, targetId: $targetId) {
      _id
      createdDate
    }
  }
`;

export const AXIOS_ADD_CONVERSATION = `
  mutation(
    $creatorUser: ID!
    $targetUser: ID!
  ) {
    addConversation(
      creatorUser: $creatorUser
      targetUser: $targetUser
    ) {
      _id
      creatorUser {
        _id
        name
        surname
        avatar {
            public_id
            url
          }
      }
      targetUser {
        _id
        name
        surname
        avatar {
            public_id
            url
          }
      }
      createdDate
    }
  }
`;

export const AXIOS_ADD_NEW_MESSAGE_TO_CONVERSATION = `
  mutation(
    $messageContent: String!
    $senderId: ID!
    $receiverId: ID!
    $conversationId: ID!
  ) {
    addNewMessageToConversation(
      messageContent: $messageContent
      senderId: $senderId
      receiverId: $receiverId
      conversationId: $conversationId
    ) {
      _id
      messageContent
      senderId {
        _id
        name
        surname
        avatar {
            public_id
            url
          }
      }
      receiverId {
        _id
        name
        surname
        avatar {
            public_id
            url
          }
      }
      messageDate
    }
  }
`;

export const AXIOS_INFINITE_SCROLL_CONVERSATIONS = `
    query(
      $pageNum: Int!,
      $pageSize: Int!,

    ) {
      infiniteScrollConversations(
        pageNum:$pageNum
        pageSize:$pageSize
      ){
        hasMore
        conversations {
          _id
          creatorUser {
            _id
            name
            surname
            avatar {
            public_id
            url
          }
          }
          targetUser {
            _id
            name
            surname
            avatar {
            public_id
            url
          }
          }
          messages {
            _id
            messageContent
            senderId {
              _id
              name
              surname
              avatar {
            public_id
            url
          }
            }
            receiverId {
              _id
              name
              surname
              avatar {
            public_id
            url
          }
            }
            messageDate
          }
          createdDate
        }
      }
    }
`;

export const AXIOS_INFINITE_SCROLL_USER_CONVERSATIONS = `
    query(
      $pageNum: Int!,
      $pageSize: Int!,
      $userId: ID!
    ) {
      infiniteScrollUserConversations(
        pageNum:$pageNum
        pageSize:$pageSize
        userId:$userId
      ){
        hasMore
        conversations {
          _id
          creatorUser {
            _id
            name
            surname
            avatar {
            public_id
            url
          }
          }
          targetUser {
            _id
            name
            surname
            avatar {
            public_id
            url
          }
          }
          createdDate
        }
      }
    }
`;

export const AXIOS_INFINITE_SCROLL_CONVERSATION_MESSAGES = `
    query(
      $pageNum: Int!,
      $pageSize: Int!,
      $id: ID!
    ) {
      infiniteScrollConversationMessages(
        pageNum:$pageNum
        pageSize:$pageSize
        id:$id
      ){
        hasMore
        conversationMessages {
          _id
          messages {
            _id
            messageContent
            senderId {
              _id
              name
              surname
              avatar {
            public_id
            url
          }
            }
            receiverId {
              _id
              name
              surname
              avatar {
            public_id
            url
          }
            }
            messageDate
          }
        }
      }
    }
`;

export const AXIOS_DELETE_CONVERSATION = `
  mutation($id: ID!) {
    deleteConversation(id: $id) {
      _id
    }
  }
`;

export const AXIOS_USER_TYPING_MUTATION = `
  mutation($email: String!, $receiverId: ID!) {
    userTyping(email: $email, receiverId: $receiverId)
  }
`;

export const AXIOS_CONVERSATION_SUBSCRIPTION = `
  subscription($receiverMail: String!) {
    newMessage(receiverId: $receiverId) {
      messageContent
      senderId {
        _id
        name
        surname
        avatar {
            public_id
            url
          }
      }
      receiverId {
        _id
        name
        surname
        avatar {
            public_id
            url
          }
      }
      _id
      users {
        name
        surname
        email
      }
    }
  }
`;

export const AXIOS_USER_TYPING_SUBSCRIPTION = `
  subscription($receiverId: String!) {
    userTyping(receiverMail: $receiverId)
  }
`;

