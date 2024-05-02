import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const AdminPageList = () => {
  const { category } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/admin/user?`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json.result.userDtoList);
      });
  }, []);
  return <div>왜 아무것도 안 뜰까</div>;
};
