import cn from "classnames";
import { useState } from "react";

interface ISessionGrid {  
  onAddMovieHandler: any;
  onSubmitMovieHandler: any;
  movies: any;  
}

export const SessionGrid = ({ onAddMovieHandler, onSubmitMovieHandler, movies}: ISessionGrid) => {
    
  const onClickHandler = () => {
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
            onClick={onClickHandler}
          >
            Добавить фильм
          </button>
        </p>
        <div className={cn("invisible", "movie-add__form__wrapper")}>
            
          <form className="movie-add__form" onSubmit={onSubmitMovieHandler}>
          <div className="close" onClick={onClickHandler}>X</div>
            <div className="movie-add__input">
              <span>Введите название фильма</span>
              <input type="text" name="title" onChange={onAddMovieHandler} />
            </div>
            <div className="movie-add__input">
              <span>Введите описание фильма</span>
              <input type="text" name="synopsis" onChange={onAddMovieHandler} />
            </div>
            <div className="movie-add__input">
              <span>Загрузите постер фильма</span>
              <input type="text" name="img" onChange={onAddMovieHandler} />
            </div>
            <div className="movie-add__input">
              <span>Введите продолжительность фильма</span>
              <input type="text" name="duration" onChange={onAddMovieHandler} />
            </div>
            <div className="movie-add__input">
              <span>Введите название страны, выпустившей фильм</span>
              <input type="text" name="origin" onChange={onAddMovieHandler} />
            </div>
            <div className="movie-add__input" onChange={onAddMovieHandler} >
              <span>Введите дату</span>
              <input type="text" name="date" onChange={onAddMovieHandler} />
            </div>
            <div className="movie-add__input">
              <span>Введите номер зала</span>
              <input type="text" name="hall" onChange={onAddMovieHandler} />
            </div>
            <div className="movie-add__input">
              <span>Введите время начала сеанса</span>
              <input type="text" name="time" onChange={onAddMovieHandler} />
            </div>
            <button className="movie-add__submit" onClick={onClickHandler}>Сохранить</button>
          </form>
        </div>

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
