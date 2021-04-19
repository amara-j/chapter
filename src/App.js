import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch(
  'TPV972MWZD',
  'bbf2659b8f3fe435376fc89b12308f03'
);

class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">Let's find you the right Medicare plan!</a>
          </h1>
        </header>
        <div className="container">
          <InstantSearch searchClient={searchClient} indexName="Chapter">
            <div className="search-panel">
              <div className="search-panel__results">
                <SearchBox
                  className="searchbox"
                  translations={{
                    placeholder:
                      'search plans by bid ID, name, geography, carrier, etc...',
                  }}
                />
                <Hits hitComponent={Hit} />
                <div className="pagination">
                  <Pagination />
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <div>
      <div className="hit-bid-id">
        <Highlight attribute="bid_id" hit={props.hit} />
      </div>
      <div className="hit-name">{props.hit.name}</div>
      {/* format max out of pocket number to display with $ if number, or without if "None" */}
      <div className="oop_deductible_and_prescriptions">
        <div className="hit-max_oop">
          Out-of-pocket Max:{' '}
          {props.hit.max_oop !== 'None'
            ? `$` + props.hit.max_oop.toLocaleString()
            : props.hit.max_oop.toLocaleString()}
        </div>
        <div className="hit-deductible">
          Deductible: ${props.hit.deductible.toLocaleString()}
        </div>
        <div className="hit-prescriptions">
          Prescriptions covered? {props.hit.prescriptions}
        </div>
      </div>
      <div className="carrier_and_geo">
        <div className="hit-carrier">Carrier: {props.hit.carrier}</div>
        <div className="hit-geo">Area: {props.hit.geo}</div>
      </div>
      <div className="hit-link">
        {' '}
        <a href={props.hit.link}>Learn More</a>
      </div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
