const movies = [
  {
    title: 'A The Shawshank Redemption',
    year: 1994,
    director: 'Frank Darabont',
    genre: ['Crime', 'Drama'],
    score: 9.3
  },
  {
    title: 'C The Godfather',
    year: 1972,
    director: 'Francis Ford Coppola',
    duration: '2h',
    genre: ['Crime', 'Drama'],
    score: 9.2
  },
  {
    title: 'B The Godfather',
    year: 1972,
    director: 'Francis Ford Coppola',
    duration: '2h 55min',
    genre: ['Crime', 'Drama'],
    score: 9.2
  }]


// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
  directors = movies.map(function(movie){
    return movie.director
  })
  return directors
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  return movies.filter(movie => (movie.director === 'Steven Spielberg') && (movie.genre.includes('Drama'))).length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
  if (movies.length === 0){return 0}
  avgScore = (movies.reduce(function (accumulator, movie) {
    return accumulator + (movie.score?movie.score:0)
  }, 0))/movies.length
  return Math.round(avgScore*100)/100
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  return scoresAverage(movies.filter(movie => movie.genre.includes('Drama')))
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  sortedMovies = [...movies]
  return sortedMovies.sort(function(a,b){
    if (a.year !== b.year){
      return a.year - b.year
    }
    return a.title.localeCompare(b.title)
  })
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  sortedMovies = [...movies]
  return sortedMovies.sort((a,b) => a.title.localeCompare(b.title)).filter((movie, index)=> index<20).map(movie=>movie.title)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  cleanMovies = movies.map(a => {return {...a}})
  cleanMovies.forEach(function(movie){
    if (!movie.duration){
      movie.duration = 0
      return
    }
    durationList = movie.duration.split(" ")
    switch (durationList.length) {
      case 1:
        if (durationList[0].includes("h")){movie.duration = Number(movie.duration.slice(0, -1))*60}
        if (durationList[0].includes("min")){movie.duration = Number(movie.duration.slice(0, -3))}
        break
      case 2:
        movie.duration = Number(movie.duration.split("h ")[0])*60 + Number(movie.duration.split("h ")[1].slice(0, -3))
        break
    }
  })
  return cleanMovies
}

console.log(turnHoursToMinutes(movies))


// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {
  
  if (movies.length === 0){
    return null
  }
  listOfYears = []
  listOfCount = []
  movies.forEach(function(movie){
    if (listOfYears.includes(movie.year)){
      listOfCount.filter(item=> (item.year===movie.year))[0].count ++
      listOfCount.filter(item=> (item.year===movie.year))[0].score += movie.score
    }
    else {
      listOfYears.push(movie.year)
      listOfCount.push({year:movie.year,
                        count:1,
                        score:movie.score})
    }
  })
  
  listOfCount.forEach(function(year){
    year.avg=year.score/year.count
  })

  listOfCount.sort(function(a,b){
    if (a.avg !== b.avg){
      return b.avg - a.avg
    }
    return a.year - b.year
  })

  return `The best year was ${listOfCount[0].year} with an average score of ${listOfCount[0].avg}`

}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
