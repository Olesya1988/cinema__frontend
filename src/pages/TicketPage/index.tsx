import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdminPage } from "../AdminPage";


export const TicketPage = () => {

  const [ticket, seTicket] = useState({
    title: '',
    seances: '',
    hall: 1,
  });

  const url = "http://localhost:7070/ticket";

  const getTicket = async () => {    
    const response = await fetch(url, {
      method: "GET",
    });
    const result = await response.json();
    console.log(result);
    seTicket(result);
  };

  const loadData = () => {   
    getTicket();
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
        <section className="ticket">
          <header className="tichet__check">
            <h2 className="ticket__check-title">Электронный билет</h2>
          </header>

          <div className="ticket__info-wrapper">
            <p className="ticket__info">
              На фильм:{" "}
              <span className="ticket__details ticket__title">
                {ticket.title}
              </span>
            </p>
            <p className="ticket__info">
              Места:{" "}
              <span className="ticket__details ticket__chairs">6, 7</span>
            </p>
            <p className="ticket__info">
              В зале: <span className="ticket__details ticket__hall">{ticket.hall}</span>
            </p>
            <p className="ticket__info">
              Начало сеанса:{" "}
              <span className="ticket__details ticket__start">{ticket.seances}</span>
            </p>

            <img className="ticket__info-qr" src="./images/qr-code.png" />

            <p className="ticket__hint">
              Покажите QR-код нашему контроллеру для подтверждения бронирования.
            </p>
            <p className="ticket__hint">Приятного просмотра!</p>
          </div>
        </section>
      </main>
    </>
  );
};
