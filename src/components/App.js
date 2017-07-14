import React from 'react';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer';
import '../assets/stylesheets/base.scss';


const App = ({ name }) => {
  let startState = location.hash
    .substr(1) // Remove "#"
    .split("&")
      .map( el => el.split("=") )
      .reduce( (pre, cur) => { pre[cur[0]] = cur[1]; return pre; }, {} );
  return (
    <MapContainer startState={startState} />
  );
};

App.propTypes = {
  name: PropTypes.string,
};

export default App;
