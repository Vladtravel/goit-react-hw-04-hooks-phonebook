import React from "react";
import PropTypes from "prop-types";
import ContactItem from "./ContactItem";

const ContactsList = ({ contacts, onDeleteClick }) => (
  <ul>
    <ContactItem contacts={contacts} onDeleteClick={onDeleteClick} />
  </ul>
);

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default ContactsList;
