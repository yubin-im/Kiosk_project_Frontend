type UserToken = {
  token: string;
  userId: string;
};

type Message =
  | {
      status: string;
      code: string;
      message: string;
      result: null | undefined | UserToken;
    }
  | {
      status: string;
      code: string;
      message: string;
      result: null | undefined | ProductsByCategory[];
    };
