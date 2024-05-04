import { useEffect, useReducer, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Nav, NavigationHandler } from '../../Nav';

export enum PAGE {
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

  const navigationHandlerRef = useRef<NavigationHandler>(null);
  return (
    <>
      <Nav ref={navigationHandlerRef} />

      <div className='grid grid-cols-12 mt-5 w-5/6 sm min-h-screen mx-auto'>
        <div className='col-span-2 flex flex-col divide-y'>
          <button
            type='button'
            onClick={() => {
              onRoutePage(PAGE.USER);
              navigationHandlerRef.current?.onSwitchCategory(PAGE.USER);
            }}
            className={clsx('py-2 px-3', 'font-thin text-end', 'rounded-md', {
              'bg-white text-mcred text-semibold  hover:bg-slate-200':
                page != 'user',
              'bg-mcblack text-white': page == 'user',
            })}
          >
            User
          </button>
          <button
            type='button'
            onClick={() => {
              onRoutePage(PAGE.PRODUCT);
              navigationHandlerRef.current?.onSwitchCategory(PAGE.PRODUCT);
            }}
            className={clsx('py-2 px-3', 'font-thin text-end', 'rounded-md', {
              'bg-white text-mcred text-semibold  hover:bg-slate-200':
                page != 'product',
              'bg-mcblack text-white ': page == 'product',
            })}
          >
            Product
          </button>
          <button
            type='button'
            onClick={() => {
              onRoutePage(PAGE.ORDER);
              navigationHandlerRef.current?.onSwitchCategory(PAGE.ORDER);
            }}
            className={clsx('py-2 px-3', 'font-thin text-end', 'rounded-md', {
              'bg-white text-mcred text-semibold  hover:bg-slate-200':
                page != 'order',
              'bg-mcblack text-white': page == 'order',
            })}
          >
            Order
          </button>
        </div>
        <div className='col-span-10 bg-white ml-5 rounded-3xl p-10'>
          <Outlet />
        </div>
      </div>
    </>
  );
};
