import "./movies.css";
import { Card, Result, Space, Spin } from "antd";
import React from "react";
import axios from "axios";
import Pagination from "../pagenation/pagenation";

function Movies(prop) {
  const [movies, setMovies] = React.useState([]);
  const limit = 8; //한 화면에서 보여질 카드 갯수
  const [page, setPage] = React.useState(1);
  const offset = (page - 1) * limit; //해당 페이지의 첫 게시물의 위치(index)
  const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=7e9a703145ec25f8dc300521b3384744&curPage=1&movieNm=${prop.searchString}`;

  React.useEffect(
    function () {
      axios
        .get(url)
        .then(function (result) {
          console.log("영화목록결과", result);
          const movies = result.data.movieListResult.movieList;
          setMovies(movies);
        })
        .catch(function (err) {
          console.log("에러발생", err);
        });
    },
    [prop.searchString] //검색최적화 생각해볼것 한글자 칠때마다 api통신하고 있음
  );

  if (movies.length === 0) {
    return (
      <div className="loading">
        <Result title="결과가 없습니다."></Result>
      </div>
    );
  }

  return (
    <div>
      <section className="info-grid">
        {movies.slice(offset, offset + limit).map((movies, index) => {
          //slice로 index 0번방부터 8번방까지 자르고나서 map을 돌림
          return (
            <div key={index}>
              <Card title={`${movies.movieNm}`} type="inner">
                <p>장르 : {movies.genreAlt}</p>
                <p>국가 : {movies.repNationNm}</p>
                <p>제작년도 : {movies.prdtYear}년</p>
                <p>상영상태 : {movies.prdtStatNm}</p>
              </Card>
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

//useState useEffect 공부 더욱더 깊이있게 해볼것!

//prop은 object형식으로 컴포넌트에 전달됨

//상세페이지 만들기 / css 더 공부할것

//결과없음을 계속 보여주지 말고 로딩화면이였다가 특정시간이 지나면 결과없음으로 버꿀것
