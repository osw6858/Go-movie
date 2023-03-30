import "./movies.css";

function Movies() {
  return (
    <main>
      <section className="video-grid">
        <div className="video-preview">
          <div className="thumbnail-row">
            <img
              className="thumbnail"
              src="assets/images/thumbnails/thumbnail-1.jpeg"
              alt="영화포스터"
            />
            <div className="video-time">러닝타임</div>
          </div>
          <div className="video-info-grid">
            <p className="video-title">제목 : 좌미온당</p>
            <p className="video-author">감독 : 김수지</p>
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
