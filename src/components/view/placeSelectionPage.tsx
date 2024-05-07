import { useNavigate } from 'react-router-dom';
import { setStorage } from '../util/setStorage';
import { useEffect, useState } from 'react';
import { removeFromStorage } from '../util/removeFromStorage';
import { useStorage } from '../context/storage-context';
import OrderProducts from './OrderProducts';

enum RECIEVE {
  TO_GO = 'to-go',
  FOR_HERE = 'for-here',
}

export const PlaceSelectionPage = () => {
  const { storage } = useStorage();
  const [orderListId, setOrderListId] = useState<number | null>(null);

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
    navigation('/order/products');
  };

  useEffect(() => {
    fetchData();
    console.log('useEffect 실행');

    removeFromStorage('place');
  }, []);

  const fetchData = () => {
    const userId = storage.token?.userId;

    fetch('http://localhost:8080/order/place', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        const orderId = json.result.id;
        setOrderListId(orderId);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className='flex flex-col max-w-screen-sm sm min-h-screen bg-mcred justify-between mx-auto p-20'>
        <div className='grid grid-cols-2 gap-2 bg-white rounded-3xl px-2 py-10 pt-2'>
          <button
            type='button'
            onClick={() => navigation('/login')}
            className='text-mcred font-black w-fit px-3 py-2 rounded-3xl'
          >
            ◀️로그인
          </button>
          <h2 className='col-span-2 text-4xl font-bold'>식사 장소 선택</h2>
          <br></br>
          <span className='col-span-2 text-center'>
            식사하실 장소를 선택해주세요
          </span>
          <div className='flex justify-center col-span-2 gap-2 mt-10'>
            <button
              type='button'
              onClick={() => {
                setPlace(RECIEVE.FOR_HERE);
                navigation('/order/products', { state: { orderListId } });
              }}
              className='flex flex-col border-2 border-mcblack rounded-xl gap-2 justify-center items-center p-7'
            >
              <span className='text-7xl'>🏛️</span>
              <strong>매장</strong>
            </button>
            <button
              type='button'
              onClick={() => {
                setPlace(RECIEVE.TO_GO);
                navigation('/order/products');
              }}
              className='flex flex-col border-2 border-mcblack rounded-xl gap-2 justify-center items-center p-7'
            >
              <span className='text-7xl'>🏠</span>
              <strong>포장</strong>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
