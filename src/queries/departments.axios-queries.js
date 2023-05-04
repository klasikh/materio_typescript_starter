
// DEPARTMENTS QUERIES
export const AXIOS_GET_DEPARTMENTS = `
  query {
    getDepartments {
      _id
      name
      description
    }
  }
`;

export const AXIOS_GET_TAXTYPES = `
  query {
    getTaxTypes {
      _id
      name
      description
    }  
  }
`;

export const AXIOS_GET_PLACECHIEFS_BY_DEPARTMENTS = `
query($departmentId: ID!){
  getPlaceChiefsByDepartementId(departmentId: $departmentId)   {
      _id
      name
      description
  }
}
`;

export const AXIOS_GET_NEIGHBORHOODS_BY_PLACECHIEDID = `
query($placeChiefId: ID!){
  getNeighborhoodsByPlaceChiefId(placeChiefId: $placeChiefId)   {
      _id
      name
      description
  }
}
`;

export const AXIOS_GET_TAXCENTERS_BY_NEIGHBORDHOODID = `
query($neighborhoodId: ID!){
  getTaxCentersByNeighborhoodId(neighborhoodId: $neighborhoodId)   {
      _id
      name
      description
  }
}
`;

export const AXIOS_CHECK_DEPARTMENT = `
query($name: String!){
  checkCompany(name: $name)   {
      _id
      name
      description
      services {
        _id
        name
        description
      }
      createdDate
      adminId {
        _id
        name
        surname
        email
        avatar 
      }
  }
}
`;

export const AXIOS_INFINITE_SCROLL_DEPARTMENTS = `
  query(
    $pageNum: Int!,
    $pageSize: Int!

  ) {
    infiniteScrollCompanies(
      pageNum:$pageNum,
      pageSize:$pageSize
    ){
      hasMore
      companies {
        _id
        name
        description
        services {
          _id
          name
          description
        }
        createdDate
        adminId {
          _id
          name
          surname
          avatar
        }
      }
    }
  }
`;


export const AXIOS_SEARCH_DEPARTMENTS = `
  query($searchTerm: String) {
    searchCompanies(searchTerm: $searchTerm) {
      _id
      name
      description
      services {
        _id
        name
        description
      }
      adminId {
        _id
        name
        surname
        avatar 
      }
    }
  }
`;

export const AXIOS_SEARCH_ANY_ON_COLLEAGUES = `
  query($pageNum: Int!, $pageSize: Int!, $searchTerm: String, $companyId: ID) {
    searchAnyOnCompany(pageNum:$pageNum, pageSize:$pageSize, searchTerm: $searchTerm, companyId: $companyId) {
      searchColleaguesResults {
        _id
        name
        surname
        email
        sex
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
        fonction
        statut
        department
        nationality
        avatar {
          public_id
          url
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
      searchEventsResults {
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
      hasMoreUsers
      hasMoreEvents
    }
  }
`;