import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieList } from "./pages/MovieList";
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import Menu from "./components/Menu";
import getDate from "./helper";
import "./App.css";

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

export default function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const url = "http://localhost:7070/movies";

  const getAllMovies = async () => {   
    const response = await fetch(url, {
      method: "GET",
    });
    const result = await response.json();
    setMovies(result);
  };

  const loadData = () => {   
    getAllMovies();
  };

  useEffect(loadData, []);

  let dateArr: string[] = getDate(); 

  let firstPageList = movies.filter((movie: IMovie) => movie.date === dateArr[0]);
  let secondPageList = movies.filter((movie: IMovie) => movie.date === dateArr[1]);
  let thirdPageList = movies.filter((movie: IMovie) => movie.date === dateArr[2]);
  let fourthPageList = movies.filter((movie: IMovie) => movie.date === dateArr[3]);
  let fifthPageList = movies.filter((movie: IMovie) => movie.date === dateArr[4]);
  let sixthPageList = movies.filter((movie: IMovie) => movie.date === dateArr[5]);
  let seventhPageList = movies.filter((movie: IMovie) => movie.date === dateArr[6]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<><Menu /><MovieList movies={firstPageList} /></>} />
        <Route path="/tomorrow" element={<><Menu /><MovieList movies={secondPageList} /></>} />
        <Route path="/3" element={<><Menu /><MovieList movies={thirdPageList} /></>} />
        <Route path="/4" element={<><Menu /><MovieList movies={fourthPageList} /></>} />
        <Route path="/5" element={<><Menu /><MovieList movies={fifthPageList} /></>} />
        <Route path="/6" element={<><Menu /><MovieList movies={sixthPageList} /></>} />
        <Route path="/7" element={<><Menu /><MovieList movies={seventhPageList} /></>} />          
      </Routes>
    </Router>
  );
}
