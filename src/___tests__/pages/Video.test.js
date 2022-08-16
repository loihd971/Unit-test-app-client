import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Video from "../../pages/Video/Video";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { React } from "react";

describe("Test for card component", () => {
  window.location.href = "http://localhost:3000/video/62fab920ced145d5ab8a104f";
  let chanel = {};
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
    video: {
      currentVideo: [
        {
          _id: "62fab920ced145d5ab8a104f",
          userId: "62fab871ced145d5ab8a1048",
          title: "Mien an nhien",
          description: "by Me",
          imgUrl:
            "https://firebasestorage.googleapis.com/v0/b/unit-test-social-app.appspot.com/o/1660598538638blog-logo.PNG?alt=media&token=bdfc0234-4e48-455e-b2c3-1ca39147bf97",
          videoUrl:
            "https://firebasestorage.googleapis.com/v0/b/unit-test-social-app.appspot.com/o/1660598531484Mi%E1%BB%81n%20An%20Nhi%C3%AAn%20-%20Ph%E1%BA%A1m%20Minh%20Th%C3%A0nh%20%5BOfficial%20Music%20Video%5D.mp4?alt=media&token=990a36a4-e6ce-4363-bbea-3cad2308fada",
          views: 0,
          tags: ["music"],
          likes: [],
          dislikes: [],
          createdAt: "2022-08-15T21:22:40.955Z",
          updatedAt: "2022-08-15T21:22:40.955Z",
          __v: 0,
        },
      ],
    },
  });

  const server = setupServer(
    rest.get("/users/detail/62fab871ced145d5ab8a1048", (req, res, ctx) => {
      return res(
        ctx.json({
          _id: "62fab871ced145d5ab8a1048",
          name: "test1",
          email: "test1@gmail.com",
          password:
            "$2a$10$fiZkYLhLxsW8gEdSUXLKl.xuA2qpIEJRjf2lb2fsW.o6CB4oGVGgu",
          subscribers: 1,
          subscribedUser: ["62fab871ced145d5ab8a1048"],
          fromGoogle: false,
          createdAt: "2022-08-15T21:19:45.953Z",
          updatedAt: "2022-08-15T21:23:19.494Z",
          __v: 0,
        })
      );
    }),
    rest.get("/videos/detail/62fab920ced145d5ab8a104f", (req, res, ctx) => {
      return res(
        ctx.json([
          {
            _id: "62fab920ced145d5ab8a104f",
            userId: "62fab871ced145d5ab8a1048",
            title: "Mien an nhien",
            description: "by Me",
            imgUrl:
              "https://firebasestorage.googleapis.com/v0/b/unit-test-social-app.appspot.com/o/1660598538638blog-logo.PNG?alt=media&token=bdfc0234-4e48-455e-b2c3-1ca39147bf97",
            videoUrl:
              "https://firebasestorage.googleapis.com/v0/b/unit-test-social-app.appspot.com/o/1660598531484Mi%E1%BB%81n%20An%20Nhi%C3%AAn%20-%20Ph%E1%BA%A1m%20Minh%20Th%C3%A0nh%20%5BOfficial%20Music%20Video%5D.mp4?alt=media&token=990a36a4-e6ce-4363-bbea-3cad2308fada",
            views: 0,
            tags: ["music"],
            likes: [],
            dislikes: [],
            createdAt: "2022-08-15T21:22:40.955Z",
            updatedAt: "2022-08-15T21:22:40.955Z",
            __v: 0,
          },
        ])
      );
    }),
    rest.post("/users/like/62fab920ced145d5ab8a104f", (req, res, ctx) => {
      return res(ctx.status(200));
    }),
    rest.post("/users/dislike/62fab920ced145d5ab8a104f", (req, res, ctx) => {
      return res(ctx.status(200));
    }),
    rest.post("/users/unsub/62fab871ced145d5ab8a1048", (req, res, ctx) => {
      return res(ctx.status(200));
    }),
    rest.post("/users/sub/62fab871ced145d5ab8a1048", (req, res, ctx) => {
      return res(ctx.status(200));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Render video component successfully", async () => {
    await render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Video videoId="62fab920ced145d5ab8a104f" />
        </BrowserRouter>
      </Provider>
    );
    chanel = {
      _id: "62fab871ced145d5ab8a1048",
      name: "test1",
      email: "test1@gmail.com",
      password: "$2a$10$fiZkYLhLxsW8gEdSUXLKl.xuA2qpIEJRjf2lb2fsW.o6CB4oGVGgu",
      subscribers: 1,
      subscribedUser: ["62fab871ced145d5ab8a1048"],
      fromGoogle: false,
      createdAt: "2022-08-15T21:19:45.953Z",
      updatedAt: "2022-08-15T21:23:19.494Z",
      __v: 0,
    };

    mockStore.dispatch({
      type: "fetchSuccess",
      payload: {
        _id: "62fab920ced145d5ab8a104f",
        userId: "62fab871ced145d5ab8a1048",
        title: "Mien an nhien",
        description: "by Me",
        imgUrl:
          "https://firebasestorage.googleapis.com/v0/b/unit-test-social-app.appspot.com/o/1660598538638blog-logo.PNG?alt=media&token=bdfc0234-4e48-455e-b2c3-1ca39147bf97",
        videoUrl:
          "https://firebasestorage.googleapis.com/v0/b/unit-test-social-app.appspot.com/o/1660598531484Mi%E1%BB%81n%20An%20Nhi%C3%AAn%20-%20Ph%E1%BA%A1m%20Minh%20Th%C3%A0nh%20%5BOfficial%20Music%20Video%5D.mp4?alt=media&token=990a36a4-e6ce-4363-bbea-3cad2308fada",
        views: 0,
        tags: ["music"],
        likes: [],
        dislikes: [],
        createdAt: "2022-08-15T21:22:40.955Z",
        updatedAt: "2022-08-15T21:22:40.955Z",
        __v: 0,
      },
    });
  });
//   test("Handle like video  successfully", async () => {
//     jest.spyOn(React, "useEffect").mockImplementation((f) => f());

//     render(
//       <Provider store={mockStore}>
//         <BrowserRouter>
//           <Video />
//         </BrowserRouter>
//       </Provider>
//     );

//     fireEvent.click(screen.queryByTestId("btn-like"));
//     await waitFor(() => {
//       expect(screen.getByText("0")).toBeInTheDocument();
//     });
//   });
});
