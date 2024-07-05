import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { HallManagement } from "../../components/HallManagement";
import { HallConfiguration } from "../../components/HallConfiguration";
import { PriceConfiguration } from "../../components/PriceConfiguration";
import "./styles.css";
import { SessionGrid } from "../../components/SessionGrid";

type GenerateId = () => string;
export const generateId: GenerateId = () =>
  Math.random().toString(16).slice(2) + new Date().getTime().toString(36);

interface IHall {
  id: number;
  rows: number;
  seats: number;
  places: Array<string[]>;
  prices: {};
}

export interface IMovie {
  id: string;
  title: string;
  synopsis: string;
  img: string;
  duration: string;
  origin: string;
  date: string;
  seances: [];
}

interface IMovies {
  movies: IMovie[];
  getAllMovies: any;
}

export const AdminPage = ({ movies, getAllMovies }: IMovies) => {
  const [halls, setHalls] = useState<IHall[]>([
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
    deleteHall(target.closest(".hall-view").id);
  };

  const [activeHall, setActiveHall] = useState(0);

  let places = halls[activeHall].places;  

  const [formEdit, setFormEdit] = useState({
    rows: 0,
    seats: 0,
  });

  const url2 = "http://localhost:7070/places";

  const updatePlaces = async (id: number, rows: number, seats: number, updatedPlaces: []) => {
    const places = {
      id,
      rows,
      seats,
      updatedPlaces,
    };
    await fetch(`${url2}/${id}`, {
      method: "PUT",
      body: JSON.stringify(places),
    });
    getHalls();
  };

  const onUpdatePlacesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormEdit((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitPlacesHandler = (e: any) => {
    e.preventDefault();

    let arr: any = Array.from(document.querySelectorAll(".conf-step__row"));
    let newArr: any = [];

    for (let i = 0; i < arr.length; i++) {
      newArr.push(
        ...[Array.from(arr[i].querySelectorAll(".conf-step__chair"))]
      );
    }

    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr[i].length; j++) {
        newArr[i][j] = newArr[i][j].classList[1];
      }
    }
    updatePlaces(activeHall, formEdit.rows, formEdit.seats, newArr);
    setFormEdit({ rows: 0, seats: 0 });
  };

  const onClickHandler = (e: any) => {
    e.preventDefault();
    const target = e.target;
    let arr: any[] = Array.from(target.closest("ul").querySelectorAll('li'));
    arr.forEach(el => el.classList.remove('conf-step__radio__checked'));
    target.closest("li").classList.add('conf-step__radio__checked');
    getActiveHall(target.closest("li").id);
  };

  const getActiveHall = (id: number) => {
    setActiveHall(id - 1);
  };

  const onChange = (e: any) => {
    e.preventDefault();
    const target = e.target;
    target.classList.remove(target.classList.item(1));
    target.classList.add(target.value);
  };

  const [form, setForm] = useState({
    id: "",
    title: "",
    synopsis: "",
    img: "",
    duration: "",
    origin: "",
    date: "",
    hall: "",
    time: "",
  });

  const url3 = "http://localhost:7070/movies";

  const createMovie = async (
    title: string,
    synopsis: string,
    img: string,
    duration: string,
    origin: string,
    date: string,
    hall: string,
    time: string
  ) => {
    const movie = {
      id: generateId(),
      title,
      synopsis,
      img,
      duration,
      origin,
      date,
      seances: [
        {
          hall,
          time,
        },
      ],
    };
    await fetch(url3, {
      method: "POST",
      body: JSON.stringify(movie),
    });
    getAllMovies();
  };

  const onAddMovieHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitMovieHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMovie(
      form.title,
      form.synopsis,
      form.img,
      form.duration,
      form.origin,
      form.date,
      form.hall,
      form.time
    );
    setForm({
      id: "",
      title: "",
      synopsis: "",
      img: "",
      duration: "",
      origin: "",
      date: "",
      hall: "",
      time: "",
    });
  };

  const deleteMovie = async (id: number) => {
    await fetch(`${url3}/${id}`, {
      method: "DELETE",
    });
    getAllMovies();
  };

  const onDeleteMovieHandler = (e: any) => {
    e.preventDefault();
    const target = e.target;
    deleteMovie(target.closest(".movie__info").id);
  };

  let activeMovies = movies.filter(
    (movie: any) => Number(movie.seances[0].hall) === activeHall + 1
  );  

  const [formEditPrice, setFormEditPrice] = useState({
    standart: 0,
    vip: 0,
  });

  const [activeHallForPrice, setActiveHallForPrice] = useState(0);

  const onClickHandlerForPrice = (e: any) => {
    e.preventDefault();
    const target = e.target;
    let arr: any[] = Array.from(target.closest("ul").querySelectorAll('li'));    
    arr.forEach(el => el.classList.remove('conf-step__radio__checked'));    
    target.closest("li").classList.add('conf-step__radio__checked');
    getActiveHallForPrice(target.closest("li").id);
  };

  const getActiveHallForPrice = (id: number) => {
    setActiveHallForPrice(id - 1);
  };

  const url4 = "http://localhost:7070/prices";

  const updatePrice = async (id: number, standart: number, vip: number) => {
    const price = {
      id,
      standart,
      vip,
    };
    await fetch(`${url4}/${id}`, {
      method: "PUT",
      body: JSON.stringify(price),
    });
    getHalls();
  };

  const onUpdatePriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;    
    setFormEditPrice((prev) => ({ ...prev, [name]: value }));    
  };

  const onSubmitPriceHandler = (e: any) => {
    e.preventDefault();
    updatePrice(activeHall, formEditPrice.standart, formEditPrice.vip);
    setFormEditPrice({ standart: 0, vip: 0 });
  };

  let prices = halls[activeHallForPrice].prices;

  return (
    <div className="login-contaiter">
      <nav className="admin">
        <NavLink to="/">
          <button className="admin-enter">Выход</button>
        </NavLink>
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
        <HallConfiguration
          halls={halls}
          onClickHandler={onClickHandler}          
          places={places}          
          onChange={onChange}
          onSubmitPlacesHandler={onSubmitPlacesHandler}
        />

        <PriceConfiguration
          halls={halls}
          onClickHandlerForPrice={onClickHandlerForPrice}
          prices={prices}
          onUpdatePriceHandler={onUpdatePriceHandler}
          onSubmitPriceHandler={onSubmitPriceHandler}
        />
        <SessionGrid
          onAddMovieHandler={onAddMovieHandler}
          onSubmitMovieHandler={onSubmitMovieHandler}
          onClickHandler={onClickHandler}
          activeMovies={activeMovies}
          halls={halls}          
          onDeleteMovieHandler={onDeleteMovieHandler}
        />
      </main>
    </div>
  );
};
