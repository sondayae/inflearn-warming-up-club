import React from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";
import Category from "../../components/Category";

export default function MainPage() {
  return (
    <div>
      <Banner />

      <div style={{ padding: "40px" }}>
        <Category />
        <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
        <Row
          title="Action Movies"
          id="AM"
          fetchUrl={requests.fetchActionMovies}
        />
        <Row
          title="Comedy Movies"
          id="Cm"
          fetchUrl={requests.fetchComedyMovies}
        />
      </div>
    </div>
  );
}
