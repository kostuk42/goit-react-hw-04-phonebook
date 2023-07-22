import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import styles from './App.module.css';

const App = () => {
	const [contacts, setContacts] = useState([
		{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
		{id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
		{id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
		{id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
	]);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		const savedContacts = localStorage.getItem('contacts');
		if (savedContacts) {
			setContacts(JSON.parse(savedContacts));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}, [contacts]);

	const addContact = (name, number) => {
		const newContact = {
			id: uuidv4(),
			name,
			number,
		};

		const existingContact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
		if (existingContact) {
			alert(`${name} is already in contacts.`);
		} else {
			setContacts(prevContacts => [...prevContacts, newContact]);
		}
	};

	const deleteContact = (id) => {
		setContacts(prevContacts => prevContacts.filter((contact) => contact.id !== id));
	};

	const changeFilter = (filterValue) => {
		setFilter(filterValue);
	};

	const getFilteredContacts = () => {
		const normalizedFilter = filter.toLowerCase();
		return contacts.filter((contact) => contact.name.toLowerCase().includes(normalizedFilter));
	};

	const filteredContacts = getFilteredContacts();

	return (
		<div className={styles.container}>
			<h1>Phonebook</h1>
			<ContactForm onAddContact={addContact} />

			<h2>Contacts</h2>
			<Filter value={filter} onChangeFilter={changeFilter} />
			<ContactList contacts={filteredContacts} onDeleteContact={deleteContact} />
		</div>
	);
};

export default App;
