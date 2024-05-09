import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type OrderProductCountList = {
  orderProductName: string;
  orderProductCount: number;
};

type OrderProductCount = {
  type: string;
  year: number;
  month: number;
  orderProductCountList: OrderProductCountList[];
};

const month: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const AdminOrderStatisticsProductPage = () => {
  const API = 'http://localhost:8080/admin/order/statistics/product';
  const [orders, setOrders] = useState<OrderProductCount>();
  const [year, setYear] = useState('2024');
  const [searchMonth, setMonth] = useState('4');
  const navigation = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [searchMonth, year]);
  const fetchOrders = () => {
    fetch(`${API}?year=${year}&month=${searchMonth}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json.result);
        setOrders(json.result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className='grid grid-cols-3 py-5 px-6'>
        <div className='col-start-1 flex items-center'>
          <button
            className='flex text-white bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-3 py-1 text-center dark:focus:ring-[#F7BE38]/50'
            onClick={() => navigation('/admin/order/statistics')}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z'
              />
            </svg>
            매출 보기
          </button>
        </div>
        <h3 className='col-start-2 w-full md:w-auto mb-4 md:mb-0 text-2xl font-bold'>
          <span>
            {orders?.year}. {orders?.month && orders?.month < 10 ? 0 : null}
            {orders?.month}
          </span>
        </h3>
        <div className='col-start-3 text-right'>
          <div className='inline-block py-2 px-3 border rounded text-xs text-grey-500'>
            <select
              className='pr-1'
              onChange={(e) => setYear(e.currentTarget.value)}
            >
              <option value='2023'>2023</option>
              <option value='2024' selected>
                2024
              </option>
            </select>
          </div>
          <div className='ml-2 inline-block py-2 px-3 border rounded text-xs text-grey-500'>
            <select
              className='pr-1'
              onChange={(e) => setMonth(e.currentTarget.value)}
            >
              <option value='none'>month</option>
              {month.map((m) => (
                <option key={m} value={m}>
                  {m}월
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className=' min-w-full'>
        <table className='text-left text-sm font-light text-surface dark:text-white'>
          <thead className='border-b border-neutral-200 font-medium dark:border-white/10'>
            <tr className='min-w-full '>
              <th className=' w-1/12 text-center pb-3'>판매 순위</th>
              <th className=' w-2/12 text-center pb-3'>상품</th>
              <th className=' w-1/12 text-center pb-3'>판매 개수</th>
            </tr>
          </thead>
          <tbody className=' overflow-y-scroll'>
            {orders?.orderProductCountList.map((item, index) => (
              <tr
                key={index}
                className='border-b border-neutral-200 dark:border-white/10 h-12 text-center items-center even:bg-stone-50'
              >
                <td>{index + 1}</td>
                <td>{item.orderProductName}</td>
                <td>
                  <div className='text-center'>{item.orderProductCount} 개</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
