import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      location: "",
      sortBy: "best_match"
    };

    this.sortByOptions = {
      "Best Match ": "best_match",
      "Highest Rated": "rating",
      "Most Reviewed": "review_count"
    };

    //handle events by the sort options
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  //get the selected style class
  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return "active";
    } else {
      return "";
    }
  }

  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOption
    });

    //only trigger the search when we alreay have the targets;
    if(this.props.businesses.length > 0){
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    }
  }
  
  handleTermChange(e){
      this.setState({
        term: e.target.value
      })
  }

  handleLocationChange(e){
      this.setState({
        location: e.target.value
      });
  }

  handleSearch(e){
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
      e.preventDefault();
  }

  //search will also be triggered when enter is pressed;
  handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      this.handleSearch(e);
    }
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map((sortByOption,i) => {
      //get the value of sort options.
      let sortByOptionValue = this.sortByOptions[sortByOption];

      //use key content as button, set value to talk with api;
      return (
        <li
          className={this.getSortByClass(sortByOptionValue)}
          onClick={this.handleSortByChange.bind(this,sortByOptionValue)}
          key={this.sortByOptionValue}
        >
          {sortByOption}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange={this.handleTermChange} placeholder="Search Businesses" />
          <input onChange={this.handleLocationChange} placeholder="Where?" onKeyDown={this.handleKeyDown}/>
        </div>
        <div className="SearchBar-submit" onClick={this.handleSearch}>
          <a>Let's Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
