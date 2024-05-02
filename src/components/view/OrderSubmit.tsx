import React, { useEffect, useState } from 'react';

interface SuccessOrderResDto {
  userPoint: number;
  orderListId: number;
}

const OrderSubmit = () => {
  const [data, setData] = useState<SuccessOrderResDto | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [orderListId, setOrderListId] = useState<number | null>(null);

  useEffect(() => {
    // Todo: 사용자 ID와 OrderList ID 받아오기
    setUserId(20);
    setOrderListId(20);

    if (userId !== null && orderListId !== null) {
      fetchData();
    }
  }, [userId, orderListId]);

  const fetchData = () => {
    fetch('http://localhost:8080/order/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
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
      <img
        src='https://i.namu.wiki/i/pYdtlj-fQNTInL7V6QVzRNAB_9Ip74fCiowUbuIEb03dzfy9olYTgA6-SLOD4GRe-Uub5_zWT-hocLHOcJDBxw.svg'
        alt='logo'
      ></img>
      <h1>고객님의 주문번호는 {data.orderListId}번입니다.</h1>
      <h1>감사합니다.</h1>
      <br />
      <h1>회원님의 적립금은 {data.userPoint}원입니다.</h1>
    </div>
  );
};

export default OrderSubmit;
