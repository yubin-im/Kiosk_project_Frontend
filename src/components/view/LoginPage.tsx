import { FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useStorage } from '../context/storage-context';
import { getStorage } from '../util/getStorage';

export const LoginPage = () => {
  const { login } = useStorage();
  const idRef = useRef<HTMLInputElement | null>(null);
  const pwRef = useRef<HTMLInputElement | null>(null);
  const navigation = useNavigate();

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = String(idRef.current?.value);
    const pw = String(pwRef.current?.value);

    if (!id) {
      alert('아이디를 입력해주세요');
      idRef.current?.focus();
      return;
    }
    if (!pw) {
      alert('비밀번호를 입력해주세요');
      pwRef.current?.focus();
      return;
    }

    const data = new URLSearchParams();
    data.append('userId', id);
    data.append('userPw', pw);

    const res = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data,
    });

    const response: Message = await res.json();
    const { status, code, message, result: token } = response;

    //로그인 성공
    if (status == 'USER_LOGIN') {
      //type narrowing
      if (token && 'token' in token) {
        if (login(token.token!, token.userId!)) {
          alert(message);
          navigation('/placeselection');
          return;
        }
      }
    } else {
      alert('error code : ' + code + '\nmessage : ' + message);
      localStorage.clear();
      return;
    }
  };

  useEffect(() => {
    const userToken = getStorage<string>('AUTH-TOKEN', '');
    if (userToken) {
      localStorage.clear();
    }
  }, [navigation]);

  return (
    <div>
      로그인 해주세요
      <form onSubmit={loginHandler} className='grid'>
        <div className='flex'>
          아이디
          <input
            ref={idRef}
            type='text'
            className='rounded border-2 border-blue-600 m-2'
          />
        </div>
        <div className='flex'>
          비번
          <input
            ref={pwRef}
            type='password'
            className='rounded border-2 border-blue-600'
          />
        </div>
        <button type='submit'>버튼</button>
      </form>
      <button type='button' onClick={() => navigation('/register')}>
        Register
      </button>
    </div>
  );
};
