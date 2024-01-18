import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './globals/auth';

const SiteModeButton = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const showButtonThreshold = 200;

      setIsVisible(scrollY > showButtonThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const changeMode = () => {
    console.log(window.location.href);
    var check = window.location.href.split("/").pop();
    console.log(check);
    
    if (window.location.href.endsWith("Dark")) {
        var loc = check.replace("_Dark", "")
        console.log(loc)
        if (loc == "home"){
          navigate('/');
        } else{
          navigate("/" + loc);
        }
    }
    else{
        var loc = check.concat('_Dark')
        if (loc == "_Dark"){
          navigate("home_Dark")
        }
        else {
          navigate("/" + loc)
        }
    }
  };

  return (
    <button
      className={`scroll-mode-button ${isVisible ? 'visible' : ''}`}
      onClick={changeMode}
    >
      Verander thema
    </button>
  );
};

export default SiteModeButton;
