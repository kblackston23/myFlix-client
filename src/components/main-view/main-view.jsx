import React from 'react';

import { MovieCard } from '../movie-card/movie-card';

import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [
        {_id: 1, Title: 'Silence of the Lambs', Description: 'Desc 1', ImagePath: 'img.png' },
        {_id: 2, Title: 'Ponyo', Description: 'Desc 2', ImagePath: 'img2.png'},
        {_id: 3, Title: 'The Wind Rises', Description: 'Desc 3', ImagePath: 'img3.png'}
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;
  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
}

export default MainView;