let faker = require("faker");
let staticDB = require("./static-db.json");

let generateContacts = () => {
  let contacts = [];

  for (let id = 1; id <= 1000; id++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let dob = faker.date.past();
    let email = faker.internet.email();
    let phone = faker.phone.phoneNumber();
    let city = faker.address.city();
    let state = faker.address.state();
    let country = faker.address.countryCode();

    contacts.push({
      id,
      firstName,
      lastName,
      dob,
      email,
      phone,
      city,
      state,
      country
    });
  }

  return { ...staticDB, contacts: contacts };
};

module.exports = generateContacts;
