import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Order = {
  orderListTime: Date;
  orderListTotalPrice: number;
  orderListStatus: string;
  userId: string;
  orderId: number;
};

type OrderList = {
  totalCount: number;
  orderList: Order[];
};

interface Message {
  status: string;
  code: string;
  message: string;
  result: OrderList;
}

export const AdminOrderListPage = () => {
  const [products, setProducts] = useState<Order[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const navigation = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/order?page=${page}`
      );
      const data: Message = await response.json();
      const { status, result } = data;
      if (status == 'ORDER_LIST_FOUND_SUCCESS') {
        setProducts(result.orderList.content as Order[]);
        setTotalCount(result.totalCount);
      } else {
        alert('조회 실패');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = (productCode: string) => {
    alert(productCode + ' 상품을 삭제할 수 없습니다');
  };

  const onEdit = (orderId: number) => {
    navigation(`/admin/order/${orderId}`);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);
  return (
    <>
      <div className='text-right mb-3'>
        <p>
          총 <span className='font-semibold text-red-500'>{totalCount}</span>건
        </p>
      </div>
      <div className=' min-w-full'>
        <table className='text-left text-sm font-light text-surface dark:text-white'>
          <thead className='border-b border-neutral-200 font-medium dark:border-white/10'>
            <tr className='min-w-full '>
              <th className=' w-1/12 text-center pb-3'>#</th>
              <th className=' w-1/12 text-center pb-3'>USER</th>
              <th className=' w-2/12 text-center pb-3'>STATUS</th>
              <th className=' w-3/12 text-center pb-3'>ORDERED TIME</th>
              <th className=' w-1/12 text-center pb-3'>TOTAL PRICE</th>
              <th className=' w-1/12 text-center pb-3'>수정</th>
            </tr>
          </thead>
          <tbody className=' overflow-y-scroll'>
            {products?.map((item, index) => (
              <tr
                key={item.orderId}
                className='border-b border-neutral-200 dark:border-white/10 h-16 text-center items-center even:bg-stone-50'
              >
                <td>{page * 5 + index + 1}</td>
                <td>{item.userId}</td>
                <td>
                  <div className=' max-w-30 truncate whitespace-nowrap'>
                    {item.orderListStatus}
                  </div>
                </td>
                <td>
                  <div className='max-w-30 truncate whitespace-nowrap'>
                    {item.orderListTime.toString()}
                  </div>
                </td>
                <td>
                  <div className='truncate'>
                    {item.orderListTotalPrice.toLocaleString()} 원
                  </div>
                </td>

                <td>
                  <div className='flex flex-col gap-1 min-h-full content-center'>
                    <button
                      className='border border-stone-300 bg-white  rounded-lg'
                      onClick={() => onEdit(item.orderId)}
                    >
                      수정
                    </button>
                    <button
                      className='border border-stone-300 bg-white rounded-lg'
                      onClick={() => onDelete(item.userId)}
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='grid grid-cols-3 mt-5'>
        <div className='col-start-1'>
          <button
            className='border rounded bg-yellow-500 text-white'
            onClick={() => navigation('statistics')}
          >
            매출 통계
          </button>
        </div>
        <div className='flex col-start-2'>
          <button
            onClick={() => setPage(page - 1)}
            className='flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            <svg
              className='w-3.5 h-3.5 me-2 rtl:rotate-180'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 10'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 5H1m0 0 4 4M1 5l4-4'
              />
            </svg>
            Prev
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className='flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            Next
            <svg
              className='w-3.5 h-3.5 ms-2 rtl:rotate-180'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 10'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 5h12m0 0L9 1m4 4L9 9'
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
