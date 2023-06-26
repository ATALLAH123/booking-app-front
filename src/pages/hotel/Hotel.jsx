import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/searchContext.js";
import { AuthContext } from "../../context/authContext";
import Reserve from "../../components/reserve/Reserve";
import { faHotel } from '@fortawesome/free-solid-svg-icons'
import AOS from 'aos'
import 'aos/dist/aos.css'

const BASE_URL = "https://mern-backend-api-lkcl.onrender.com/api";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(BASE_URL + `/hotels/find/${id}`);
 
  const { dates,options} = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    if (date1 && date2) {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
    }
    return 0; // Return a default value if dates are not defined
  }
  const days = dayDifference(dates?.[0]?.endDate, dates?.[0]?.startDate)

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
      
    } else {
      navigate("/login");
    }
  };

  useEffect(()=>{
    AOS.init({duration:2000})
  },[])

 
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <div class="boxes">
    <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
      ) : (
        <div className="hotelContainer">
          {open && (
            <div  className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div data-aos="fade-up" className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
            <h1 data-aos="fade-up" className="hotelTitle">{data.name} <FontAwesomeIcon icon={faHotel} style={{"--fa-primary-color": "#1848d8", "--fa-primary-opacity": "7", "--fa-secondary-color": "#6b6a4c",}} /></h1>
            <div data-aos="fade-up" className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span data-aos="fade-up">{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span data-aos="fade-up" className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div data-aos="fade-up" className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div data-aos="fade-up" className="hotelDetails">
              <div data-aos="fade-up" className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div data-aos="fade-left" className="hotelDetailsPrice">
                <h1>Perfect for a {days} night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                 <b>${days * data.cheapestPrice * options.room}</b> ({days} night)
                </h2>
                <button onClick={handleClick}> Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  );
};

export default Hotel;