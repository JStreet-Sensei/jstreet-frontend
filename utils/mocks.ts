const useRouter = jest.spyOn(require("next/router"), "useRouter");
const useSession = jest.spyOn(require("next-auth/react"), "useSession");

export function mockNextUseRouter(props: {
  route: string;
  pathname: string;
  query: string;
  asPath: string;
}) {
  useRouter.mockImplementationOnce(() => ({
    route: props.route,
    pathname: props.pathname,
    query: props.query,
    asPath: props.asPath,
  }));
}

export function mockNextUseSession(props: {
  data: {
    session: {
      expires: string;
      user: {
        email: string;
        image: string;
        name: string;
      };
    };
  };
}) {
  useSession.mockReturnValue(() => {
    return {
      data: props.data,
    };
  });
}
