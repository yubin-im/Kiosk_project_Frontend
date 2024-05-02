import React, { useState, useEffect } from 'react';
import { Button, Row, Col, ButtonGroup } from 'react-bootstrap';

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
    <div>
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
        <h2>
          <span style={{ color: 'red' }}>{data.userName}</span>님 환영합니다.
        </h2>
        <Button variant='success' className='mx-5'>
          이전
        </Button>
      </div>

      <Row>
        <Col md={3}>
          <ButtonGroup vertical className='my-3'>
            <Button
              onClick={() => {
                setCategory('RECOMMENDED');
                setPage(0);
              }}
              variant='light'
            >
              추천 메뉴
            </Button>
            <Button
              onClick={() => {
                setCategory('BURGER_SET');
                setPage(0);
              }}
              variant='light'
            >
              버거 & 세트
            </Button>
            <Button
              onClick={() => {
                setCategory('BURGER_SINGLE');
                setPage(0);
              }}
              variant='light'
            >
              단품
            </Button>
            <Button
              onClick={() => {
                setCategory('HAPPY_MEAL');
                setPage(0);
              }}
              variant='light'
            >
              해피밀
            </Button>
            <Button
              onClick={() => {
                setCategory('DESSERT');
                setPage(0);
              }}
              variant='light'
            >
              디저트
            </Button>
            <Button
              onClick={() => {
                setCategory('DRINK');
                setPage(0);
              }}
              variant='light'
            >
              음료
            </Button>
          </ButtonGroup>
        </Col>
        <Col md={9}>
          <Row>
            {data.productDtos.map((product, index) => (
              <Col md={4} key={index}>
                <div className='text-center'>
                  <img src={product.productImgUrl} alt={product.productName} />
                  <p>{product.productName}</p>
                  <p>{product.productPrice}원</p>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Button
        className='mx-3'
        variant='secondary'
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
      >
        이전
      </Button>
      <span>{page}</span>
      <Button
        className='mx-3'
        variant='secondary'
        onClick={() => setPage(page + 1)}
      >
        다음
      </Button>

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
        <Button variant='link'>주문 상세보기</Button>
        <br />
        <Button variant='light' className='my-3'>
          비우기
        </Button>
      </div>

      <div>
        <Button className='mx-3' variant='danger'>
          주문 취소
        </Button>
        <Button variant='success'>주문 완료</Button>
      </div>
    </div>
  );
};

export default OrderProducts;
