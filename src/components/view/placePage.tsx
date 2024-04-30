import { useEffect, useState } from 'react';

export const PlacePage = () => {
  const [menu, setMenu] = useState();
  useEffect(() => {
    fetch('http:localhost8080/order')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setMenu(json);
      });
  }, []);
  return (
    <>
      <div></div>
    </>
  );
};
