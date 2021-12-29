class PhoneBook {
  constructor() {
    this.contacts = new Map();
  }

  // private method
  #validateNewContact(name, phoneNumber, email) {
    // validate the numbers as nigerian phone number
    const validatePhone = /((^090)([1-9]))|((^070)([1-9]))|((^080)([2-9]))|((^081)([0-9]))(\d{7})/.test(phoneNumber);
    if (validatePhone == false) return { error: `${name} has an invalid phone number` };
    
    // validate email
    const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());
    if (validateEmail === false) { return {error: `${name} has an invalid email` };
    }
  }

 addContact(name, phoneNumber, email) {
    // validate contact
    const validate = this.#validateNewContact(name, phoneNumber, email);

    // LOGS ERROR TO CONSOLE
    if (validate && validate.error) return console.log(validate.error);
   
    //  check if there's an existing contact with the phone number as key or with details as the new contact to be created
    const existingContacts = this.contacts;
    for (const contactDetails of existingContacts.values()) {
      if (contactDetails.phoneNumber === phoneNumber) return console.log(`Contact with  the phone number ${phoneNumber} already exist`);
      if (contactDetails.email === email) return console.log(`Contact with the email ${email} already exist, Please try using another email`);
      if (contactDetails.name === name) return console.log(`Contact with the name ${name} already exist, Please try using another name`);
    }

    //  structure the contact data to be stored
    const data = {
      name,
      phoneNumber,
      email,
      dateCreated: new Date().toISOString()
      };
      
    this.contacts.set(phoneNumber, data);

    console.log(`${name} added to contacts successfully`);
  }

  getAContact(phoneNumber) {
    const contactData = this.contacts.get(phoneNumber);
    if (contactData === undefined) return `Contact ${phoneNumber} does not exist`;
    return contactData;
  }
  
  deleteAContact(phoneNumber) {
    if (this.contacts.delete(phoneNumber) === true) return console.log(`Contact ${phoneNumber} deleted successfully`);
    return console.log(`Contact ${phoneNumber} does not exist`);
  }

  getAllContact() {
    return this.contacts;
  }
}

// Note: sola is the owner of the phone book and can therefore save as much contact as he wants in his phone book
const sola = new PhoneBook('sola', 'sola@gmail.com', '08024460119');

console.log('::::::::::ADD CONTACT::::::');
// ADD CONTACT [can only add new contacts with unique name, email and phone number]
sola.addContact('Dolapo', '08024460117', 'dolapo@gmail.com'); // added successfully
sola.addContact('Toyin', '08024460115', 'toyin@gmail.com'); // added successfully
sola.addContact('Oba', '08024460116', 'oba@gmail.com'); // added successfully
sola.addContact('Tola', 2345, 'Tola@gmail.com'); // returns error due to invalid phone number
sola.addContact('Tosin', '08024460143', 'tosingmail.com'); // returns error due to invalid email
sola.addContact('Dolapo', '08024460117', 'dolapo@gmail.com'); // throws error due to existing contact with the same name, phone number and email
console.log(`:::::::::END OF ADDING CONTACT::::::::`);

// // GET A CONTACT
console.log(`\n`);
console.log('::::::::GETTING CONTACTS::::::::::');
console.log('GET A CONTACT WITH IT\'S PHONE NUMBER:');
console.log(sola.getAContact('08024460115')); // return contact that matches the phone number
console.log(`\n`);


console.log('GET A CONTACT THAT DOES NOT EXIST');
console.log(sola.getAContact('08024460118')); // returns error when contact does not exist
console.log(`:::::::END OF GETTING CONTACTS:::::::`);
console.log(`\n\n`);

// // GET ALL CONTACTS
console.log(':::::::GET ALL CONTACTS::::::');
console.log(sola.contacts);
console.log(`\n`);


// // DELETE A CONTACT
console.log(':::::::::::::::::DELETE::::::::::::');

console.log('DELETE A CONTACT WITH IT\'S PHONE NUMBER:');
sola.deleteAContact('08024460116'); // returns success message
console.log(`\n`);

console.log('DELETE A CONTACT THAT DOES NOT EXIST:');
sola.deleteAContact('08022344556'); // Sam does not exist  'Sorry, Sam does not exist'
