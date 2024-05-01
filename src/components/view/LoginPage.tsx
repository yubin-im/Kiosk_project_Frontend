import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useStorage } from '../context/storage-context';

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

    console.log(token);
    //로그인 성공
    if (status == 'USER_LOGIN') {
      console.log('1');
      //type narrowing
      if (token) {
        console.log('2');
        if ('token' in token) {
          console.log('3');

          login(token.token!, token.userId!);
          if (login(token.token!, token.userId!)) {
            console.log('4');
            alert(message);
            navigation('/order');
            return;
          }
          console.log('3.5', login(token.token!, token.userId!));
        }
      }
    } else {
      alert('error code : ' + code + '\nmessage : ' + message);
      localStorage.clear();
    }
  };

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
