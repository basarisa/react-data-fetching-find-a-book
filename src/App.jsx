import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [bookSearch, setBookSearch] = useState("");
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    getData();
  }, [bookSearch]);

  const getData = async () => {
    try {
      const data = await axios.get(
        `https://openlibrary.org/search.json?q=${bookSearch}`
      );

      const allBook = data.data.docs;
      const bookTitle = allBook.map((book) => book.title);

      setBookList(bookTitle);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleInputValue = (event) => {
    if (event.key === "Enter") {
      setBookList([]);
      setBookSearch(inputText);
    }
  };

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        onChange={handleInputChange}
        onKeyDown={(event) => handleInputValue(event)}
      />
      <ul>
        {bookList.map((book, index) => (
          <li key={index}>{book}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
