import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, selectContacts } from '../../redux/contactsSlice';
import {
  ButtonAdd,
  Form,
  SearchInput,
  SearchWrapper,
} from './ContactForm.styled';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectContacts);

  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleAddContact(name, number);
    setName('');
    setNumber('');
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

  return (
    <Form onSubmit={handleSubmit}>
      <SearchWrapper>
        {' '}
        Name
        <SearchInput
          type="text"
          name="name"
          required
          value={name}
          onChange={handleChange}
        />
      </SearchWrapper>
      <SearchWrapper>
        {' '}
        Number
        <SearchInput
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleChange}
        />
      </SearchWrapper>
      <ButtonAdd type="submit">Add contact</ButtonAdd>
    </Form>
  );
};
export default ContactForm;
