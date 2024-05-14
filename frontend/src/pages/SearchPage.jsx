import "./searchpage.css";
import Navbar from "../components/Navbar";
import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { handleSearch } from "../actions/folderActions";
import toast from "react-hot-toast";
const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchHandler = async () => {
    if (!searchTerm) {
      toast.error("Please enter something to search");
      return;
    }
    try {
      setIsSearching(true);
      setNotFound(false);
      const data = await handleSearch(searchTerm);
      setSearchResults(data);
    } catch (error) {
      setNotFound(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="search__container">
        <Input
          placeholder="Enter image name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          isLoading={isSearching}
          onClick={searchHandler}
          colorScheme="blue"
          size="md"
        >
          Search
        </Button>
      </div>
      {notFound && <h1 className="notFound__images">{notFound}</h1>}
      {searchResults.length > 0 && (
        <div className="search__results__container">
          {searchResults?.map((result) => (
            <img key={result._id} src={result.url} alt={result.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
