import { Product } from '../view/AdminPageList';

type Prop = {
  item: Product;
  key: undefined | number;
};
export const ProductBox = ({ item, key }: Prop) => {
  return (
    <div
      key={key}
      className='shadow-sm shadow-slate-400 rounded-lg w-full h-32 overflow-hidden'
    >
      <div style={{ height: '50%' }}>
        <img
          src={item.productImgUrl}
          alt={item.productName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'fill',
          }}
        />
      </div>
      <div className='text-center text-sm'>
        <p>{item.productName}</p>
        <p>{item.productPrice}원</p>
      </div>
    </div>
  );
};
