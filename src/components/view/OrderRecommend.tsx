import { useEffect, useState } from 'react';

interface RecommendProductDto {
  id: number;
  productName: string;
  productPrice: number;
  productImgUrl: string;
}

const OrderRecommend = () => {
  const [data, setData] = useState<RecommendProductDto[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:8080/order/recommend', {
      method: 'POST',
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
    <div className='flex flex-col max-w-screen-sm max-h-screen sm min-h-screen bg-mcyellow justify-between mx-auto p-20'>
      <div className='flex flex-col gap-2 max-h-fit object-fill bg-white rounded-3xl px-10 py-10 '>
        <span className='font-bold text-2xl text-mcblack'>
          함께 즐기시면 더욱 좋습니다!
        </span>
        <br />

        <div className='grid grid-cols-3 gap-2 place-items-center max-h-96'>
          {data.map((product, index) => (
            <div
              key={index}
              className='shadow-sm shadow-slate-400 rounded-lg w-full h-32'
            >
              <div style={{ height: '60%' }}>
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
              <div className='text-center text-sm'>
                <p>{product.productName}</p>
                <p>{product.productPrice}원</p>
              </div>
            </div>
          ))}
        </div>

        <br />
        <div className='flex gap-2 justify-center'>
          <button className='bg-mcblack px-8 text-white rounded-lg'>
            이전
          </button>
          <button className='bg-mcred px-8 text-white rounded-lg'>
            선택안함
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderRecommend;
