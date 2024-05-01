import { useEffect, useState } from 'react';

type Product = {
  productName: string;
  productCode: string;
  productPrice: number;
};
export const Order = () => {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch('http://localhost8080/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: 'BURGER_SET', page: 0 }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const response: Message = json;
        const { status, result: dto } = response;

        if (status == 'PRODUCT_CHECK_SUCCESS') {
          if ('productName' in dto!) {
            const dat: Product[] = json.result;
            setData(dat);
          } else throw new Error();
        } else throw new Error();
      })
      .catch((err) => {
        console.error(err);
      });
  }, [data]);

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
