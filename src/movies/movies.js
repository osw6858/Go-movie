import "./movies.css";
import { Empty } from "antd";

function Movies() {
  const searchString = 1;
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
        <div className="video-preview">
          <div className="thumbnail-row">
            <img
              className="thumbnail"
              src="assets/images/thumbnails/avengers.jpg"
              alt="영화포스터"
            />
            <div className="video-time">러닝타임</div>
          </div>
          <div className="video-info-grid">
            <p className="video-title">제목 : 어벤져스</p>
            <p className="video-author">감독 : 몰라</p>
            <p className="video-stats">
              관람객 : 00명 &#183; 개봉일 : 2023/2/23
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Movies;
