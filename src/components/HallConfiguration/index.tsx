import cn from "classnames";

interface IHall {
  id: number;
  rows: number;
  seats: number;
  places: Array<{}[]>;
  prices: {};
}

interface IHallConfiguration {
  halls: IHall[];
  onClickHandler: any;  
  places: any;  
  onChange: any;
  onSubmitPlacesHandler: any;
}

export const HallConfiguration = ({
  halls,
  onClickHandler,  
  places,  
  onChange,
  onSubmitPlacesHandler,
}: IHallConfiguration) => { 
  return (
    <section className="conf-step">
      <header className="conf-step__header conf-step__header_opened">
        <h2 className="conf-step__title">Конфигурация залов</h2>
      </header>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
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
        <p className="conf-step__paragraph">
          Теперь вы можете указать типы кресел на схеме зала:
        </p>
        <div className="conf-step__legend">
          <span className="conf-step__chair standart"></span> — обычные кресла
          <span className="conf-step__chair vip"></span> — VIP кресла
          (нет кресла)
          <p className="conf-step__hint">
            Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши
          </p>
        </div>

        <div className="conf-step__hall">
          <div className="conf-step__hall-wrapper">
            {places.map((place: any) => (
              <div className="conf-step__row">
                {place.map((item: string, index: number) => (
                  <select
                    className={cn("conf-step__chair", place[index])}
                    onChange={onChange}
                  >
                    <option
                      className="conf-step__chair__option"
                      value="standart"
                    >
                      standart
                    </option>
                    <option className="conf-step__chair__option" value="vip">
                      vip
                    </option>
                  </select>
                ))}
              </div>
            ))}
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
            onClick={onSubmitPlacesHandler}
          />
        </fieldset>
      </div>
    </section>
  );
};
