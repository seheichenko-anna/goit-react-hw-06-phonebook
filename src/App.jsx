import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components//ContactList/ContactList';
import Filter from './components//Filter/Filter';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  selectContacts,
} from './redux/contactsSlice';
import { filterContacts, selectFilter } from './redux/filterSlice';

const App = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const handleSearch = e => {
    dispatch(filterContacts(e.target.value.toLowerCase().trim()));
  };

  const handleAddContact = (name, number) => {
    const newContact = {
      name: name.trim(),
      number: number.trim(),
    };
    const isContactExist = contacts.some(contact => contact.name === name);
    if (isContactExist) {
      alert(`${name} is already in contacts`);
      return;
    }
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = filter
    ? contacts.filter(item => item.name.toLowerCase().includes(filter))
    : contacts;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleSearch} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
