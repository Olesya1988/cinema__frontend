import { useLocation } from "react-router-dom";

export const TicketPage = (props: any) => {
  const location = useLocation();
  const { state } = location;

  let places = state.from.newTicket;
  let seats = [];

  for (let i = 0; i < places.length; i++) {
    for (let j = 0; j < places[i].length; j++) {
      if (places[i][j] === "yes") {
        if (i === 0) {
          seats.push(j + 1);
        } else {
          seats.push(places[i].length * i + j + 1);
        }
      }
    }
  }

  let seatsToString = seats.join(", ");

  if (seats.length === 0) {
    seatsToString = 'Место не выбрано или выбрано уже занятое место';
  }

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
                {state.from.title}
              </span>
            </p>
            <p className="ticket__info">
              Дата:{" "}
              <span className="ticket__details ticket__start">
                {state.from.date}
              </span>
            </p>
            <p className="ticket__info">
              Начало сеанса:{" "}
              <span className="ticket__details ticket__start">
                {state.from.time}
              </span>
            </p>
            <p className="ticket__info">
              В зале:{" "}
              <span className="ticket__details ticket__hall">
                {state.from.hall}
              </span>
            </p>
            <p className="ticket__info">
              Места:{" "}
              <span className="ticket__details ticket__chairs">
                {seatsToString}
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
