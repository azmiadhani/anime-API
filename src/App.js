import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  const [animeList, SetAnimeList] = useState([]);
  const [topAnime, SetTopAnime] = useState([]);
  const [search, SetSearch] = useState("");
  // const [isLoading, SetIsLoading] = useState(false);
  const GetTopAnime = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v3/top/anime/1/bypopularity`
    ).then((res) => {
      return res.json();
    });

    SetTopAnime(temp.top.slice(0, 5));
  };

  const HandleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log(search);
    FetchAnime(search);
  };

  const FetchAnime = async (query) => {
    if (query.length < 4) {
      return;
    }
    console.log("fetch anime");
    const temp = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`
    )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          // show error to user
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    SetAnimeList(temp ? temp.results : []);
  };

  useEffect(() => {
    GetTopAnime();
  }, []);

  useEffect(() => {
    HandleSearch();
  }, [search]);

  return (
    <div className="App">
      <Header />
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} />
        <MainContent
          HandleSearch={HandleSearch}
          search={search}
          SetSearch={SetSearch}
          animeList={animeList}
        />
      </div>
    </div>
  );
}

export default App;
