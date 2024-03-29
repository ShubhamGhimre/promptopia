"use client";
import { useState, useEffect } from "react"

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {

  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const [posts, setPosts] = useState([]);

  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, 'i'); // case-insensitive
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.creator.email)||
        regex.test(item.tags) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResults = filterPosts(tagName);
    setSearchResults(searchResults);
  }

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setAllPosts(data);
  };


  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Serch for a tag or username" value={searchText}
          onChange={handleSearchChange}
          required className="search_input peer"
        />
      </form>

      {/* all prompts */}

      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
        />

      )}

      {/* <PromptCardList
        data={posts}
        handleTagClick={() => { }}
      /> */}

    </section>
  )
}

export default Feed