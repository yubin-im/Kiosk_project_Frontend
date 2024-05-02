import { useNavigate } from 'react-router-dom';
import { setStorage } from '../util/setStorage';
import { useEffect } from 'react';
import { removeFromStorage } from '../util/removeFromStorage';

enum RECIEVE {
  TO_GO = 'to-go',
  FOR_HERE = 'for-here',
}

export const PlaceSelectionPage = () => {
  const navigation = useNavigate();
  const setPlace = (place: RECIEVE) => {
    let rplace: string;
    switch (place) {
      case RECIEVE.TO_GO:
        rplace = RECIEVE.TO_GO;
        break;

      case RECIEVE.FOR_HERE:
        rplace = RECIEVE.FOR_HERE;
        break;

      default:
        rplace = RECIEVE.FOR_HERE;
        break;
    }

    setStorage<string>('place', rplace);
    navigation('/order');
  };

  useEffect(() => {
    removeFromStorage('place');
  }, []);

  return (
    <>
      <div className='flex'>
        <button type='button' onClick={() => setPlace(RECIEVE.FOR_HERE)}>
          매장
        </button>
        <button type='button' onClick={() => setPlace(RECIEVE.TO_GO)}>
          포장
        </button>
      </div>
    </>
  );
};
