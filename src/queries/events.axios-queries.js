
export const AXIOS_GET_EVENTS = `
    query {
      getEvents {
        _id
        title
        image {
          public_id
          url
        }
        categories
        description
        startDate
        startTime
        endTime
        attendees {
          _id
          name
          surname
          email
          avatar {
            public_id
            url
          }
        }
        attendeesServices {
          _id
          name
          description
        }
        type
        place
        mapLocationObject {
          lat
          lng
        }
        coCreators
        displayGuests
        likes
        interested
        createdDate
        isPublished
        isShared
        userId {
          _id
          name
          surname
          email
          avatar {
            public_id
            url
          }
          company {
            _id
          }
        }
        companyId {
            _id
            name
            description
          }
      }
    }
`;

export const AXIOS_GET_EVENT = `
    query($eventId: ID!){
      getEvent(eventId: $eventId) {
          _id
          title
          image {
            public_id
            url
          }
          categories
          description
          startDate
          startTime
          endTime
          attendees {
            _id
            name
            surname
            email
            avatar {
              public_id
              url
            }
          }
          attendeesServices {
            _id
            name
            description
          }
          type
          place
          mapLocationObject {
            lat
            lng
          }
          coCreators
          displayGuests
          likes
          interested
          createdDate
          isPublished
          isShared
          userId {
            _id
            name
            surname
            email
            avatar {
              public_id
              url
            }
            company {
              _id
            }
          }
          companyId {
            _id
            name
            description
          }
          messages {
            _id
            messageBody
            messageDate
            messageUser {
              _id
              name
              surname
              avatar {
                public_id
                url
              }
            }
          }
      }
    }
`;

export const AXIOS_ADD_EVENT = `
    mutation(
      $title: String!,
      $file: String,
      $categories: [String]!,
      $description: String,
      $startDate: String!,
      $startTime: String!,
      $endTime: String,
      $attendees: [ID],
      $attendeesServices: [ID],
      $type: String,
      $place: String,
      $coCreators: [String],
      $displayGuests: String,
      $userId: ID!
      $companyId: ID!
    ) {
      addEvent(
        title:$title
        file:$file
        categories:$categories
        description:$description
        startDate:$startDate
        startTime:$startTime
        endTime:$endTime
        attendees:$attendees
        attendeesServices:$attendeesServices
        type:$type
        place:$place
        coCreators:$coCreators
        displayGuests:$displayGuests
        userId:$userId
        companyId:$companyId
      ){
        _id
        title
        image {
          public_id
          url
        }
        categories
        description
        startDate
        startTime
        endTime
        type
        place
        mapLocationObject {
          lat
          lng
        }
        coCreators
        displayGuests
        likes
        interested
        isPublished
        isShared
        companyId {
          _id
        }
      }
    }
`;

export const AXIOS_UPDATE_USER_EVENT = `
  mutation(
    $eventId: ID!,
    $userId: ID!,
    $title: String!,
    $file: String,
    $categories: [String]!,
    $description: String,
    $startDate: String!,
    $startTime: String!,
    $endTime: String,
    $attendees: [ID],
    $attendeesServices: [ID],
    $type: String,
    $place: String,
    $coCreators: [String],
    $displayGuests: String,
    $companyId: ID!
  ) {
    updateUserEvent(
      eventId: $eventId
      userId: $userId
      title:$title
      file:$file
      categories:$categories
      description:$description
      startDate:$startDate
      startTime:$startTime
      endTime:$endTime
      attendees:$attendees
      attendeesServices:$attendeesServices
      type:$type
      place:$place
      coCreators:$coCreators
      displayGuests:$displayGuests
      companyId:$companyId
    ) {
      _id
      title
      image {
        public_id
        url
      }
      categories
      description
      startDate
      startTime
      endTime
      attendees {
        _id
      }
      attendeesServices {
        _id
      }
      type
      place
      mapLocationObject {
        lat
        lng
      }
      coCreators
      displayGuests
      createdDate
      likes
      interested
      isPublished
      isShared
      userId {
        _id
        company {
          _id
        }
        avatar {
          public_id
          url
        }
      }
      companyId {
        _id
      }
    }
  }
`;

