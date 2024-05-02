import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigation = useNavigate();
  return (
    <div className='flex max-w-screen-sm max-h-screen bg-black'>
      <button
        onClick={() => navigation('/login')}
        className='bg-black text-zinc-50 rounded p-2 '
      >
        주문하시려면 터치하세요
      </button>
    </div>
  );
};
