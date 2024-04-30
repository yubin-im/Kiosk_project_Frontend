import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigation = useNavigate();
  return (
    <div className='container'>
      <button
        onClick={() => navigation('/login')}
        className='bg-black text-zinc-50 rounded p-2 '
      >
        주문하시려면 터치하세요
      </button>
    </div>
  );
};
