import { Ref, RefObject, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Item = {
  id: number;
  orderPrice: number;
  orderAmount: number;
};

type Order = {
  orderListTime: Date;
  orderListTotalPrice: number;
  orderListStatus: string;
  userId: string;
  orderId: number;
  orderItemList: Item[];
};

interface Message {
  status: string;
  code: string;
  message: string;
  result: Order;
}

const OrderListStatus = ['PREPARING', 'COMPLETED', 'READY', 'RECEIVED'];

export const AdminOrderEditPage = () => {
  const navigation = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState('');
  const TimeRef = useRef<HTMLInputElement | null>(null);
  const TotalPriceRef = useRef<HTMLInputElement | null>(null);
  const StatusRef = useRef<HTMLInputElement | null>(null);

  const fetchOrder = async (orderId: string) => {
    const response = await fetch(
      `http://localhost:8080/admin/order/${orderId}`
    );
    const data: Message = await response.json();
    const order: Order = data.result as Order;
    setOrder(order);
    setStatus(order.orderListStatus);
    console.log(order);
  };

  const onUpdateOrder = async () => {
    try {
      const updated = {
        id: order!.orderId,
        orderListTime: new Date(TimeRef.current!.value),
        orderListTotalPrice: TotalPriceRef.current!.value,
        orderListStatus: StatusRef.current!.value,
      };
      console.log(updated);

      const response = await fetch(
        `http://localhost:8080/admin/order/${updated.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        }
      );

      const message: Message = await response.json();
      const status = message.status as string;
      if (status == 'ORDER_LIST_UPDATE_SUCCESS') {
        alert(message.message);
        window.location.reload();
      } else {
        alert(message.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrder(orderId!);
  }, []);

  return (
    <>
      <div className='flex flex-col w-full sm min-h-screen items-center'>
        <button
          className='border border-mcblack self-start rounded-lg px-5'
          onClick={() => navigation('/admin/order')}
        >
          목록
        </button>
        {order ? (
          <>
            <form>
              <div className='grid grid-cols-2 items-start border-t border-b text-start divide-y divide-x'>
                <span>ID</span>
                <input type='text' defaultValue={order?.orderId} readOnly />
                <span>ORDERED TIME</span>
                <div>
                  <input
                    type='datetime-local'
                    defaultValue={order?.orderListTime.toString()}
                    ref={TimeRef}
                  />
                </div>
                <span>TOTAL PRICE</span>
                <input
                  type='text'
                  defaultValue={order?.orderListTotalPrice}
                  ref={TotalPriceRef}
                />
                <span>STATUS</span>
                <select
                  defaultValue={status}
                  onChange={(e) => setStatus(e.currentTarget.value)}
                  ref={StatusRef}
                >
                  {OrderListStatus.map((st, idx) => (
                    <option value={st} key={idx}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <br></br>
            <button
              className='bg-mcblack rounded-lg px-5 text-white'
              onClick={() => onUpdateOrder()}
            >
              수정완료
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
