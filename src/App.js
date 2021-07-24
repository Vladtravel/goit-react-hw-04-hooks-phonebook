import React from "react";
import shortid from "shortid";
import ContactForm from "./components/ContactForm";
import ContactsList from "./components/ContactsList";
import Filter from "./components/Filter";
import styles from "./App.module.css";

class App extends React.Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    if (contacts) {
      this.setState({
        contacts: contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  onDeleteContactClick = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((i) => i.id !== id),
    }));
  };

  onFilterInput = (e) => {
    const value = e.currentTarget.value;
    this.setState({ filter: value });
  };

  onFilterChange = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((i) =>
      i.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  onFormSubmit = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    contacts.some((i) => i.name === name)
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  render() {
    const contacts = this.onFilterChange();
    const { filter } = this.state;
    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onFormSubmit} />

        <>
          <h2>Contacts</h2>
          <Filter value={filter} onFilter={this.onFilterInput} />
          <ContactsList
            contacts={contacts}
            onDeleteClick={this.onDeleteContactClick}
          />
        </>
      </div>
    );
  }
}

export default App;
