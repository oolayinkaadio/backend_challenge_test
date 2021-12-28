

class PhoneBook {
  constructor() {
    this.contacts = [];
  }

  searchContact(searchValue) {
    let fetchContact = `Sorry, ${searchValue} does not exist`;
 
    for (let i = 0; i < this.contacts.length; i++) {
      const contact = this.contacts[i];
      if (contact['name'] === searchValue) fetchContact = {contact, i};
      if(contact['phoneNumber'] === searchValue) fetchContact = {contact, i}; 
      if(contact['email'] === searchValue) fetchContact = {contact, i};
    }
    
    return fetchContact;
  }

  validateNewContact(name, phoneNumber, email) {
    // validate the numbers as nigerian phone number
    const validatePhone = /((^090)([1-9]))|((^070)([1-9]))|((^080)([2-9]))|((^081)([0-9]))(\d{7})/.test(phoneNumber);

    // validate email
    const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());

    if (validatePhone === false || validateEmail === false) {
      return {error: `${name} has an invalid phone number or email`};
    }
  }

  addContact(name, phoneNumber, email) {
    const newContact = {
      name,
      phoneNumber,
      email,
      dateCreated: new Date().toISOString()
    };

    // validate contact
    const validate = this.validateNewContact(name, phoneNumber, email);

    // THROWS ERROR AND ENDS THE PROGRAM
    // if (validate && validate.error) throw new Error(validate.error);

    // LOGS ERROR TO CONSOLE
    if (validate && validate.error) return console.log(validate.error);

    // check if contact already exists
    this.contacts.forEach(contact => {
      // THROWS ERROR AND ENDS THE PROGRAM
      if(newContact['name'] === contact['name'] || newContact['phoneNumber'] === contact['phoneNumber'] || newContact['email'] === contact['email']) throw new Error('Contact already exists');

    });
  
    this.contacts.push(newContact);
    console.log(`${newContact.name} added successfully`);
  }

  getAContact(searchValue) {
    const searchData = this.searchContact(searchValue);
    if (typeof searchData !== 'string') return searchData.contact;
    return searchData;
  }
  
  deleteAContact(contact) {
    const searchData = this.searchContact(contact);

    if (typeof searchData !== 'string') {
      const indexOfContactToBeDeleted = searchData.i;
      const deletedContact = this.contacts.splice(indexOfContactToBeDeleted, 1);
      
      const {name} = deletedContact[0];
      return `${name} deleted successfully`;
    }
    return searchData;
  }

  getAllContact() {
    return this.contacts;
  }
}

const sola = new PhoneBook();

console.log('::::::::::ADD CONTACT::::::');
// ADD CONTACT [can only add new contacts with unique name, email and phone number]
sola.addContact('Dolapo', '08024460117', 'dolapo@gmail.com'); // added successfully
sola.addContact('Toyin', '08024460115', 'toyin@gmail.com'); // added successfully
sola.addContact('Oba', '08024460116', 'oba@gmail.com'); // added successfully
sola.addContact('Tola', 2345, 'Tola@gmail.com'); // returns error due to invalid phone number
sola.addContact('Tosin', '08024460143', 'tosingmail.com'); // returns error due to invalid email
// sola.addContact('Dolapo', '08024460117', 'dolapo@gmail.com'); // throws error due to existing contact with the same name, phone number and email
console.log(`:::::::::END OF ADDING CONTACT::::::::`);

// GET A CONTACT
console.log(`\n\n`);
console.log('::::::::GETTING CONTACTS::::::::::');
console.log('GET A CONTACT WITH IT\'S NAME:');
console.log(sola.getAContact('Dolapo')); // return contact that matches the name
console.log(`\n`);

console.log('GET A CONTACT WITH IT\'S PHONE NUMBER:');
console.log(sola.getAContact('08024460115')); // return contact that matches the phone number
console.log(`\n`);

console.log('GET A CONTACT WITH IT\'S EMAIL:');
console.log(sola.getAContact('oba@gmail.com')); // return contact that matches the email
console.log(`\n`);

console.log('GET A CONTACT THAT DOES NOT EXIST');
console.log(sola.getAContact('Olowo')); // returns error when contact does not exist
console.log(`:::::::END OF GETTING CONTACTS:::::::`);
console.log(`\n\n`);

// GET ALL CONTACTS
console.log(':::::::GET ALL CONTACTS::::::');
console.log(sola.contacts);
console.log(`\n\n`);


// DELETE A CONTACT
console.log(':::::::::::::::::DELETE::::::::::::');

console.log('DELETE A CONTACT WITH IT\'S PHONE NUMBER:');
console.log(sola.deleteAContact('08024460115')); // returns success message
console.log(`\n`);

console.log('DELETE A CONTACT WITH IT\'S EMAIL:');
console.log(sola.deleteAContact('oba@gmail.com')); // returns success message
console.log(`\n`);

console.log('DELETE A CONTACT THAT DOES NOT EXIST:');
console.log(sola.deleteAContact('Sam')); // Sam does not exist  'Sorry, Sam does not exist'
