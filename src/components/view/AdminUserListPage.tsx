import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type UserRole = 'USER' | 'ADMIN';

type ProductCategory =
  | 'BURGER_SET'
  | 'BURGER_SINGLE'
  | 'HAPPY_MEAL'
  | 'DRINK'
  | 'DESSERT';

type User = {
  userId: string;
  userJoinDate: Date;
  userName: string;
  userPoint: number;
  userPw: string;
  userRole: UserRole;
};

export type Product = {
  productName: string;
  productPrice: number;
  productCode: string;
  productImgUrl: string;
  category: ProductCategory;
};

export const AdminUserListPage = () => {
  const { category } = useParams();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/admin/user`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setUsers(json.result.content);
      });
  }, [category]);

  return (
    <div className=' min-w-full'>
      <table className='text-left text-sm font-light text-surface dark:text-white'>
        <thead className='border-b border-neutral-200 font-medium dark:border-white/10'>
          <tr className='min-w-full '>
            <th className=' w-1/12 text-center pb-3'>#</th>
            <th className=' w-2/12 text-center pb-3'>ID</th>
            <th className=' w-1/12 text-center pb-3'>PASSWORD</th>
            <th className=' w-2/12 text-center pb-3'>NAME</th>
            <th className=' w-1/12 text-center pb-3'>POINT</th>
            <th className=' w-1/12 text-center pb-3'>ROLE</th>
            <th className=' w-2/12 text-center pb-3'>JOIN</th>
            <th className=' w-1/12 text-center pb-3'>수정</th>
          </tr>
        </thead>
        <tbody className=' overflow-y-scroll'>
          {users?.map((item, index) => (
            <tr
              key={item.userId}
              className='border-b border-neutral-200 dark:border-white/10 h-16 text-center items-center even:bg-stone-50'
            >
              <td>{index + 1}</td>
              <td>{item.userId}</td>
              <td>
                <div className='max-w-20 truncate whitespace-nowrap'>
                  {item.userPw}
                </div>
              </td>
              <td>
                <div className='truncate'>{item.userName}</div>
              </td>
              <td>
                <div className='truncate'>{item.userPoint}</div>
              </td>
              <td>{item.userRole}</td>
              <td>{item.userJoinDate.toString()}</td>
              <td>
                <div className='flex flex-col gap-1 min-h-full content-center'>
                  <button className='border border-stone-300 bg-white  rounded-lg'>
                    수정
                  </button>
                  <button className='border border-stone-300 bg-white rounded-lg'>
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
