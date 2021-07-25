import { useState, useEffect } from "react";
import shortid from "shortid";
import ContactForm from "./components/ContactForm";
import ContactsList from "./components/ContactsList";
import Filter from "./components/Filter";
import styles from "./App.module.css";

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) ?? [];
  });

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState("");

  const onFormSubmit = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    contacts.some((i) => i.name === name)
      ? alert(`${name} is already in contacts`)
      : setContacts([contact, ...contacts]);
  };

  const onDeleteContactClick = (id) => {
    setContacts(contacts.filter((i) => i.id !== id));
  };

  const onFilterInput = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
  };

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onFormSubmit} />

      <h2>Contacts</h2>
      <Filter value={filter} onFilter={onFilterInput} />
      <ContactsList contacts={getVisibleContacts()} onDeleteClick={onDeleteContactClick} />
    </div>
  );
};

export default App;
