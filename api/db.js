let faker = require("faker");
let staticDB = require("./static-db.json");

let generateContacts = () => {
  let contacts = [];

  for (let id = 1; id <= 1000; id++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const dob = faker.date.past();
    const email = faker.internet.email();
    const phoneDetails = {
      phoneNumber: faker.random.number({ min: 1000000000, max: 9999999999 }),
      countryCode: getRandomPhoneCode()
    };
    const city = faker.address.city();
    const state = faker.address.state();
    const country = faker.address.countryCode();

    // email.emailId = faker.internet.email();
    // phone.countryCode = getRandomPhoneCode();
    // phone.phoneNumber = faker.random.number("##########");
    contacts.push({
      id,
      firstName,
      lastName,
      dob,
      email,
      phoneDetails,
      city,
      state,
      country
    });
  }

  return { ...staticDB, contacts: contacts };
};

module.exports = generateContacts;

const getRandomPhoneCode = () => {
  const phones = staticDB.phones;
  return phones[Math.floor(Math.random() * phones.length)].phoneCode;
};
