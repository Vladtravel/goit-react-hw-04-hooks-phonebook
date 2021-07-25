import React from "react";
import PropTypes from "prop-types";

const Filter = ({ value, onFilter }) => {
  return <input type="text" value={value} placeholder="Filter" onChange={onFilter} />;
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default Filter;
