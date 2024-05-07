import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../util/Pagination';

export type ProductCategory =
  | 'BURGER_SET'
  | 'BURGER_SINGLE'
  | 'HAPPY_MEAL'
  | 'DRINK'
  | 'DESSERT';

export type Product = {
  id: number;
  productName: string;
  productPrice: number;
  productCode: string;
  productImgUrl: string;
  category: ProductCategory;
};

interface Message {
  status: string;
  code: string;
  message: string;
  result: unknown;
}

export const AdminProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigate();
  const [page, setPage] = useState<number>(0);
  // const [sort, setSort] = useState<string>('productName');
  // const [totalElement, setTotalElement] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/product?page=${page}&sort=${sort}`
      );
      const data: Message = await response.json();
      const { status, result } = data;
      if (status == 'PRODUCT_CHECK_SUCCESS') {
        setProducts(result.content);
        // setTotalElement(result.totalElement);
        setTotalPages(result.totalPages);
      } else {
        console.log(data);
        console.log(result);
        alert('조회 실패');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = async (productCode: string) => {
    try {
      const response = await fetch(
        'http://localhost:8080/admin/product/remove',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productCode: productCode,
          }),
        }
      );

      const data: Message = await response.json();

      if (data.status == 'PRODUCT_REMOVE_SUCCESS') {
        alert('삭제 성공');
        fetchProducts();
      } else {
        alert('삭제 실패');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onEdit = (id: number) => {
    navigation(`${id}`);
  };

  const onSetPage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);
  return (
    <>
      <div className='flex flex-col justify-center min-w-full'>
        <table className='text-left text-sm font-light text-surface dark:text-white'>
          <thead className='border-b border-neutral-200 font-medium dark:border-white/10'>
            <tr className='min-w-full '>
              <th className=' w-1/12 text-center pb-3'>#</th>
              <th className=' w-2/12 text-center pb-3'>NAME</th>
              <th className=' w-1/12 text-center pb-3'>CODE</th>
              <th className=' w-1/12 text-center pb-3'>IMG</th>
              <th className=' w-1/12 text-center pb-3'>PRICE</th>
              <th className=' w-1/12 text-center pb-3'>CATEGORY</th>
              <th className=' w-1/12 text-center pb-3'>수정</th>
            </tr>
          </thead>
          <tbody className=' overflow-y-scroll'>
            {products?.map((item, index) => (
              <tr
                key={item.productCode}
                className='border-b border-neutral-200 dark:border-white/10 h-16 text-center items-center even:bg-stone-50'
              >
                <td>{index + 1}</td>
                <td className='px-2'>{item.productName}</td>
                <td>
                  <div className='max-w-20 truncate whitespace-nowrap'>
                    {item.productCode}
                  </div>
                </td>
                <td>
                  <div className='max-w-20 truncate whitespace-nowrap'>
                    {item.productImgUrl}
                  </div>
                </td>
                <td>
                  <div className='truncate'>
                    {item.productPrice?.toLocaleString()} 원
                  </div>
                </td>
                <td>{item.category}</td>
                <td>
                  <div className='flex flex-col gap-1 min-h-full content-center'>
                    <button
                      className='border border-stone-300 bg-white  rounded-lg'
                      onClick={() => onEdit(item.id)}
                    >
                      수정
                    </button>
                    <button
                      className='border border-stone-300 bg-white rounded-lg'
                      onClick={() => onDelete(item.productCode)}
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <div className='flex justify-center'>
          <Pagination
            total={totalPages}
            page={page}
            setPage={onSetPage}
            limit={5}
          />
        </div>
      </div>
    </>
  );
};
