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
      <form onSubmit={registrationHandler}>
        <table>
          <tbody>
            <tr>
              <td>ID</td>
              <td>
                <input
                  type='text'
                  placeholder='아이디를 입력해주세요'
                  name='userId'
                  ref={idRef}
                />
              </td>
            </tr>
            <tr>
              <td>PW</td>
              <td>
                <input
                  type='password'
                  placeholder='비밀번호를 입력해주세요'
                  name='userPw'
                  ref={pwRef}
                />
              </td>
            </tr>
            <tr>
              <td>NAME</td>
              <td>
                <input
                  type='text'
                  placeholder='실명을 기입해주세요'
                  name='userName'
                  ref={nameRef}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>가입하기</button>
      </form>
    </>
  );
};
