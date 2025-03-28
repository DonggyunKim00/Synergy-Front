import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface FallbackProps {
  error?: Error;
  resetError?: () => void;
}

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetError }) => {
  const navigate = useNavigate();

  useEffect(() => {
    resetError?.();
    navigate('/login');
  }, [navigate, resetError]);

  return <></>;
};

export default ErrorFallback;
