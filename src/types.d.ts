type UserLogin = {
  userId: string;
  userPw: string;
};

type UserRegister = {
  userId: string;
  userPw: string;
  userName: string;
};

type UserRole = 'ROLE_USER' | 'ROLE_ADMIN';

type UserUpdate = {
  userId: string;
  userPw: string;
  userRole: UserRole;
  userJoinDate: Date;
  userPoint: number;
};

type Message = {
  status: string;
  code: string;
  message: string;
  result: undefined | { token: string; userId: string };
};
