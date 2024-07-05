interface IHall {
  id: number;
  rows: number;
  seats: number;
  places: Array<string[]>;
  prices: any;
}

interface PriceConfiguration {
  halls: IHall[];
  onClickHandlerForPrice: any;
  prices: any;
  onUpdatePriceHandler: any;
  onSubmitPriceHandler: any;
}

export const PriceConfiguration = ({
  halls,
  onClickHandlerForPrice,
  prices,
  onUpdatePriceHandler,
  onSubmitPriceHandler,
}: PriceConfiguration) => {
  return (
    
    <section className="conf-step">
      <header className="conf-step__header conf-step__header_opened">
        <h2 className="conf-step__title">Конфигурация цен</h2>
      </header>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
        <ul className="conf-step__selectors-box">
          {halls.map((hall: any) => (
            <li key={hall.id} id={hall.id} onClick={onClickHandlerForPrice}>
              <input
                type="radio"
                className="conf-step__radio"
                name="prices-hall"
                value="Зал 1"
              />
              <span className="conf-step__selector">Зал {hall.id}</span>
            </li>
          ))}
        </ul>

        <p className="conf-step__paragraph">
          Установите цены для типов кресел:
        </p>
        <div className="conf-step__legend">
          <label className="conf-step__label">
            Цена, рублей
            <input
              type="text"
              name="standart"
              className="conf-step__input"              
              onChange={onUpdatePriceHandler}
              value={prices.standart}
            />
          </label>
          за <span className="conf-step__chair standart"></span> обычные кресла
        </div>
        <div className="conf-step__legend">
          <label className="conf-step__label">
            Цена, рублей
            <input
              type="text"
              name="vip"
              className="conf-step__input"              
              onChange={onUpdatePriceHandler}
              value={prices.vip}
            />
          </label>
          за <span className="conf-step__chair vip"></span> VIP кресла
        </div>

        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular">
            Отмена
          </button>
          <input
            type="submit"
            value="Сохранить"
            className="conf-step__button conf-step__button-accent"
            onClick={onSubmitPriceHandler}
          />
        </fieldset>
      </div>
    </section>
  );
};
