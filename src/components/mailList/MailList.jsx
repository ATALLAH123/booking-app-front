import "./mailList.css"
import { Link } from "react-router-dom";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";

const MailList = () => {
  useEffect(()=>{
    AOS.init({duration:2000})
  },[])
  return (
    <div data-aos="fade-up" className="mail">
      <h1 data-aos="fade-left" className="mailTitle">Save time, save money!</h1>
      <span data-aos="fade-left" className="mailDesc">Sign up and we'll send the best deals to you</span>
      <div data-aos="fade-left" className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <Link className="mailbtn" to="/register">Subscribe </Link>
      </div>
    </div>
  )
}

export default MailList