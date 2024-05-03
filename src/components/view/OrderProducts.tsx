import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useStorage } from '../context/storage-context';
import { useNavigate } from 'react-router-dom';

interface ProductsByCategoryDto {
  productId: number;
  productName: string;
  productPrice: number;
  productImgUrl: string;
}

interface ProductsResDto {
  productDtos: ProductsByCategoryDto[];
  userName: string;
  orderListTotalAmount: number;
  orderListTotalPrice: number;
}

const OrderProducts = () => {
  const navigation = useNavigate();
  const {
    storage: { token },
  } = useStorage();
  const [data, setData] = useState<ProductsResDto | null>(null);
  const [category, setCategory] = useState<string | null>('BURGER_SET');
  const [page, setPage] = useState(0);
  const [orderListId, setOrderListId] = useState<number | null>(20);
  const [productDtos, setProductDtos] = useState<
    ProductsByCategoryDto[] | null
  >(null);

  useEffect(() => {
    if (category === 'RECOMMENDED') {
      fetchRecommendData();
    } else {
      fetchData();
    }
  }, [category, page, orderListId]);

  // 카테고리 별 메뉴 출력
  const fetchData = () => {
    fetch('http://localhost:8080/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: category,
        page: page,
        orderListId: orderListId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json.result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 추천 메뉴 눌렀을 때 랜덤 메뉴 출력
  const fetchRecommendData = () => {
    fetch('http://localhost:8080/order/recommend', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((json) => {
        setData((prevData) => ({
          ...prevData!,
          productDtos: json.result,
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col max-w-screen-sm sm min-h-screen  justify-between mx-auto'>
      <img
        src='https://img.insight.co.kr/static/2021/04/13/700/img_20210413151511_h3uakchh.webp'
        alt='title'
      ></img>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 className='text-xl my-3'>
          {token && <span style={{ color: 'red' }}>{token.userId}</span>}{' '}
          {token &&
            `님
          환영합니다`}
        </h2>
        <button
          onClick={() => {
            navigation('/placeselection');
          }}
          className='bg-mcblack text-white text-lg font-bold rounded-lg px-8 m-2'
        >
          이전
        </button>
      </div>

      <div>
        <div className='grid grid-cols-12'>
          <div className='flex flex-col col-span-3 gap-2'>
            <span className=' text-mcblack font-sans rounded-lg py-2 '>
              You are here with{' '}
              <strong className='text-xl text-mcyellow'>Mcdonald</strong>
            </span>
            <span className='bg-mcred h-0.5'></span>
            <button
              onClick={() => {
                setCategory('RECOMMENDED');
                setPage(0);
              }}
              className={clsx('font-bold rounded-lg py-5', {
                'drop-shadow-lg bg-white': category != 'RECOMMENDED',
                'bg-mcred text-white ': category == 'RECOMMENDED',
              })}
            >
              추천 메뉴
            </button>
            <button
              onClick={() => {
                setCategory('BURGER_SET');
                setPage(0);
              }}
              className={clsx('font-bold rounded-lg py-5', {
                'drop-shadow-lg bg-white': category != 'BURGER_SET',
                'bg-mcred text-white ': category == 'BURGER_SET',
              })}
            >
              버거 & 세트
            </button>
            <button
              onClick={() => {
                setCategory('BURGER_SINGLE');
                setPage(0);
              }}
              className={clsx('font-bold rounded-lg py-5', {
                'drop-shadow-lg bg-white': category != 'BURGER_SINGLE',
                'bg-mcred text-white ': category == 'BURGER_SINGLE',
              })}
            >
              단품
            </button>
            <button
              onClick={() => {
                setCategory('HAPPY_MEAL');
                setPage(0);
              }}
              className={clsx('font-bold rounded-lg py-5', {
                'drop-shadow-lg bg-white': category != 'HAPPY_MEAL',
                'bg-mcred text-white ': category == 'HAPPY_MEAL',
              })}
            >
              해피밀
            </button>
            <button
              onClick={() => {
                setCategory('DESSERT');
                setPage(0);
              }}
              className={clsx('font-bold rounded-lg py-5', {
                'drop-shadow-lg bg-white': category != 'DESSERT',
                'bg-mcred text-white ': category == 'DESSERT',
              })}
            >
              디저트
            </button>
            <button
              onClick={() => {
                setCategory('DRINK');
                setPage(0);
              }}
              className={clsx('font-bold rounded-lg py-5', {
                'drop-shadow-lg bg-white': category != 'DRINK',
                'bg-mcred text-white ': category == 'DRINK',
              })}
            >
              음료
            </button>
          </div>
          <div className='col-span-9 border-2 border-mcred p-2 rounded-lg ml-2'>
            <div className='grid grid-cols-3 min-h-full gap-2 '>
              {data.productDtos?.map((product, index) => (
                <div
                  key={index}
                  className='flex flex-col shadow-md shadow-slate-200 bg-white rounded-lg justify-self-center min-w-full'
                >
                  <div style={{ height: '100px' }}>
                    <img
                      src={product.productImgUrl}
                      alt={product.productName}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                      }}
                    />
                  </div>

                  <div className=''>
                    <p>{product.productName}</p>
                    <p>{product.productPrice}원</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-center m-2 gap-5'>
        <button
          className='border border-stone-300 px-5 py-1 rounded-lg'
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          이전
        </button>
        <span>{page}</span>
        <button
          className='border border-stone-300 px-5 py-1 rounded-lg'
          onClick={() => setPage(page + 1)}
        >
          다음
        </button>
      </div>

      <div
        className='my-3'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'green',
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        <div>
          <p className='mx-3'>주문 내역</p>
        </div>
        <div>
          <p className='mx-3'>
            총 가격: {data.orderListTotalPrice}원 수량:{' '}
            {data.orderListTotalAmount}
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button type='button' className='font-bold'>
          주문 상세보기
        </button>
        <br />
        <button className='bg-mcblack text-white px-5 py-1 rounded-lg'>
          비우기
        </button>
      </div>

      <div className='grid grid-cols-2 mt-2 gap-1'>
        <button className='bg-red-500 text-white text-lg font-bold rounded-lg w-full'>
          주문 취소
        </button>
        <button className='bg-green-700 text-white text-lg font-bold rounded-lg w-full'>
          주문 완료
        </button>
      </div>
    </div>
  );
};

export default OrderProducts;
