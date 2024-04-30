import { useEffect, useState } from 'react';

type Product = {
  productName: string;
  productCode: string;
  productPrice: number;
};
export const Order = () => {
  const [data, setData] = useState<Product[] | null>(null);
  useEffect(() => {
    fetch('http://localhost8080/order')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const dat: Product[] = json.result;
        setData(dat);
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
