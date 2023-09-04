import React from "react";

function Search({onChangeSearchInput, searchValue, setSearchValue}) {

  return (
    <div className="search-block">
        <img
          height={14.25}
          width={14.25}
          src="/img/Search.png"
          alt="search"
        />
        {searchValue && <img onClick={() => setSearchValue('')} className="cross" src="img/cross.svg" alt="clear"/>}
        <input value={searchValue} onChange={onChangeSearchInput} placeholder="Search..." />
    </div>
  )
}

export default Search;