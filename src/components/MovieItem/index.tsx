import { NavLink } from "react-router-dom";

export const MovieItem = ({ movie }: any) => {
  const { id, title, synopsis, duration, origin, date, seances } = movie;
  
  const onCheckTicket = (e: any) => {
    const target = e.target;
    let title = target
      .closest(".movie")
      .querySelector(".movie__title").innerHTML;
    let time = target.innerHTML;
    let hall = target
      .closest(".movie-seances__hall")
      .querySelector(".movie-seances__hall-title").id;    
    return ({title, date, time, hall});
  };

  return (
    <section className="movie">
      <div className="movie__info" id={id}>
        <div className="movie__poster">
          <img
            className="movie__poster-image"
            src="https://i.pravatar.cc/300"
            alt="movie_avatar"
          />
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
          <h3 id={seance.hall} className="movie-seances__hall-title">
            Зал {seance.hall}
          </h3>
          <ul className="movie-seances__list">
            {seance.time.map((time: any, index: number) => (
              <li className="movie-seances__time-block" key={index}>
                <NavLink to="/hall" state={{from: {hall: seance.hall, title, date, time}}}>
                  <a                    
                    onClick={onCheckTicket}
                    className="movie-seances__time"
                    href="#"
                  >
                    {time}
                  </a>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