export const AXIOS_ADD_EVENT_MESSAGE = `
  mutation($messageBody: String!, $userId: ID!, $eventId: ID!) {
    addEventMessage(
      messageBody: $messageBody,
      userId: $userId,
      eventId: $eventId
    ) {
      _id
      messageBody
      messageDate
      messageUser {
        _id
        name
        surname
        avatar {
          public_id
          url
        }
      }
    }
  }
`;

export const AXIOS_INFINITE_SCROLL_EVENTS = `
    query(
      $pageNum: Int!,
      $pageSize: Int!,
    ) {
      infiniteScrollEvents(
        pageNum:$pageNum,
        pageSize:$pageSize,
      ){
        hasMore
        events {
          _id
          title
          image {
            public_id
            url
          }
          categories
          description
          startDate
          startTime
          endTime
          attendees {
            _id
            name
            surname
            email
            avatar {
              public_id
              url
            }
          }
          attendeesServices {
            _id
            name
            description
          }
          type
          place
          mapLocationObject {
            lat
            lng
          }
          coCreators
          displayGuests
          likes
          interested
          createdDate
          isPublished
          isShared
          messages {
            _id
          }
          userId {
            _id
            name
            surname
            avatar {
              public_id
              url
            }
            company {
              _id
            }
          }
          companyId {
            _id
            name
            description
          }
        }
      }
    }
`;

export const AXIOS_INFINITE_SCROLL_USER_EVENTS = `
    query(
      $pageNum: Int!,
      $pageSize: Int!,
      $userId: ID!
    ) {
      infiniteScrollUserEvents(
        pageNum:$pageNum,
        pageSize:$pageSize,
        userId: $userId
      ){
        hasMore
        events {
          _id
          title
          image {
            public_id
            url
          }
          categories
          description
          startDate
          startTime
          endTime
          attendees {
            _id
            name
            surname
            email
            avatar {
              public_id
              url
            }
          }
          attendeesServices {
            _id
            name
            description
          }
          type
          place
          mapLocationObject {
            lat
            lng
          }
          coCreators
          displayGuests
          likes
          interested
          createdDate
          isPublished
          isShared
          messages {
            _id
          }
          userId {
            _id
            name
            surname
            company {
              _id
            }
            avatar {
              public_id
              url
            }
          }
          companyId {
            _id
            name
            description
          }
        }
      }
    }
`;

export const AXIOS_INFINITE_SCROLL_COMPANY_EVENTS = `
    query(
      $pageNum: Int!,
      $pageSize: Int!,
      $companyId: ID!,
      $isPublished: Int!,
    ) {
      infiniteScrollCompanyEvents(
        pageNum:$pageNum,
        pageSize:$pageSize,
        companyId: $companyId,
        isPublished: $isPublished,
      ){
        hasMore
        events {
          _id
          title
          image {
            public_id
            url
          }
          categories
          description
          startDate
          startTime
          endTime
          attendees {
            _id
            name
            surname
            email
            avatar {
              public_id
              url
            }
          }
          attendeesServices {
            _id
            name
            description
          }
          type
          place
          mapLocationObject {
            lat
            lng
          }
          coCreators
          displayGuests
          likes
          interested
          createdDate
          isPublished
          isShared
          messages {
            _id
          }
          userId {
            _id
            name
            surname
            company {
              _id
            }
            avatar {
              public_id
              url
            }
          }
          companyId {
            _id
            name
            description
          }
        }
      }
    }
`;

export const AXIOS_SEARCH_EVENTS = `
  query($searchTerm: String) {
    searchEvents(searchTerm: $searchTerm) {
      _id
      title
      description
      startDate
      startTime
      endTime
      coCreators
      displayGuests
      image {
        public_id
        url
      }
      likes
      interested
      isPublished
      isShared
    }
  }
`;

export const AXIOS_GET_USER_EVENTS = `
  query($userId: ID!) {
    getUserEvents(userId: $userId) {
      _id
      title
      image {
        public_id
        url
      }
      description
      startDate
      startTime
      endTime
      attendees {
        _id
        name
        surname
        email
        avatar {
          public_id
          url
        }
      }
      attendeesServices {
        _id
        name
        description
      }
      type
      place
      mapLocationObject {
        lat
        lng
      }
      coCreators
      displayGuests
      categories
      createdDate
      likes
      interested
      isPublished
      isShared
    }
  }
`;

