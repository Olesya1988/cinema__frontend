import { useEffect, useState } from "react";

export const TicketPage = () => {
  const [ticket, setTicket] = useState({
    id: "",
    title: "",
    date: "",
    time: "",
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
              В зале:{" "}
              <span className="ticket__details ticket__hall">
                {ticket.hall}
              </span>
            </p>
            <p className="ticket__info">
              Начало сеанса:{" "}
              <span className="ticket__details ticket__start">
                {ticket.time}
              </span>
            </p>

            <img className="ticket__info-qr" />

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
