const fs = require("fs/promises");

const path = require("path");

const contactPath = path.join(__dirname, "/db/contacts.json");

const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const findContact = allContacts.find((el) => el.id === contactId);
  return findContact || null ;
};


const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
