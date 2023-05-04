
export const AXIOS_GET_USERS = `
    query {
      getUsers {
        _id
        name
        surname
        email
        company {
          _id
          name
          description
        }
        service {
          _id
          name
          description
        }
        avatar {
          public_id
          url
        }
      }
    }
    `;

export const AXIOS_GET_USER = `
    query($userId: ID!) {
      getUser(userId: $userId) {
        _id
        ifunumber
        email
      }
    }
    `;

export const AXIOS_GET_USER_CONF = `
    query($userId: ID!) {
      getGetLoad(userId: $userId) {
        uuid
        crackload
        email
        load
      }
    }
    `;

export const AXIOS_VERIFY_USER_TOKEN = `
    query($token: String) {
      verifyUserToken(token: $token) {
        _id
        userId {
          _id
          name
          surname
          email
          avatar {
            public_id
            url
          }
        }
        token
      }
    }
    `;

export const AXIOS_GET_A_COMPANY_USERS = `
    query($companyId: ID!) {
      getACompanyUsers(companyId: $companyId) {
        _id
        name
        surname
        email
        company {
          _id
          name
          description
        }
        avatar {
          public_id
          url
        }
        favorites {
          _id
          title
          imageUrl
        }
        favoritesLikes {
          _id
          title
          description
          image {
            public_id
            url
          }
        }
        favoritesInterested {
          _id
          title
          description
          image {
            public_id
            url
          }
        }
      }
    }
`;

export const AXIOS_REFRESH_TOKEN = `
    mutation($access_token: String!, $refresh_token: String!) {
      refreshToken(access_token: $access_token, refresh_token: $refresh_token) {
        access_token
        refresh_token
      }
    }
`;

export const AXIOS_LOGIN_USER = `
    mutation($ifunumber: String!, $password: String!, $rememberMe: Boolean) {
      loginUser(
        ifunumber: $ifunumber
        password: $password
        rememberMe: $rememberMe
      ) {
        token
        user {
          _id
          ifuId {
            _id
          }
          ifunumber
          phonenumber
          email
          properties {
            _id
            name
            description
          }
          isActivated
        }
      }
    }
    `;

export const AXIOS_REGISTER_USER = `
    mutation($ifunumber: String!, $phonenumber: String!, $email: String, $password: String!, $isActivated: Boolean ) {
      registerUser(
        ifunumber: $ifunumber
        phonenumber: $phonenumber
        email: $email
        password: $password
        isActivated: $isActivated
      ) {
        ifunumber
        phonenumber
        email
        token
      }
    }
`;

export const AXIOS_VALID_ACCOUNT = `
    mutation($userId: ID!, $code: String!, isActivated: Boolean ) {
      registerUser(
        userId: $userId
        isActivated: $isActivated
      ) {
        token
        user {
          _id
          ifuId {
            _id
          }
          ifunumber
          phonenumber
          email
          properties {
            _id
            name
            description
          }
          isActivated
        }
      }
    }
`;

export const AXIOS_VERIFY_USER_REGISTER_ACCOUNT = `
    mutation($userId: ID!, $token: String!, $isActivated: Boolean) {
      verifyUserRegisterAccount(
        userId: $userId
        token: $token
        isActivated: $isActivated
      ) {
        token
      }
    }
    `;

export const AXIOS_UPDATE_USER = `
    mutation($userId: ID!, $name: String!, $surname: String!, $sex: String, $bornDate: String, $service: ID, $fonction: String, $department: String, $hobbies: [String], $workTasks: String, $address: String, $nationality: String, $langues: [String], $photo: String) {
      updateUser(
        userId: $userId
        name: $name
        surname: $surname
        sex: $sex
        bornDate: $bornDate
        service: $service
        fonction: $fonction
        department: $department
        hobbies: $hobbies
        workTasks: $workTasks
        address: $address
        nationality: $nationality
        langues: $langues
        photo: $photo
      ) {
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
          name
          description
        }
        department
        nationality
        langues
        fonction
        address
        hobbies
        service {
          _id
          name
          description
        }
        favorites {
          _id
          title
            imageUrl
        }
        favoritesLikes {
          _id
          title
          description
            image {
              public_id
              url
            }
        }
        favoritesInterested {
          _id
          title
          description
            image {
              public_id
              url
            }
        }
      }
    }
    `;

export const AXIOS_GET_CURRENT_USER = `
    query {
      getCurrentUser {
        _id
        name
        surname
        sex
        email
        company {
          _id
          name
          description
        }
        address
        fonction
        service {
          _id
          name
          description
        }
        department
        statut
        langues
        nationality
        hobbies
        avatar {
          public_id
          url
        }
        favorites {
          _id
          title
          imageUrl
        }
        favoritesLikes {
          _id
          title
          description
          image {
            public_id
            url
          }
        }
        favoritesInterested {
          _id
          title
          description
          image {
            public_id
            url
          }
        }
        events {
          _id
          title
          image {
            public_id
            url
          }
        }
        joinDate
      }
    }
    `;

export const AXIOS_SEARCH_USERS = `
  query($searchTerm: String) {
    searchUsers(searchTerm: $searchTerm) {
      _id
      name
      surname
      email
      company {
        _id
      }
      avatar {
        public_id
        url
      }
    }
  }
`;
