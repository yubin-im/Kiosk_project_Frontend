import { useEffect, useRef, useState } from 'react';
import {
  UNSAFE_ViewTransitionContext,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Product } from './AdminUserListPage';

interface Message {
  status: string;
  code: string;
  message: string;
  result: Product;
}

export const AdminProductEditPage = () => {
  const navigation = useNavigate();
  const { productCode } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const codeRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/product/detail/${productCode}`
      );
      const data: Message = await response.json();
      const { status, message, result } = data;

      if (status == 'PRODUCT_CHECK_SUCCESS') {
        setProduct(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //   const onUpdateProduct = () => {
  //     const data = {

  //     }
  //   }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div className='flex flex-col w-full sm min-h-screen items-center'>
        <button
          className='border border-mcblack self-start rounded-lg px-5'
          onClick={() => navigation('/admin/product')}
        >
          목록
        </button>
        {product ? (
          <>
            <form>
              <div className='grid grid-cols-2 items-start border-t border-b text-start divide-y divide-x'>
                <span>Name</span>
                <input
                  type='text'
                  defaultValue={product?.productName}
                  ref={nameRef}
                />
                <span>Code</span>
                <div>
                  <input
                    type='text'
                    defaultValue={product?.productCode}
                    ref={codeRef}
                  />
                </div>
                <span>Price</span>
                <input
                  defaultValue={`${product?.productPrice.toLocaleString()} 원`}
                  ref={priceRef}
                />
                <span>Category</span>
                <input
                  type='number'
                  defaultValue={product?.category}
                  ref={categoryRef}
                />
                <span>User Role</span>
                <input
                  type='text'
                  defaultValue={product?.productImgUrl}
                  ref={imgRef}
                />
              </div>
            </form>
            <br></br>
            <button
              className='bg-mcblack rounded-lg px-5 text-white'
              onClick={() => onUpdateProduct()}
            >
              수정완료
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
