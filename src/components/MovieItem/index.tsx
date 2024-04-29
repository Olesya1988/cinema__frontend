import { useState } from "react";
import { NavLink } from "react-router-dom";

export const MovieItem = ({ movie }: any) => {
  const { id, title, synopsis, duration, origin, seances } = movie;

  const url = "http://localhost:7070/ticket";  

  const createTicket: any = async (title: string, seances: string, hall: number) => {    
    const seance = {
      title,
      seances,
      hall
    };

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(seance),
    });    
  };

  
  const onCheckTicket = (e: any) => {   
    
    const target = e.target;
    console.log(target);
    let title = target.closest(".movie").querySelector(".movie__title").innerHTML;
    let seances = target.innerHTML;
    let hall =  Number(target.closest(".movie-seances__hall").querySelector(".movie-seances__hall-title").id);
    console.log(target.closest(".movie-seances__hall").querySelector(".movie-seances__hall-title").id);
    createTicket(title, seances, hall);
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
          <h3 id={seance.hall} className="movie-seances__hall-title">Зал {seance.hall}</h3>
          <ul className="movie-seances__list">
            {seance.time.map((time: any, index: number) => (
              <li className="movie-seances__time-block" key={index}>
                <NavLink to="/hall">
                  <a onClick={onCheckTicket} className="movie-seances__time" href="#">
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
