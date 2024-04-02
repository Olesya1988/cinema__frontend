export const MovieItem = ({ movie }: any) => {
  const { id, title, synopsis, duration, origin, seances } = movie;

  return (
    <section className="movie">
      <div className="movie__info" id={id}>
        <div className="movie__poster">
          <img className="movie__poster-image" src="https://i.pravatar.cc/300" alt="movie_avatar" />
        </div>
        <div className="movie__description">
          <h2 className="movie__title">{title}</h2>
          <p className="movie__synopsis">{synopsis}</p>
          <p className="movie__data">
            <span className="movie__data-duration">{duration}</span>/
            <span className="movie__data-origin">{origin}</span>
          </p>
        </div>
      </div>
      {seances.map((seance: any) => (
        <div className="movie-seances__hall">
          <h3 className="movie-seances__hall-title">Зал {seance.hall}</h3>
          <ul className="movie-seances__list">
          {seance.time.map((time: any, index: number) => (
            <li className="movie-seances__time-block" key={index}>
              <a className="movie-seances__time" href="#">{time}</a>
            </li>
          ))}
          </ul>
        </div>
      ))}
      
    </section>
  );
};
