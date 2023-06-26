import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";
import { Link } from "react-router-dom";


const BASE_URL = "https://mern-backend-api-lkcl.onrender.com/api";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch( BASE_URL+ "/hotels?featured=true");
  
  useEffect(()=>{
    AOS.init({duration:2000})
  },[])

  return (
    <div  className="fp">
    {loading ? (
      <Skeleton height={400} count={88}/>
      
    ) : (
      <>
        {data.map((item) => (
          <div  data-aos="fade-up" className="fpItem" key={item._id}>
            <img
              src={item.photos[0]}
              alt=""
              className="fpImg"
            />
            <Link className="fpName" to={`/hotels/find/${item._id}`}>{item.name}</Link>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
            {item.rating && <div className="fpRating">
              <a>{item.rating}</a>
              <FontAwesomeIcon className="fontstar" icon={faStar} fade />
              
            </div>}
          </div>
        ))}
      </>
    )}
  </div>
  );
};

export default FeaturedProperties;
