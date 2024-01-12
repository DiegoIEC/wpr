import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
        var loc = window.location.href.replace("_Dark", "")
        if (loc == "Home_ALG"){
          navigate('/');
        } else{
          navigate(loc);
        }
    }
    else{
      var loc = window.location.href.replace("_Dark", "")
        navigate('/home_Dark')
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