import { useEffect, useState } from 'react';

interface Product {
  productId: number;
  productName: string;
  productCode: string;
  productPrice: number;
}

export const Order = () => {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: 'BURGER_SET', page: 0 }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        console.log(json.result);
        const { status, code, result: dtos } = json;
        if (status == 'PRODUCT_CHECK_SUCCESS') {
          setData(dtos);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <ul>
        {data?.map((item) => (
          <li key={item.productName}>{item.productName}</li>
        ))}
      </ul>
    </>
  );
};
