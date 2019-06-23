let faker = require("faker");
let staticDB = require("./static-db.json");

let generateContacts = () => {
  let contacts = [];

  for (let id = 0; id < 30; id++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let phone = faker.phone.phoneNumber();

    contacts.push({
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone
    });
  }

  return { ...staticDB, contacts: contacts };
};

module.exports = generateContacts;
