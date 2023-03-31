import "./movies.css";
import { Empty } from "antd";
import React from "react";
import axios from "axios";

function Movies() {
  const searchString = 1;
  const [movies, setMovies] = React.useState([]);
  const url =
    "http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=7e9a703145ec25f8dc300521b3384744";

  React.useEffect(function () {
    axios
      .get(url)
      .then(function (result) {
        console.log("결과입니다", result);
        const movies = result.data.movieListResult.movieList;
        setMovies(movies);
      })
      .catch(function (err) {
        console.log("에러발생", err);
      });
  }, []);

  if (searchString === null) {
    return (
      <div className="no-search">
        <Empty description="영화를 검색해 주세요 : )" />
      </div>
    );
  }
  return (
    <main>
      <section className="video-grid">
        {movies.map((movies, index) => {
          return (
            <div key={index} className="video-preview">
              <div className="thumbnail-row">
                <img
                  className="thumbnail"
                  src="assets/images/thumbnails/movieLogo2.jpg"
                  alt="영화포스터"
                />
                <div className="video-time">{movies.prdtStatNm}</div>
              </div>
              <div className="video-info-grid">
                <p className="video-title"> {movies.movieNm}</p>
                <p className="video-author">장르 : {movies.genreAlt}</p>
                <p className="video-stats">
                  국가 : {movies.repNationNm} &#183; 개봉일 : {movies.openDt}
                </p>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Movies;
