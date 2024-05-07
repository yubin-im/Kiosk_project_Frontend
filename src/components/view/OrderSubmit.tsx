import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../context/storage-context';
import { useLocation } from 'react-router-dom';

interface SuccessOrderResDto {
  userPoint: number;
  orderListId: number;
}

const OrderSubmit = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const [data, setData] = useState<SuccessOrderResDto | null>(null);
  const {
    storage: { token },
  } = useStorage();
  const [orderListId, setOrderListId] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const clear = () => clearTimeout(timerRef.current);

  useEffect(() => {
    console.log('주문번호 받아왔는지 확인 :' + location.state.getOrderId);
    setOrderListId(location.state.getOrderId);

    if (token?.userId) {
      fetchData();
    }

    return clear();
  }, [orderListId]);

  const fetchData = () => {
    fetch('http://localhost:8080/order/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: token?.userId,
        orderListId: location.state.getOrderId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json.result);
        setTimeout(() => {
          navigation('/');
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='flex flex-col max-w-screen-sm sm min-h-screen  justify-center items-center mx-auto p-20'>
      <img
        src='https://i.namu.wiki/i/pYdtlj-fQNTInL7V6QVzRNAB_9Ip74fCiowUbuIEb03dzfy9olYTgA6-SLOD4GRe-Uub5_zWT-hocLHOcJDBxw.svg'
        alt='logo'
        className='size-64 m-10'
      ></img>
      {!data ? (
        ''
      ) : (
        <h1>
          고객님의 주문번호는{' '}
          <strong className='text-mcred text-xl'>{data.orderListId}</strong>번
          입니다.
        </h1>
      )}
      <h1>감사합니다.</h1>
      <br />
      {!data ? (
        ''
      ) : (
        <h1>
          회원님의 적립금은 <span className='underline'>{data.userPoint}</span>
          원입니다.
        </h1>
      )}
      <br></br>
      <button
        className='text-xl font-bold bg-mcred rounded-lg px-7 text-white'
        onClick={() => {
          clear();
          navigation('/');
        }}
      >
        Home
      </button>
    </div>
  );
};

export default OrderSubmit;
