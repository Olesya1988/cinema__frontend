interface IHall {
  id: number;
  rows: number;
  seats: number;
  places: Array<string[]>;
  prices: {};
}

interface IHallManagement {
  halls: IHall[];
  onDeleteHallHandler: any;
  createHall: any;
}

export const HallManagement = ({
  halls,
  onDeleteHallHandler,
  createHall,
}: IHallManagement) => {
  return (
    <section className="conf-step">
      <header className="conf-step__header conf-step__header_opened">
        <h2 className="conf-step__title">Управление залами</h2>
      </header>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Доступные залы:</p>
        <ul className="conf-step__list">
          {halls.map((hall: any) => (
            <li className="hall-view" key={hall.id} id={hall.id}>
              Зал {hall.id}
              <button
                className="conf-step__button conf-step__button-trash"
                onClick={onDeleteHallHandler}
              ></button>
            </li>
          ))}
        </ul>
        <button
          className="conf-step__button conf-step__button-accent"
          onClick={createHall}
        >
          Создать зал
        </button>
      </div>
    </section>
  );
};
