
export const AXIOS_GET_NOTIFICATIONS = `
  query {
    getNotifications {
      _id
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
      notificationContent
      notificationDate
    }
  }
`;

export const AXIOS_GET_NOTIFICATION = `
  query($id: ID!) {
    getNotification(id: $id) {
      _id
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
      notificationContent
      notificationDate
    }
  }
`;

export const AXIOS_GET_USER_NOTIFICATIONS = `
  query($userId: ID!) {
    getUserNotifications(userId: $userId) {
      _id
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
      notificationContent
      notificationDate
    }
  }
`;

export const AXIOS_CHECK_NOTIFICATION = `
  query($senderId: ID!, $receiverId: ID!) {
    checkNotification(senderId: $senderId, receiverId: $receiverId) {
      _id
      notificationDate
    }
  }
`;

export const AXIOS_ADD_NOTIFICATION = `
  mutation(
    $receiverId: ID!
    $senderId: ID!
    $content: String!
  ) {
    addNotification(
      receiverId: $receiverId
      senderId: $senderId
      content: $content
    ) {
      _id
      receiverId {
        _id
        name
        surname
        avatar {
          public_id
          url
        }
      }
      senderId {
        _id
        name
        surname
        avatar {
          public_id
          url
        }
      }
      notificationContent
      createdDate
    }
  }
`;

export const AXIOS_INFINITE_SCROLL_NOTIFICATIONS = `
    query(
      $pageNum: Int!,
      $pageSize: Int!,

    ) {
      infiniteScrollNotifications(
        pageNum:$pageNum
        pageSize:$pageSize
      ){
        hasMore
        notifications {
        _id
        notificationContent
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
        notificationDate
        }
      }
    }
`;

export const AXIOS_INFINITE_SCROLL_USER_NOTIFICATIONS = `
    query(
      $pageNum: Int!,
      $pageSize: Int!,
      $userId: ID!
    ) {
      infiniteScrollUserNotifications(
        pageNum:$pageNum
        pageSize:$pageSize
        userId:$userId
      ){
        hasMore
        notifications {
          _id
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
          notificationContent
          createdDate
        }
      }
    }
`;

export const AXIOS_DELETE_NOTIFICATION = `
  mutation($id: ID!) {
    deleteNotification(id: $id) {
      _id
    }
  }
`;