export const AXIOS_GET_USER_PUBLISHED_EVENTS = `
  query($userId: ID!) {
    getUserPublishedEvents(userId: $userId) {
      _id
      title
      image {
        public_id
        url
      }
      description
      startDate
      startTime
      endTime
      attendees {
        _id
        name
        surname
        email
        avatar {
          public_id
          url
        }
      }
      attendeesServices {
        _id
        name
        description
      }
      type
      place
      mapLocationObject {
        lat
        lng
      }
      coCreators
      displayGuests
      categories
      createdDate
      likes
      interested
      isPublished
      isShared
    }
  }
`;

export const AXIOS_GET_COMPANY_EVENTS_PUSBLISHED = `
  query($companyId: ID!, $isPublished: Int!) {
    getCompanyEventsPublished(companyId: $companyId, isPublished: $isPublished) {
      _id
      title
      image {
        public_id
        url
      }
      description
      startDate
      startTime
      endTime
      attendees {
        _id
        name
        surname
        email
        avatar {
          public_id
          url
        }
      }
      attendeesServices {
        _id
        name
        description
      }
      type
      place
      mapLocationObject {
        lat
        lng
      }
      coCreators
      displayGuests
      categories
      createdDate
      likes
      interested
      isPublished
      isShared
    }
  }
`;

export const AXIOS_GET_COMPANY_EVENTS_PUBLISHED_FOR_CALENDAR = `
  query($companyId: ID!, $isPublished: Int!) {
    getCompanyEventsPublishedForCalendar(companyId: $companyId, isPublished: $isPublished) {
      _id
      title
      # startDate
      date
      # startTime
      # endTime
      start
      end
      attendees {
        _id
        name
        surname
      }
      attendeesServices {
        _id
        name
      }
      type
      categories
      userId {
        _id
        name
        surname
        company {
          _id
        }
        avatar {
          public_id
          url
        }
      }
      companyId {
        _id
        name
        description
      }
      createdDate
      likes
      interested
    }
  }
`;

export const AXIOS_INTERESTED_EVENT = `
    mutation($eventId: ID!, $userId: ID!) {
      interestedEvent(
        eventId: $eventId
        userId: $userId
      ) {
        interested
        favoritesInterested {
          _id
          title
          description
          interested
          image {
            public_id
            url
          }
        }
      }
    }
    `;

export const AXIOS_UNINTERESTED_EVENT = `
    mutation($eventId: ID!, $userId: ID!) {
      unInterestedEvent(
        eventId: $eventId
        userId: $userId
      ) {
        interested
        favoritesInterested {
          _id
          title
          description
          interested
          image {
            public_id
            url
          }
        }
      }
    }
`;

export const AXIOS_LIKE_EVENT = `
    mutation($eventId: ID!, $userId: ID!) {
      likeEvent(
        eventId: $eventId
        userId: $userId
      ) {
        likes
        favoritesLikes {
          _id
          title
          description
          likes
          image {
            public_id
            url
          }
        }
      }
    }
    `;

export const AXIOS_UNLIKE_EVENT = `
    mutation($eventId: ID!, $userId: ID!) {
      unLikeEvent(
        eventId: $eventId
        userId: $userId
      ) {
        likes
        favoritesLikes {
          _id
          title
          description
          likes
          image {
            public_id
            url
          }
        }
      }
    }
`;

export const AXIOS_PUBLISH_USER_EVENT = `
  mutation(
    $eventId: ID!,
    $userId: ID!,
    $isPublished: Int!,
  ) {
    publishUserEvent(
      eventId: $eventId,
      userId: $userId,
      isPublished: $isPublished
    ) {
      isPublished
      events {
        _id
        title
        image {
          public_id
          url
        }
      }
    }
  }
`;

export const AXIOS_DELETE_USER_EVENT = `
  mutation($eventId: ID!) {
    deleteUserEvent(eventId: $eventId) {
      _id
    }
  }
`;
