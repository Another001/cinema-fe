import { ContactGetResDTO } from "../types/Message";

const findContact = (name : string, contactList: ContactGetResDTO[]) => {
  if(!contactList || !name)
    return;
  const lowerName = name.toLowerCase()
  const filter = contactList.filter(contact => contact.nameContact.toLowerCase().includes(lowerName));
  return filter;
}

export default findContact;