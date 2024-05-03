import { useEffect, useReducer } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

enum PAGE {
  USER = 'user',
  PRODUCT = 'product',
  ORDER = 'order',
}

type Action =
  | {
      type: PAGE.USER;
    }
  | {
      type: PAGE.PRODUCT;
    }
  | { type: PAGE.ORDER };

const reducer = (curretPage: PAGE, { type }: Action) => {
  let page: PAGE;
  switch (type) {
    case PAGE.ORDER:
      page = PAGE.ORDER;
      break;

    case PAGE.PRODUCT:
      page = PAGE.PRODUCT;
      break;

    case PAGE.USER:
      page = PAGE.USER;
      break;

    default:
      page = PAGE.USER;
      break;
  }

  return page;
};

export const AdminPage = () => {
  const [page, dispatch] = useReducer(reducer, PAGE.USER);
  const navigation = useNavigate();

  const onRoutePage = (page: PAGE) => {
    dispatch({ type: page });
    navigation(`/admin/${page}`);
  };

  useEffect(() => {
    dispatch({ type: PAGE.USER });
    navigation('/admin/user');
  }, []);
  return (
    <>
      <div className='flex w-full min-h-screen justify-center mx-auto bg-gradient-to-br from-pink-50 via-rose-100 to-indigo-200'>
        <div className='grid w-4/6 grid-cols-8 justify-center content-start py-16'>
          <div className='col-span-8 rounded-3xl content-center text-end bg-gradient-to-br from-white  via-white to-slate-50 mb-10 py-5 px-10'>
            Admin Page
          </div>
          <div className='flex flex-col col-span-1 gap-2'>
            <button
              type='button'
              onClick={() => onRoutePage(PAGE.USER)}
              //   className='bg-white text-rose-400 rounded-full py-2 hover:bg-indigo-100'
              className={clsx({
                'rounded-full py-2': true,
                'bg-white text-rose-400 rounded-full  hover:bg-indigo-100':
                  page != 'user',
                'bg-rose-400 text-white rounded-full ': page == 'user',
              })}
            >
              User
            </button>
            <button
              type='button'
              onClick={() => onRoutePage(PAGE.PRODUCT)}
              className={clsx({
                'rounded-full py-2': true,
                'bg-white text-rose-400 rounded-full  hover:bg-indigo-100':
                  page != 'product',
                'bg-rose-400 text-white rounded-full ': page == 'product',
              })}
            >
              Product
            </button>
            <button
              type='button'
              onClick={() => onRoutePage(PAGE.ORDER)}
              className={clsx({
                'rounded-full py-2': true,
                'bg-white text-rose-400 rounded-full  hover:bg-indigo-100':
                  page != 'order',
                'bg-rose-400 text-white rounded-full ': page == 'order',
              })}
            >
              Order
            </button>
          </div>
          <div className='col-span-7 bg-white ml-5 rounded-3xl p-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
