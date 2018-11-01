import React, { Component } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAuthor: {},
      filteredAuthors: [],
      authors: [],
      loading: ""
    };
    this.selectAuthor = this.selectAuthor.bind(this);
    this.unselectAuthor = this.unselectAuthor.bind(this);
    this.filterAuthors = this.filterAuthors.bind(this);
  }

  selectAuthor(author) {
    axios
      .get(`https://the-index-api.herokuapp.com/api/authors/${author.id}/`)
      .then(res => res.data)
      .then(currentAuthor => this.setState({ currentAuthor: currentAuthor }))
      .catch(err => console.error("Failed!"));
  }

  unselectAuthor() {
    this.setState({ currentAuthor: {} });
  }

  filterAuthors(query) {
    query = query.toLowerCase();
    let filteredAuthors = this.state.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`.includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  }

  getContentView() {
    if (this.state.currentAuthor.first_name) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else if (this.state.filteredAuthors[0]) {
      return (
        <AuthorsList
          authors={this.state.filteredAuthors}
          selectAuthor={this.selectAuthor}
        />
      );
    } else {
      return (
        <AuthorsList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
        />
      );
    }
  }
  componentDidMount() {
    axios
      .get("https://the-index-api.herokuapp.com/api/authors/")
      .then(res => res.data)
      .then(authorsFromAPI =>
        this.setState(
          { authors: authorsFromAPI },
          this.setState({ loading: "" })
        )
      )
      .catch(err => console.error("Failed!"));
  }
  componentWillMount() {
    this.setState({ loading: "Loading" });
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">
            <SearchBar filterAuthors={this.filterAuthors} />
            {this.getContentView()}
            <h1>{this.state.loading}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
