import cn from "classnames";

interface ISessionGrid {
  onAddMovieHandler: any;
  onSubmitMovieHandler: any;
  onClickHandler: any;
  activeMovies: any;
  halls: IHall[];
  activeHall: number;
  onDeleteMovieHandler: any;
}

interface IHall {
  id: number;
  rows: number;
  seats: number;
  places: Array<string[]>;
  prices: {};
}

export const SessionGrid = ({
  onAddMovieHandler,
  onSubmitMovieHandler,
  onClickHandler,
  activeMovies,
  halls,
  activeHall,
  onDeleteMovieHandler,
}: ISessionGrid) => {
  const onToggleHandler = () => {
    let form = document.querySelector(".movie-add__form__wrapper");
    form?.classList.toggle("invisible");
  };

  return (
    <section className="conf-step">
      <header className="conf-step__header conf-step__header_opened">
        <h2 className="conf-step__title">Сетка сеансов</h2>
      </header>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">
          <button
            className="conf-step__button conf-step__button-accent"
            onClick={onToggleHandler}
          >
            Добавить фильм
          </button>
        </p>
        <div className={cn("invisible", "movie-add__form__wrapper")}>
          <form className="movie-add__form" onSubmit={onSubmitMovieHandler}>
            <div className="close" onClick={onToggleHandler}>
              X
            </div>
            <div className="movie-add__input">
              <div>Введите название фильма</div>
              <input type="text" name="title" onChange={onAddMovieHandler} />
            </div>
            <div className="movie-add__input">
              <div>Введите описание фильма</div>
              <input type="text" name="synopsis" onChange={onAddMovieHandler} />
            </div>
            <div className="movie-add__input">
              <div>Введите продолжительность фильма</div>
              <input type="text" name="duration" onChange={onAddMovieHandler} />
            </div>
            <div className="movie-add__input">
              <div>Введите название страны, выпустившей фильм</div>
              <input type="text" name="origin" onChange={onAddMovieHandler} />
            </div>
            <div className="movie-add__input" onChange={onAddMovieHandler}>
              <div>Введите дату</div>
              <input type="text" name="date" onChange={onAddMovieHandler} />
            </div>
            <div className="movie-add__input">
              <div>Введите номер зала</div>
              <input type="text" name="hall" onChange={onAddMovieHandler} />
            </div>
            <div className="movie-add__input">
              <div>Введите время начала сеанса</div>
              <input type="text" name="time" onChange={onAddMovieHandler} />
            </div>
            <button className="movie-add__submit" onClick={onToggleHandler}>
              Сохранить
            </button>
          </form>
        </div>

        <ul className="conf-step__selectors-box">
          {halls.map((hall: any) => (
            <li key={hall.id} id={hall.id} onClick={onClickHandler}>
              <input
                type="radio"
                className="conf-step__radio"
                name="prices-hall"
              />
              <span className="conf-step__selector">Зал {hall.id}</span>
            </li>
          ))}
        </ul>

        {activeMovies.map((movie: any) => (
          <section className="movie">
            <div className="movie__info" id={movie.id}>
              <div className="movie__delete" onClick={onDeleteMovieHandler}>
                X
              </div>
              <div className="movie__description">
                <h2 className="movie__title">{movie.title}</h2>
                <p className="movie__synopsis">{movie.synopsis}</p>
                <p className="movie__data">
                  <span className="movie__data-duration">{movie.duration}</span>
                  /<span className="movie__data-origin">{movie.origin}</span>
                </p>
              </div>
            </div>
            {movie.seances.map((seance: any) => (
              <div className="movie-seances__hall">
                <ul className="movie-seances__list">
                  {seance.time.map((time: any, index: number) => (
                    <li className="movie-seances__time-block" key={index}>
                      <a className="movie-seances__time" href="#">
                        {time}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}

        {/* <div className="conf-step__movies">
            <div className="conf-step__movie">
              <img
                className="conf-step__movie-poster"
                alt="poster"
                src="i/poster.png"
              />
              <h3 className="conf-step__movie-title">
                Звёздные войны XXIII: Атака клонированных клонов
              </h3>
              <p className="conf-step__movie-duration">130 минут</p>
            </div>

            <div className="conf-step__movie">
              <img
                className="conf-step__movie-poster"
                alt="poster"
                src="i/poster.png"
              />
              <h3 className="conf-step__movie-title">Миссия выполнима</h3>
              <p className="conf-step__movie-duration">120 минут</p>
            </div>

            <div className="conf-step__movie">
              <img
                className="conf-step__movie-poster"
                alt="poster"
                src="i/poster.png"
              />
              <h3 className="conf-step__movie-title">Серая пантера</h3>
              <p className="conf-step__movie-duration">90 минут</p>
            </div>

            <div className="conf-step__movie">
              <img
                className="conf-step__movie-poster"
                alt="poster"
                src="i/poster.png"
              />
              <h3 className="conf-step__movie-title">Движение вбок</h3>
              <p className="conf-step__movie-duration">95 минут</p>
            </div>

            <div className="conf-step__movie">
              <img
                className="conf-step__movie-poster"
                alt="poster"
                src="i/poster.png"
              />
              <h3 className="conf-step__movie-title">Кот Да Винчи</h3>
              <p className="conf-step__movie-duration">100 минут</p>
            </div>
          </div> */}

        {/* <div className="conf-step__seances">
            <div className="conf-step__seances-hall">
              <h3 className="conf-step__seances-title">Зал 1</h3>
              <div className="conf-step__seances-timeline">
                <div className="conf-step__seances-movie">
                  <p className="conf-step__seances-movie-title">
                    Миссия выполнима
                  </p>
                  <p className="conf-step__seances-movie-start">00:00</p>
                </div>
                <div className="conf-step__seances-movie">
                  <p className="conf-step__seances-movie-title">
                    Миссия выполнима
                  </p>
                  <p className="conf-step__seances-movie-start">12:00</p>
                </div>
                <div className="conf-step__seances-movie">
                  <p className="conf-step__seances-movie-title">
                    Звёздные войны XXIII: Атака клонированных клонов
                  </p>
                  <p className="conf-step__seances-movie-start">14:00</p>
                </div>
              </div>
            </div>
            <div className="conf-step__seances-hall">
              <h3 className="conf-step__seances-title">Зал 2</h3>
              <div className="conf-step__seances-timeline">
                <div className="conf-step__seances-movie">
                  <p className="conf-step__seances-movie-title">
                    Звёздные войны XXIII: Атака клонированных клонов
                  </p>
                  <p className="conf-step__seances-movie-start">19:50</p>
                </div>
                <div className="conf-step__seances-movie">
                  <p className="conf-step__seances-movie-title">
                    Миссия выполнима
                  </p>
                  <p className="conf-step__seances-movie-start">22:00</p>
                </div>
              </div>
            </div>
          </div> */}

        {/* <fieldset className="conf-step__buttons text-center">
            <button className="conf-step__button conf-step__button-regular">
              Отмена
            </button>
            <input
              type="submit"
              value="Сохранить"
              className="conf-step__button conf-step__button-accent"
            />
          </fieldset> */}
      </div>
    </section>
  );
};
