import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { HallManagement } from "../../components/HallManagement";
import { HallConfiguration } from "../../components/HallConfiguration";
import { PriceConfiguration } from "../../components/PriceConfiguration";
import "./styles.css";

interface IHall {
  id: number;
  rows: number;
  seats: number;
  places: Array<string[]>;
  prices: {};
}

export const AdminPage = () => {
  const [halls, setHalls] = useState<IHall[]>([
    {
      id: 1,
      rows: 10,
      seats: 8,
      places: [
        [
          "disabled",
          "disabled",
          "disabled",
          "standart",
          "standart",
          "disabled",
          "disabled",
          "disabled",
        ],
        [
          "disabled",
          "disabled",
          "disabled",
          "standart",
          "standart",
          "disabled",
          "disabled",
          "disabled",
        ],
        [
          "disabled",
          "disabled",
          "disabled",
          "standart",
          "standart",
          "disabled",
          "disabled",
          "disabled",
        ],
        [
          "disabled",
          "disabled",
          "disabled",
          "standart",
          "standart",
          "disabled",
          "disabled",
          "disabled",
        ],
        [
          "disabled",
          "disabled",
          "disabled",
          "vip",
          "standart",
          "disabled",
          "disabled",
          "disabled",
        ],
        [
          "disabled",
          "disabled",
          "disabled",
          "vip",
          "vip",
          "disabled",
          "disabled",
          "disabled",
        ],
        [
          "disabled",
          "disabled",
          "disabled",
          "vip",
          "vip",
          "disabled",
          "disabled",
          "disabled",
        ],
        [
          "disabled",
          "disabled",
          "disabled",
          "standart",
          "standart",
          "disabled",
          "disabled",
          "disabled",
        ],
        [
          "disabled",
          "disabled",
          "disabled",
          "standart",
          "standart",
          "disabled",
          "disabled",
          "disabled",
        ],
        [
          "disabled",
          "disabled",
          "disabled",
          "standart",
          "standart",
          "disabled",
          "disabled",
          "disabled",
        ],
      ],
      prices: { standart: 200, vip: 350 },
    },
  ]);

  const url = "http://localhost:7070/halls";

  const getHalls = async () => {
    const response = await fetch(url, {
      method: "GET",
    });
    const result = await response.json();
    setHalls(result);
  };

  const loadData = () => {
    getHalls();
  };

  useEffect(loadData, []);

  const createHall = async () => {
    await fetch(url, {
      method: "POST",
    });
    getHalls();
  };

  const deleteHall = async (id: number) => {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    getHalls();
  };

  const onDeleteHallHandler = (e: any) => {
    e.preventDefault();
    const target = e.target;
    console.log(target.closest(".hall-view").id);
    deleteHall(target.closest(".hall-view").id);
  };

  return (
    <div className="login-contaiter">
      <nav className="admin">
        <NavLink to="/"><button className="admin-enter">Выход</button></NavLink>
      </nav>
      <header className="page-header">
        <h1 className="page-header__title">
          Идём<span>в</span>кино
        </h1>
        <span className="page-header__subtitle">Администраторррская</span>
      </header>

      <main className="conf-steps">
        <HallManagement
          halls={halls}
          onDeleteHallHandler={onDeleteHallHandler}
          createHall={createHall}
        />
        <HallConfiguration halls={halls} />

        <PriceConfiguration halls={halls} />

        <section className="conf-step">
          <header className="conf-step__header conf-step__header_opened">
            <h2 className="conf-step__title">Сетка сеансов</h2>
          </header>
          <div className="conf-step__wrapper">
            <p className="conf-step__paragraph">
              <button className="conf-step__button conf-step__button-accent">
                Добавить фильм
              </button>
            </p>
            <div className="conf-step__movies">
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
            </div>

            <div className="conf-step__seances">
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
            </div>

            <fieldset className="conf-step__buttons text-center">
              <button className="conf-step__button conf-step__button-regular">
                Отмена
              </button>
              <input
                type="submit"
                value="Сохранить"
                className="conf-step__button conf-step__button-accent"
              />
            </fieldset>
          </div>
        </section>

        <section className="conf-step">
          <header className="conf-step__header conf-step__header_opened">
            <h2 className="conf-step__title">Открыть продажи</h2>
          </header>
          <div className="conf-step__wrapper text-center">
            <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
            <button className="conf-step__button conf-step__button-accent">
              Открыть продажу билетов
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
