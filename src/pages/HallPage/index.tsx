import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import cn from "classnames";

export interface IHall {
  id: number;
  title: string;
  places: [];
  hall: string;
  seances: string;
}

export const HallPage = () => {
  const [ticket, setTicket] = useState({
    id: "1",
    title: "Титаник",
    date: "22.05",
    time: "14:00",
    hall: 1,
    places: [],
  });

  const url = "http://localhost:7070/ticket";

  const getTicket = async () => {
    const response = await fetch(url, {
      method: "GET",
    });
    const result = await response.json();

    let currentTicketId = window.localStorage.getItem("ticketId");

    let currenTicket = result.filter(
      (ticket: any) => `"${ticket.id}"` == currentTicketId
    );

    setTicket(currenTicket[0]);
  };

  const updateTicket = async (id: string, places: string[][]) => {
    const ticket = {
      id,
      places,
    };

    await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(ticket),
    });
  };

  const onCheckTicket = () => {
    let arr: any = Array.from(document.querySelectorAll(".buying-scheme__row"));
    console.log(arr);
    let newArr: any = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(...[arr[i].querySelectorAll(".buying-scheme__chair")]);
    }
    console.log(newArr);
    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr[i].length; j++) {
        // if(newArr[i][j].classList[2]) {
        //   newArr[i][j] = 'selected';
        // } else {
        //   newArr[i][j] = '';
        // }
      }
    }
    console.log(newArr);
    let places = [
      ["", "selected"],
      ["", "selected"],
    ];

    updateTicket(ticket.id, places);
  };

  const [halls, setHalls] = useState([
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
  const url2 = "http://localhost:7070/halls";

  const getHalls = async () => {
    const response = await fetch(url2, {
      method: "GET",
    });
    const result = await response.json();
    console.log(result);
    setHalls(result);
  };

  const [activeHall, setActiveHall] = useState(0);

  let places = halls[activeHall].places;

  const onClickHandler = (e: any) => {
    e.preventDefault();
    const target = e.target;
    target.classList.toggle("buying-scheme__chair_selected");
  };

  const loadData = () => {
    getTicket();
    getHalls();
  };

  useEffect(loadData, []);

  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">
          Идём<span>в</span>кино
        </h1>
      </header>

      <main>
        <section className="buying">
          <div className="buying__info">
            <div className="buying__info-description">
              <h2 className="buying__info-title">{ticket.title}</h2>
              <p className="buying__info-start">Начало сеанса: {ticket.time}</p>
              <p className="buying__info-hall">Зал {ticket.hall}</p>
            </div>
            <div className="buying__info-hint">
              <p>
                Тапните дважды,
                <br />
                чтобы увеличить
              </p>
            </div>
          </div>
          <div className="buying-scheme">
            <div className="buying-scheme__wrapper">
              {places.map((place: any) => (
                <div className="buying-scheme__row">
                  {place.map((item: string, index: number) => (
                    <div
                      className={cn("buying-scheme__chair", place[index])}
                      onClick={onClickHandler}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="buying-scheme">
            {/* <div className="buying-scheme__wrapper">
              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_selected"></span>
                <span className="buying-scheme__chair buying-scheme__chair_selected"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
              </div>

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span>
              </div>
            </div> */}
            <div className="buying-scheme__legend">
              <div className="col">
                <p className="buying-scheme__legend-price">
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span>{" "}
                  Свободно (
                  <span className="buying-scheme__legend-value">250</span>руб)
                </p>
                <p className="buying-scheme__legend-price">
                  <span className="buying-scheme__chair buying-scheme__chair_vip"></span>{" "}
                  Свободно VIP (
                  <span className="buying-scheme__legend-value">350</span>руб)
                </p>
              </div>
              <div className="col">
                <p className="buying-scheme__legend-price">
                  <span className="buying-scheme__chair buying-scheme__chair_taken"></span>{" "}
                  Занято
                </p>
                <p className="buying-scheme__legend-price">
                  <span className="buying-scheme__chair buying-scheme__chair_selected"></span>{" "}
                  Выбрано
                </p>
              </div>
            </div>
          </div>
          <NavLink to="/ticket">
            <button className="acceptin-button" onClick={onCheckTicket}>
              Забронировать
            </button>
          </NavLink>
        </section>
      </main>
    </>
  );
};
