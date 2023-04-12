import "./movies.css";
import { Card, Result } from "antd";
import React from "react";
import axios from "axios";
import Pagination from "../pagenation/pagenation";
import { MOVIE_KEY } from "../key";
import dayjs from "dayjs";

function Movies(prop) {
  const [movies, setMovies] = React.useState([]);
  const limit = 8; //한 화면에서 보여질 카드 갯수
  const [page, setPage] = React.useState(1);
  const offset = (page - 1) * limit; //해당 페이지의 첫 게시물의 위치(index)
  let searching = prop.searchString;
  let select = prop.selected;
  let isSelect;
  if(select === "movieNm") {
    isSelect = "movieNm";
  }else {
    isSelect = "directorNm";
  }
  let ACCESS_TOKEN = localStorage.getItem("token");
  //console.log("검색어", searching);
  const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${MOVIE_KEY}&curPage=1&itemPerPage=50&${isSelect}=${searching}`;
  let date = new Date();
  
  React.useEffect(
    function () {
      axios
        .get(url)
        .then(function (result) {
          console.log("영화목록결과", result);
          const movies = result.data.movieListResult.movieList;
        
          if(ACCESS_TOKEN !== null) {
            setMovies(movies);
          }
          if(ACCESS_TOKEN === null){
            const filterMv = movies.filter(
              (param) => param.repGenreNm !== "성인물(에로)"
            );
            setMovies(filterMv);
          }
        })
        .catch(function (err) {
          console.log("에러발생", err);
        });
    },
    [prop.searchString] 
  );

  if (movies.length === 0) {
    return (
      <div className="loading">
        <Result title="로딩중...."></Result>
      </div>
    );
  }

  

  /*
  if (movies.totCnt === 0) {
    return (
      <div className="loading">
        <Result title="결과가 없습니다...."></Result>
      </div>
    );
  }
  */

  return (
    <div>
      <div className="info-title">
        <h1>영화정보</h1><h3>목록 기준일 - {dayjs(date).format("YYYY년 MM월 DD일")}</h3>
      </div>
      <section className="info-grid">
        {movies.slice(offset, offset + limit).map((movies, index) => {
          //slice로 index 0번방부터 8번방까지 자르고나서 map을 돌림
          return (
            <div key={index}>
              <Card
                title={`${movies.movieNm}`}
                type="inner"
                className="info-card"
              >
                <p>장르 : {movies.genreAlt}</p>
                <p>국가 : {movies.repNationNm}</p>
                <p>제작년도 : {movies.prdtYear}년</p>
                <p>상영상태 : {movies.prdtStatNm}</p>
                <p>감독 : {movies.directors.map((name) => {return name.peopleNm})}</p>
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

//로딩화면과 결과없음 화면 구분할것
