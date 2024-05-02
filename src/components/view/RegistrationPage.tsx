import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegistrationPage = () => {
  const url = 'http://localhost:8080/user/register';
  const idRef = useRef<HTMLInputElement | null>(null);
  const pwRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const navigation = useNavigate();

  const validation = (data: {
    userId: string | undefined;
    userPw: string | undefined;
    userName: string | undefined;
  }) => {
    if (!data.userId) {
      alert('아이디를 입력해주세요');
      idRef.current?.focus();
      return false;
    }
    if (!data.userPw) {
      alert('비밀번호를 입력해주세요');
      pwRef.current?.focus();
      return false;
    }
    if (!data.userName) {
      alert('실명을 기입해주세요');
      nameRef.current?.focus();
      return false;
    }
    return true;
  };

  const registrationHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = idRef.current?.value;
    const userPw = pwRef.current?.value;
    const userName = nameRef.current?.value;

    const data = {
      userId: userId,
      userPw: userPw,
      userName: userName,
    };

    if (!validation(data)) {
      return;
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const response: Message = await res.json();

    const status = response.status;
    const message = response.message;

    if (status == 'USER_REG_SUCCESS') {
      alert(message);
      navigation('/login');
      return;
    }

    alert(message);
    navigation('/');
    return;
  };

  return (
    <>
      <div className='flex flex-col max-w-screen-sm sm min-h-screen bg-mcred justify-between mx-auto p-20'>
        <div className='flex flex-col gap-2 bg-white rounded-3xl px-2 py-10 pt-2'>
          <button
            type='button'
            onClick={() => navigation('/login')}
            className='text-mcred font-black w-fit px-3 py-2 rounded-3xl'
          >
            ◀️이전화면
          </button>
          <form
            onSubmit={registrationHandler}
            className='flex flex-col items-center justify-center '
          >
            <span className='font-bold text-4xl text-mcblack col-span-4 mb-5'>
              Registration
            </span>
            <br></br>
            <div className='grid grid-cols-4 items-center'>
              ID
              <input
                type='text'
                placeholder='아이디를 입력해주세요'
                name='userId'
                ref={idRef}
                className='border-b-2 border-mcyellow h-11 w-56 px-1 col-span-3'
              />
              PW
              <input
                type='password'
                placeholder='비밀번호를 입력해주세요'
                name='userPw'
                ref={pwRef}
                className='border-b-2 border-mcyellow h-11 w-56 px-1 col-span-3'
              />
              NAME
              <input
                type='text'
                placeholder='실명을 기입해주세요'
                name='userName'
                ref={nameRef}
                className='border-b-2 border-mcyellow h-11 w-56 px-1 col-span-3'
              />
              <button
                type='submit'
                className='grid col-span-4 bg-mcred text-white px-2 py-1 rounded-xl mt-10'
              >
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
