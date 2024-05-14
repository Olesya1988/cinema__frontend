import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { HallManagement } from "../../components/HallManagement";
import { HallConfiguration } from "../../components/HallConfiguration";
import { PriceConfiguration } from "../../components/PriceConfiguration";
import "./styles.css";
import { SessionGrid } from "../../components/SessionGrid";

interface IHall {
  id: number;
  rows: number;
  seats: number;
  places: Array<string[]>;
  prices: {};
}

export interface IMovie {
  id: number;
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
}

export const AdminPage = ({ movies }: IMovies) => {
  const [halls, setHalls] = useState<IHall[]>([
    {
      id: 1,
      rows: 10,
      seats: 8,
      places: [
        ["disabled", "disabled", "disabled", "standart", "standart", "disabled", "disabled", "disabled"],
        ["disabled", "disabled", "disabled", "standart", "standart", "disabled", "disabled", "disabled"],
        ["disabled", "disabled", "disabled", "standart", "standart", "disabled", "disabled", "disabled"],
        ["disabled", "disabled", "disabled", "standart", "standart", "disabled", "disabled", "disabled"],
        ["disabled", "disabled", "disabled", "standart", "standart", "disabled", "disabled", "disabled"],
        ["disabled", "disabled", "disabled", "standart", "standart", "disabled", "disabled", "disabled"],
        ["disabled", "disabled", "disabled", "standart", "standart", "disabled", "disabled", "disabled"],
        ["disabled", "disabled", "disabled", "standart", "standart", "disabled", "disabled", "disabled"],
        ["disabled", "disabled", "disabled", "standart", "standart", "disabled", "disabled", "disabled"],        
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
    console.log(result);
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
    console.log(target.closest(".hall-view").id);
    deleteHall(target.closest(".hall-view").id);
  };

  const [activeHall, setActiveHall] = useState(0);
  const [currentPlaces, setCurrentPlaces] = useState([]);

  let places = halls[activeHall].places;

  const [formEdit, setFormEdit] = useState({
    rows: 0,
    seats: 0,
  });

  const url2 = "http://localhost:7070/places";

  const updatePlaces = async (id: number, rows: number, seats: number) => {
    const places = {
      id,
      rows,
      seats,
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
    updatePlaces(activeHall, formEdit.rows, formEdit.seats);
    setFormEdit({ rows: 0, seats: 0 });
    let arr: any = Array.from(document.querySelectorAll(".conf-step__row"));
    console.log(arr);
    let newArr: any = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(...[arr[i].querySelectorAll(".conf-step__chair")]);
    }
    console.log(newArr);

    for (let i = 0; i < newArr.length; i++) {
      for (let j = 0; j < newArr[i].length; j++) {
        console.log(newArr[i][j].classList[1]);
        // newArr[i][j] = newArr[i][j].classList[1];
      }
    }

    console.log(newArr);
  };

  const onClickHandler = (e: any) => {
    e.preventDefault();
    const target = e.target;

    getActiveHall(target.closest("li").id);
  };

  const getActiveHall = (id: number) => {
    setActiveHall(id - 1);
  };

  const onChange = (e: any)  => {
    e.preventDefault();
    const target = e.target;
    target.classList.remove(target.classList.item(1));
    target.classList.add(target.value);
  }

  const [form, setForm] = useState({        
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

  const createMovie = async (title: string, synopsis: string, img: string, duration: string, origin: string, date: string, hall: string, time: string) => {    
    const movie = {
        title,
        synopsis,
        img,
        duration,
        origin,
        date,
        seances: [{
            hall,
            time,
        }]
    };
    await fetch(url3, {
      method: "POST",
      body: JSON.stringify(movie),
    });
    
  };

  const onAddMovieHandler = (e: React.ChangeEvent<HTMLInputElement>) => {    
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitMovieHandler = (e: React.FormEvent<HTMLFormElement>) => {    
    e.preventDefault();
    createMovie(form.title, form.synopsis, form.img, form.duration, form.origin, form.date, form.hall, form.time);
        setForm({  title: "",
        synopsis: "",
        img: "",
        duration: "",
        origin: "",
        date: "",
        hall: "",
        time: "" 
    });
  };

  

  return (
    <div className="login-contaiter">
      <nav className="admin">
        <NavLink to="/"><button className="admin-enter">Выход</button></NavLink>
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
        <HallConfiguration halls={halls} onClickHandler={onClickHandler} activeHall={activeHall} onUpdatePlacesHandler={onUpdatePlacesHandler} places={places} onChange={onChange} onSubmitPlacesHandler={onSubmitPlacesHandler}/>

        <PriceConfiguration halls={halls} />
        <SessionGrid onAddMovieHandler={onAddMovieHandler} onSubmitMovieHandler={onSubmitMovieHandler} movies={movies}/>

        <section className="conf-step">
          <header className="conf-step__header conf-step__header_opened">
            <h2 className="conf-step__title">Открыть продажи</h2>
          </header>
          <div className="conf-step__wrapper text-center">
            <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
            <button className="conf-step__button conf-step__button-accent">
              Открыть продажу билетов
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
