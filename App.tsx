

import { useEffect, useState } from 'react';

const api_read_access_token = import.meta.env.VITE_API_READ_ACCESS_TOKEN;

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

function App() {
  const [movies,setmovies]= useState<Movie[]>([])
  const [pagination, setpagination] = useState({
    page: 1,
    total_pages: 1,
    total_results: 0,
  })
  const fetchmovie = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?' + new URLSearchParams({page:pagination.page.toString()}), {
      headers: {
        Authorization: `Bearer ${api_read_access_token}`,
      },

    }).then((res) => res.json())
    setmovies(data.results)
    setpagination({
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results
    })

  }
  const handlechangepage = (page:number) => {
    setpagination({
      ...pagination,
      page,
    })
  }
  useEffect(() => {
    fetchmovie()
  }, [pagination.page])
  const firstpage = '<<'
  const lastpage = '>>'
  const minusPage = '<'
  const addpage = '>'
  return (
    <div>
      <h1 className='flex font-bold text-lg py-5 justify-center'>Popular movies this week</h1>
      <div className='grid grid-cols-4 grid-rows-5 px-4 gap-2'>
        {
          movies.map((movie,index) => (
            <div key={index} className='border-4 border-black rounded-md'>
              <img className='' src={'https:///image.tmdb.org/t/p/w500' + movie.poster_path} alt={movie.title} />
              <div className='flex justify-center'>

                <p className='pt-2 font-semibold text-sm'>{movie.title}</p>
              </div>
              
              
            </div>
          ))
          }
      </div>
      <div className='flex justify-center items-center mb-2'>
        
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded' onClick={() => handlechangepage(pagination.page = 1)}>{firstpage}</button>
        <button disabled={pagination.page === 1} onClick={() => handlechangepage(pagination.page - 1)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>{minusPage}</button>
        <p className='text-center mx-4 font-bold'> Page {pagination.page} of {pagination.total_pages}</p>
        <button disabled={pagination.page === pagination.total_pages} onClick={() => handlechangepage(pagination.page + 1)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>{addpage}</button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded'onClick={() => handlechangepage(pagination.page = pagination.total_pages)}>{lastpage}</button>
      </div>
    </div>
  )
}
export default App //add more stylish desgin. challenge one: add button "go to first page". challenge 2: add button "go to last page".;