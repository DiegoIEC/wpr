import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';

export const AuthCheck = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.naam) {
      navigate('/Login');
    }
  }, [user, navigate]);

  return user;
};

