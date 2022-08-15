import { render, screen } from "@testing-library/react";
import Card from "../../components/Card/Card";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {BrowserRouter} from 'react-router-dom'

describe("Test for card component", () => {
  const server = setupServer(
    rest.get("/users/detail/62e2391d71769f485751d56c", (req, res, ctx) => {
      return res(
        ctx.json({
          _id: "62e2391d71769f485751d56c",
          userId: "62deef2f858a385e940848cb",
          title: "pop us uk series",
          description: "all of the hottest songs ever at the present",
          imgUrl:
            "https://firebasestorage.googleapis.com/v0/b/unit-test-social-app.appspot.com/o/1658992019084HN-scaled.jpg?alt=media&token=c62aa8b0-ed9f-444d-b6f4-d278ad6e521c",
          videoUrl:
            "https://firebasestorage.googleapis.com/v0/b/unit-test-social-app.appspot.com/o/1658992012126y2mate.com%20-%20Pop%20Hits%202021%20%20Maroon%205%20Rihanna%20Dua%20Lipa%20Bruno%20mars%20Ed%20Sheeran%20Ava%20Max%20Ariana%20Grande_1080p.mp4?alt=media&token=0829961f-b53b-49a8-b355-7001b7ef121c",
          views: 0,
          tags: ["music", "live"],
          likes: ["62def184fb86363613c71ac1"],
          dislikes: [],
          createdAt: "2022-07-28T07:22:05.627Z",
          updatedAt: "2022-07-28T10:55:08.263Z",
          __v: 0,
        })
      );
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Render card component successfully", () => {
    render(
      <Card video={{ userId: "62e2391d71769f485751d56c" }} type="trend" />, {wrapper: BrowserRouter }
    );
    const linkElement = screen.getByText(/views/i);
    expect(linkElement).toBeInTheDocument();
  });
});
