import { MovieItem } from "../MovieItem";
import { IMovie } from "../../App";

interface IMovies {
  movies: IMovie[];
}

export const MovieList = ({ movies }: IMovies) => {
  
  return (
    <>
      {movies.map((movie: IMovie) => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </>
  );
};
