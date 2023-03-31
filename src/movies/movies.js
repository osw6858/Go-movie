import "./movies.css";
import { Empty } from "antd";
import React from "react";
import axios from "axios";
import Pagination from "../pagenation/pagenation";

function Movies() {
  const [movies, setMovies] = React.useState([]);
  const limit = 8; //한 화면에서 보여질 카드 갯수
  const [page, setPage] = React.useState(1);
  const offset = (page - 1) * limit; //해당 페이지의 첫 게시물의 위치(index)
  let query = `&movieNm=미아`;
  const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=7e9a703145ec25f8dc300521b3384744&curPage=1${query}`;

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

  return (
    <div>
      <section className="video-grid">
        {movies.slice(offset, offset + limit).map((movies, index) => {
          //slice로 index 0번방부터 8번방까지 자르고나서 map을 돌림
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
                <p className="video-kind">장르 : {movies.genreAlt}</p>
                <p className="video-stats">
                  국가 : {movies.repNationNm} / 개봉일 : {movies.openDt}
                </p>
              </div>
            </div>
          );
        })}
      </section>
      <div className="pagination">
        <Pagination
          total={movies.length} //pagenation컴포넌트로 prop 전달
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

export default Movies;

//라우터 돔으로 페이지 분할(메인/박스오피스/상세정보) -> 컴포넌트 활용여부 고민

//전체영화 목록에서 페이징 처리 --> 완료했지만 알고리즘 공부 필요!

//movieNm 영화명 조회이용 --> 검색기능 구현
