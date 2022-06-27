import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("Data :: ", data);

  // Example items, to simulate fetching from another resources.
  const items = data.map((item) => {
    return item.name;
  });

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, index) => (
            <div style={{ marginLeft: "680px" }}>
              <h5
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  // borderWidth: "20px",
                  width: "200px",
                }}
              >
                {item}
              </h5>
            </div>
          ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <div style={{ display: "block", listStyle: "none" }}>
          <ReactPaginate
            breakLabel="..."
            // nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            // previousLabel="< previous"
            renderOnZeroPageCount={null}
            style={{ display: "flex", flexDirection: "row" }}
          />
        </div>
      </>
    );
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: isDark ? "black" : "white",
        color: isDark ? "white" : "black",
      }}
    >
      <h1>Personal Information</h1>
      <table>
        <tr>
          <th style={{ width: "50px" }}>item.id</th>
          <th style={{ width: "200px" }}>item.name</th>
          <th style={{ width: "250px" }}>item.phone</th>
          <th style={{ width: "160px" }}>item.username</th>
          <th style={{ width: "200px" }}>item.website</th>
          <th style={{ width: "200px" }}>item.address.street</th>
          <th style={{ width: "200px" }}>item.company.name</th>
        </tr>
      </table>
      {data.map((item, key) => {
        return (
          <div
            key={key}
            // style={{ display: "flex", flexDirection: "row", gap: "20px" }}
          >
            <table>
              <tr>
                <td style={{ width: "50px" }}>{item.id}</td>
                <td style={{ width: "200px" }}>{item.name}</td>
                <td style={{ width: "250px" }}>{item.phone}</td>
                <td style={{ width: "160px" }}>{item.username}</td>
                <td style={{ width: "200px" }}>{item.website}</td>
                <td style={{ width: "200px" }}>{item.address.street}</td>
                <td style={{ width: "200px" }}>{item.company.name}</td>
              </tr>
            </table>
          </div>
        );
      })}
      <hr />
      <h1>TextBox</h1>
      Please Enter Your Name :{" "}
      <input
        type="text"
        // value={this.target.value}
        onChange={(e) => {
          e.preventDefault();
          setName(e.target.value);
        }}
      />
      <p>{name}</p>
      <hr />
      <h1>Search Bar for Names, Username and Company Name</h1>
      <form>
        <input
          type="text"
          onChange={(e) => {
            e.preventDefault();
            setSearchData(e.target.value);
          }}
          placeholder="Enter value to search..."
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            const result = data.filter((item) => {
              return (
                item.name.toLowerCase().includes(searchData.toLowerCase()) ||
                item.username
                  .toLowerCase()
                  .includes(searchData.toLowerCase()) ||
                item.company.name
                  .toLowerCase()
                  .includes(searchData.toLowerCase())
              );
            });
            console.log("Filtered Result : ", result);
            setFilteredData(result);
          }}
        >
          Search
        </button>
        {filteredData ? (
          filteredData.length > 0 ? (
            // <p>{JSON.stringify(filteredData)}</p>

            filteredData.map((item, key) => {
              return (
                <div
                  key={key}
                  // style={{ display: "flex", flexDirection: "row", gap: "20px" }}
                >
                  <table>
                    <tr>
                      <td style={{ width: "50px" }}>{item.id}</td>
                      <td style={{ width: "200px" }}>{item.name}</td>
                      <td style={{ width: "250px" }}>{item.phone}</td>
                      <td style={{ width: "160px" }}>{item.username}</td>
                      <td style={{ width: "200px" }}>{item.website}</td>
                      <td style={{ width: "200px" }}>{item.address.street}</td>
                      <td style={{ width: "200px" }}>{item.company.name}</td>
                    </tr>
                  </table>
                </div>
              );
            })
          ) : (
            <p>Sorry, No Result Found...</p>
          )
        ) : null}
      </form>
      <hr />
      <h1>Select Your Preferred Mode ...</h1>
      <button
        onClick={() => {
          setIsDark(true);
        }}
      >
        Dark Mode
      </button>
      <button
        onClick={() => {
          setIsDark(false);
        }}
      >
        Light Mode
      </button>
      <hr />
      <h1>Pagination</h1>
      <PaginatedItems itemsPerPage={4} />
    </div>
  );
}

export default App;
