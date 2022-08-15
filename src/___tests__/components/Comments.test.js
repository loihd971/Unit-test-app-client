import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Comments from "../../components/Comments/Comments";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("Test for comments component", () => {
  const mockStore = configureMockStore()({
    user: {
      currentUser: {
        _id: "62deef2f858a385e940848cb",
        name: "test1",
        email: "test1@gmail.com",
        password:
          "$2a$10$wc.THVT40S.4H3ykgte/Ce4HnWoUYS91aBM/fcicBnEwlUqQZONQK",
        subscribers: -1,
        subscribedUser: [
          "62def184fb86363613c71ac1",
          "62deef2f858a385e940848cb",
        ],
        img: "https://lh3.googleusercontent.com/a/AItbvmnyjPkzx_jX1ZqpgilOYfgfxIh6HE...",
        fromGoogle: false,
        createdAt: "2022-07-25T19:29:51.337Z",
        updatedAt: "2022-07-28T10:56:48.610Z",
        __v: 0,
      },
    },
  });

  const server = setupServer(
    rest.get("/comments/62e2391d71769f485751d56c", (req, res, ctx) => {
      return res(
        ctx.json([
          {
            _id: "62e259466c00126465503629",
            userId: "62def184fb86363613c71ac1",
            videoId: "62e2391d71769f485751d56c",
            description: "this is the first comment",
            createdAt: "2022-07-28T09:39:18.721Z",
            updatedAt: "2022-07-28T09:39:18.721Z",
            __v: 0,
          },
        ])
      );
    }),
    rest.post("/comments", (req, res, ctx) => {
      return res(
        ctx.json({
          userId: "62deef2f858a385e940848cb",
          videoId: "62e2391d71769f485751d56c",
          description: "good",
          _id: "62fa96a41e20ce4e5c3b2b7c",
          createdAt: "2022-08-15T18:55:32.243Z",
          updatedAt: "2022-08-15T18:55:32.243Z",
          __v: 0,
        })
      );
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Render comments component successfully", async () => {
    await render(
      <Provider store={mockStore}>
        <Comments videoId="62e2391d71769f485751d56c" />
      </Provider>,
      {
        wrapper: BrowserRouter,
      }
    );

    await waitFor(() => {
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute(
        "src",
        "https://lh3.googleusercontent.com/a/AItbvmnyjPkzx_jX1ZqpgilOYfgfxIh6HE..."
      );
    });

    fireEvent.change(screen.getByPlaceholderText("Add a comment..."), {
      target: { value: "good" },
    });
    fireEvent.keyDown(screen.getByPlaceholderText("Add a comment..."), {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    await waitFor(() => {
      expect(screen.getByTestId("child-comment")).toBeInTheDocument();
    });
  });
});
