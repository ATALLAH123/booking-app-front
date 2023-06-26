import useFetch from "../../hooks/useFetch";
import "./featured.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";

const BASE_URL = "https://mern-backend-api-lkcl.onrender.com/api";

const Featured = () => {
  const { data, loading,  } = useFetch(
    BASE_URL + "/hotels/countByCity?cities=paris,alger,london"
  );
  useEffect(()=>{
    AOS.init({duration:3000})
  },[])

  return (
    <div className="featured">
      {loading ? (
        <Skeleton height={400} count={5}/>
      ) : (
        <>
          <div data-aos="fade-up" className="featuredItem">
            <img
              src="https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="featuredImg"
            />
            <div data-aos="fade-up" className="featuredTitles">
              <h1>PARIS</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div data-aos="fade-up" className="featuredItem">
            <img
              src="https://images.pexels.com/photos/4511198/pexels-photo-4511198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="featuredImg"
            />
            <div  data-aos="fade-up" className="featuredTitles">
              <h1>ALGER</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div data-aos="fade-up" className="featuredItem">
            <img
              src="https://i.pinimg.com/564x/e1/6f/b8/e16fb8fb258b63502ac81b0014f7728e.jpg"
              alt=""
              className="featuredImg"
            />
            <div  data-aos="fade-up" className="featuredTitles">
              <h1>LONDON</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;