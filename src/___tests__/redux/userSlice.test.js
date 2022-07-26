import reducer, {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  subscription,
} from "../../redux/userSlice";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

describe("Test redux user", () => {
  test("should return the initial state", () => {
    expect(reducer(initialState, { type: undefined })).toEqual(initialState);
  });

  test("should change state when login start", () => {
    expect(reducer(initialState, loginStart())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  test("should change state when login failed", () => {
    expect(reducer(initialState, loginFailure())).toEqual({
      ...initialState,
      error: true,
    });
  });

  test("should change state when login success", () => {
    expect(
      reducer(
        initialState,
        loginSuccess({
          _id: "62deef2f858a385e940848cb",
          name: "test1",
          email: "test1@gmail.com",
          subscribers: 2,
          subscribedUser: ["62deef2f858a385e940848cb"],
          fromGoogle: false,
          createdAt: "2022-07-25T19:29:51.337Z",
          updatedAt: "2022-07-25T19:51:54.237Z",
          __v: 0,
        })
      )
    ).toEqual({
      ...initialState,
      currentUser: {
        _id: "62deef2f858a385e940848cb",
        name: "test1",
        email: "test1@gmail.com",
        subscribers: 2,
        subscribedUser: ["62deef2f858a385e940848cb"],
        fromGoogle: false,
        createdAt: "2022-07-25T19:29:51.337Z",
        updatedAt: "2022-07-25T19:51:54.237Z",
        __v: 0,
      },
    });
  });

  test("should change state when logout", () => {
    expect(
      reducer(
        {
          ...initialState,
          currentUser: {
            _id: "62deef2f858a385e940848cb",
            name: "test1",
            email: "test1@gmail.com",
            subscribers: 2,
            subscribedUser: ["62deef2f858a385e940848cb"],
            fromGoogle: false,
            createdAt: "2022-07-25T19:29:51.337Z",
            updatedAt: "2022-07-25T19:51:54.237Z",
            __v: 0,
          },
        },
        logout()
      )
    ).toEqual(initialState);
  });

  test("should change state when subscription", () => {
    expect(
      reducer(
        {
          currentUser: {
            subscribedUser: [],
          },
          __v: 0,
        },
        subscription("62deef2f858a385e940848cb")
      )
    ).toEqual({
      currentUser: {
        subscribedUser: ["62deef2f858a385e940848cb"],
      },
      __v: 0,
    });
  });

  test("should change state when un-subscription", () => {
    expect(
      reducer(
        {
          currentUser: {
            subscribedUser: ["62deef2f858a385e940848cb"],
          },
          __v: 0,
        },
        subscription("62deef2f858a385e940848cb")
      )
    ).toEqual({
      currentUser: {
        subscribedUser: [],
      },
      __v: 0,
    });
  });
});
