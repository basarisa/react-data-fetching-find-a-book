import "./App.css";
import { useState,useEffect } from "react";
import axios from "axios";

function App() {
  const [searchBookList, setSearchBookList] = useState([]);
  const [input, setInput] = useState("");
  console.log("srare",input)

  async function getBookList() {
    try {
      let result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${input}`
      );
      setSearchBookList (result.data.items || [])
    } catch (error){
      console.log("Error fetching data:", error);
    }
  }

    useEffect(() => {
      if (input) {
        getBookList();
      }
    }, [input]);


  return (
    <>
      {" "}
      <div className="App">
        <h1> Find a Book</h1>
        <input
          className="input"
          placeholder="Enter book name here"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <ul>
          {searchBookList.map((book) => (
            <li key={book.id}>{book.volumeInfo.title}</li>
          ))}
        </ul>
      </div>
      <div></div>
    </>
  );
}

export default App;
