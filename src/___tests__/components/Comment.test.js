import { render, screen, waitFor } from "@testing-library/react";
import Comment from "../../components/Comment/Comment";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";

describe("Test for comment component", () => {
  const server = setupServer(
    rest.get("/users/detail/62deef2f858a385e940848cb", (req, res, ctx) => {
      return res(
        ctx.json({
          _id: "62deef2f858a385e940848cb",
          name: "test1",
          email: "test1@gmail.com",
          password:
            "$2a$10$wc.THVT40S.4H3ykgte/Ce4HnWoUYS91aBM/fcicBnEwlUqQZONQK",
          subscribers: -1,
          subscribedUser: ["62def184fb86363613c71ac1"],
          fromGoogle: false,
          createdAt: "2022-07-25T19:29:51.337Z",
          updatedAt: "2022-07-28T10:56:48.610Z",
          __v: 0,
        })
      );
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Render comment component successfully", async () => {
    render(<Comment comment={{ userId: "62deef2f858a385e940848cb" , description: "the best songs forever"}} />, {
      wrapper: BrowserRouter,
    });

    const commentText = screen.getByText(/the best songs forever/i);
    expect(commentText).toBeInTheDocument();

    await waitFor(() => {
      const chanelName = screen.getByText(/test1/i);
      expect(chanelName).toBeInTheDocument();
    });
  });
});
