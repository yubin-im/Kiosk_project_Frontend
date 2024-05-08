interface UserToken {
  token: string | undefined;
  userId: string | undefined;
}

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
