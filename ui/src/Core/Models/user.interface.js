export class UserDetailsI {
  constructor(data = {}) {
    Object.assign(
      this,
      {
        id: null,
        username: '',
        firstname: 'John',
        lastname: 'Doe',
        levelAuth: "EE",
        email: 'johnDoe@mailinator.com',
        personalDiscount: 0,
        address: {
          address: null,
          address1: null,
          address2: null,
          country: null,
          phone: null,
          postcode: null,
          town: null,
        },
      },
      data
    );
  }
}

export class UserResponseI {
  constructor(
    displayedRows = 0,
    firstRowOnPage = 1,
    lastRowOnPage = 0,
    page = 1,
    pages = 0,
    perPage = 25,
    results = [],
    rows = 0,
    sortBy = {}
  ) {}
}
