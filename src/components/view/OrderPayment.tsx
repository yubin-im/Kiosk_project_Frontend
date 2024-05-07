import { useEffect, useState } from 'react';
import { getStorage } from '../util/getStorage';
import { useStorage } from '../context/storage-context';
import { getTotalPrice } from '../util/getTotalPrice';
import { useNavigate } from 'react-router-dom';

const Order: Order = {
  orderId: 1,
  product: {},
  productAmount: 0,
  totalPrice: 0,
};

const OrderPayment = () => {
  const navigation = useNavigate();
  const [cart, setCart] = useState(() => getStorage<Order[]>('cart', [Order]));
  const {
    storage: { token },
  } = useStorage();
  const totalQuantity = cart.reduce(
    (total, item) => total + item.productAmount,
    0
  );
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.product.productPrice * item.productAmount;
    });
    return totalPrice;
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
      (async () => {
        try {
          const data = {
            orderList: cart,
            userId: token?.userId,
          };

          console.log('data', data);

          const response = await fetch('http://localhost:8080/order/payment2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            signal: signal,
          });

          const json = await response.json();
          console.log('json', json);
          if (json.status == 'ORDER_LIST_PAYMENT_SUCCESS') {
            alert('결제 성공');
            const getOrderId = json.result;
            console.log('주문번호는 = ', getOrderId);
            navigation('/order/submit', { state: { getOrderId } });
          }
        } catch (AbortError) {
          // console.log('abort');
          // console.error(AbortError);
        }
      })();
    }, 3000);

    return () => controller.abort();
  }, []);

  return (
    <div className='flex flex-col max-w-screen-sm sm min-h-screen bg-mcred justify-between mx-auto p-20'>
      <div className='flex flex-col gap-2 bg-white rounded-3xl px-2 py-10 pt-2'>
        {!cart ? (
          <span>isLoading...</span>
        ) : (
          <div>
            <h1 className='text-xl font-bold'>주문을 확인하세요.</h1>

            <br />
            <p>
              총 수량: {totalQuantity}개 총 가격:{' '}
              {calculateTotalPrice().toLocaleString()}원
            </p>
            <br />
            <p>카드를 화살표 방향으로 투입구에 넣어주세요.</p>
            <p>결제 오류시, 카드를 긁어주세요.</p>
            <img
              src='https://media.licdn.com/dms/image/D4D12AQFym_70hWOyZg/article-cover_image-shrink_600_2000/0/1685446331482?e=2147483647&v=beta&t=fuITp9VITQaAdGNjomWZkykJGMIoho2qh2SIdDOD1eE'
              alt='pay'
            ></img>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPayment;
