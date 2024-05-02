import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

interface OrderDetailItemDto {
  productName: string;
  orderPrice: number;
  orderAmount: number;
}

interface OrderDetailResDto {
  orderDetailItemDtoList: OrderDetailItemDto[];
  orderListTotalAmount: number;
  orderListTotalPrice: number;
}

const OrderDetail = () => {
  const [data, setData] = useState<OrderDetailResDto | null>(null);
  const [orderListId, setOrderListId] = useState<number | null>(null);

  useEffect(() => {
    // Todo: orderListId 받아오기
    setOrderListId(20);

    if (orderListId !== null) {
      fetchData();
    }
  }, [orderListId]);

  const fetchData = () => {
    fetch('http://localhost:8080/order/detail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>주문을 확인하세요.</h1>
      <br />

      <div>
        {data.orderDetailItemDtoList.map((product, index) => (
          <div key={index}>
            <div className='my-3'>
              {product.productName} - {product.orderPrice}원{' '}
              <Button className='mx-2' variant='light'>
                -
              </Button>
              {product.orderAmount}개
              <Button className='mx-2' variant='light'>
                +
              </Button>
              <Button variant='light'>삭제</Button>
              <hr />
            </div>
          </div>
        ))}
      </div>

      <br />
      <p>
        총 수량: {data.orderListTotalAmount}개 총 가격:{' '}
        {data.orderListTotalPrice}원
      </p>
      <hr />

      <div>
        <Button className='mx-3' variant='danger'>
          추가 주문
        </Button>
        <Button variant='success'>결제하기</Button>
      </div>
    </div>
  );
};

export default OrderDetail;
