import { useState } from "react";

interface IHall {
  id: number;
  rows: number;
  seats: number;
  places: Array<string[]>;
  prices: any;
}

interface PriceConfiguration {
  halls: IHall[];
}

export const PriceConfiguration = ({ halls }: PriceConfiguration) => {
  console.log(halls);
  const [activeHall, setActiveHall] = useState(0);

  const [formEdit, setFormEdit] = useState({
    standart: 0,
    vip: 0,
  });

  const url = "http://localhost:7070/halls";

  const updatePrice = async (id: number, standart: number, vip: number) => {
    const price = {
      id,
      standart,
      vip,
    };
    await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(price),
    });
  };
  const onUpdatePriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // отправляем текст из input редактирования в state формы редактирования
    const { name, value } = e.target;
    setFormEdit((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitPriceHandler = (e: any) => {
    // отправляем текст из state формы редактирования на сервер
    e.preventDefault();
    updatePrice(activeHall, formEdit.standart, formEdit.vip);
    setFormEdit({ standart: 0, vip: 0, });   
  };

  const onClickHandler = (e: any) => {
    e.preventDefault();
    const target = e.target;

    getActiveHall(target.closest("li").id);
  };

  const getActiveHall = (id: number) => {
    setActiveHall(id - 1);
    console.log(id);
  };

  return (
    <section className="conf-step">
      <header className="conf-step__header conf-step__header_opened">
        <h2 className="conf-step__title">Конфигурация цен</h2>
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
              placeholder={halls[activeHall].prices.standart}
              onChange={onUpdatePriceHandler}
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
              placeholder={halls[activeHall].prices.vip}
              onChange={onUpdatePriceHandler}
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
