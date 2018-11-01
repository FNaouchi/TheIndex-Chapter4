import React, { Component } from "react";

class BookRow extends Component {
  render() {
    let book = this.props.book;
    let author = this.props.author;
    let books = book.authors.map(author => {
      return <div>{author.name}</div>;
    });
    return (
      <tr>
        <td>{book.title}</td>
        <td>{books}</td>
        <td>
          <button className="btn" style={{ backgroundColor: book.color }} />
        </td>
      </tr>
    );
  }
}

export default BookRow;
