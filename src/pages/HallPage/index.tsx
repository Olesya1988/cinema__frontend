import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import cn from "classnames";

type GenerateId = () => string;
export const generateId: GenerateId = () =>
  Math.random().toString(16).slice(2) + new Date().getTime().toString(36);

export interface IHall {
  id: number;
  title: string;
  places: [];
  hall: string;
  seances: string;
}

export const HallPage = (props: any) => {
  const location = useLocation();
  const { state } = location;

  const [ticket, setTicket] = useState([
    [ 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no' ],
    [ 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no' ],
    [ 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no' ],
    [ 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no' ],
    [ 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no' ],
    [ 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no' ],
    [ 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no' ],
    [ 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no' ],
    [ 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no' ],
    [ 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no' ],
  ]);
  

  const url = "http://localhost:7070/ticket";

  const getTicket = async () => {
    const response = await fetch(url, {
      method: "GET",
    });
    const result = await response.json();
    
    const newResult = result.filter(
      (item: any) =>
        item.title === state.from.title &&
        item.time === state.from.time &&
        item.hall === state.from.hall &&
        item.date === state.from.date
    );   

    let arr: any = [];

    for (let i = 0; i < newResult.length; i++) {
      arr.push(newResult[i].places);
    }

    let newArr = arr[0];

    for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        for (let k = 0; k < arr[i][j].length; k++) {
          if (arr[i][j][k] === "yes") {
            newArr[j][k] = "yes";
          }
        }
      }
    }
    if (newResult.length) {
      setTicket(newArr);
    }    
    
  };

  const createTicket = async (places: string[][]) => {
    const ticket = {
      id: generateId(),
      places,
      title: state.from.title,
      time: state.from.time,
      hall: state.from.hall,
      date: state.from.date,
    };    

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(ticket),
    });

  };

  const onCheckTicket = () => {
    let arr: any = Array.from(document.querySelectorAll(".buying-scheme__row2"));
    let newArr: any = [];

    for (let i = 0; i < arr.length; i++) {
      newArr.push(
        ...[Array.from(arr[i].querySelectorAll(".buying-scheme__chair"))]
      );
    }

    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr[i].length; j++) {
        if (
          newArr[i][j].classList[2] &&
          newArr[i][j].classList[1] !== "yes"
        ) {
          newArr[i][j] = "yes";
        } else {
          newArr[i][j] = "no";
        }
      }
    }    
    createTicket(newArr); 
  };

  const [halls, setHalls] = useState([
    {
      id: 1,
      rows: 10,
      seats: 8,
      places: [
        ["standart", "standart", "standart", "standart", "standart", "standart", "standart", "standart"],
        ["standart", "standart", "standart", "standart", "standart", "standart", "standart", "standart"],
        ["standart", "standart", "standart", "standart", "standart", "standart", "standart", "standart"],
        ["standart", "standart", "standart", "standart", "standart", "standart", "standart", "standart"],
        ["standart", "standart", "standart", "standart", "standart", "standart", "standart", "standart"],
        ["standart", "standart", "standart", "standart", "standart", "standart", "standart", "standart"],
        ["standart", "standart", "standart", "standart", "standart", "standart", "standart", "standart"],
        ["standart", "standart", "standart", "standart", "standart", "standart", "standart", "standart"],
        ["standart", "standart", "standart", "standart", "standart", "standart", "standart", "standart"],
        ["standart", "standart", "standart", "standart", "standart", "standart", "standart", "standart"],
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

    setHalls(result);
    setActiveHall(state.from.hall - 1);
  };

  const [activeHall, setActiveHall] = useState(0);  

  let places: any[] = halls[activeHall].places;  
  const [newTicket, setNewTicket] = useState([['no', 'no']]);   

  const onClickHandler = (e: any) => {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains("no")) {
      target.classList.toggle("buying-scheme__chair_selected");
    }
    

    let arr: any = Array.from(document.querySelectorAll(".buying-scheme__row2"));
    let newArr: any = [];

    for (let i = 0; i < arr.length; i++) {
      newArr.push(
        ...[Array.from(arr[i].querySelectorAll(".buying-scheme__chair"))]
      );
    }

    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr[i].length; j++) {
        if (
          newArr[i][j].classList[2] &&
          newArr[i][j].classList[1] !== "yes"
        ) {
          newArr[i][j] = "yes";
        } else {
          newArr[i][j] = "no";
        }
      }
    }
    
    setNewTicket(newArr);
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
              <h2 className="buying__info-title">{state.from.title}</h2>
              <p className="buying__info-start">
                Дата: {state.from.date}
              </p>
              <p className="buying__info-start">
                Начало сеанса: {state.from.time}
              </p>
              <p className="buying__info-hall">Зал {state.from.hall}</p>
            </div>
          </div>
          <div className="buying-scheme">
            <div className="buying-scheme__wrapper">            
              {places.map((place: any) => (
                <div className="buying-scheme__row">
                  {place.map((item: string, index: number) => (
                    <div
                      className={cn(
                        "buying-scheme__chair",
                        place[index],
                      )}
                      onClick={onClickHandler}
                    ></div>
                  ))}
                </div>
              ))}
              <div className="buying-scheme__wrapper_copy">
              {ticket.map((place: any) => (
                <div className="buying-scheme__row2">
                  {place.map((item: string, index: number) => (
                    <div
                      className={cn(
                        "buying-scheme__chair",
                        place[index],
                      )}
                      onClick={onClickHandler}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
            </div>
            <div className="buying-scheme__info">
              <p>
                <div className="buying-scheme__chair_vip"></div><span>VIP-места</span>
              </p>
              <p>
                <div className="buying-scheme__chair_standart"></div><span>Обычные места</span>
              </p>
              <p>
                <div className="buying-scheme__chair_taken"></div><span>Занятые места</span>
              </p>
            </div>
          </div>          
          <NavLink to="/ticket" state={{from: {newTicket, title: state.from.title, hall: state.from.hall, time: state.from.time, date: state.from.date}}}>
            <button className="acceptin-button" onClick={onCheckTicket}>
              Забронировать
            </button>
          </NavLink>
        </section>
      </main>
    </>
  );
};
