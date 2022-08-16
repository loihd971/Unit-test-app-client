import { render, screen, waitFor } from "@testing-library/react";
import Search from "../../pages/Search/Search";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";

describe("Test for card component", () => {
  const server = setupServer(
    rest.get("/videos/search?q=mien", (req, res, ctx) => {
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
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers()); 
  afterAll(() => server.close());

  test("Render search component successfully", async () => {
    await render(<Search />, { wrapper: BrowserRouter });
    const songName = await screen.findByText(/Mien an nhien/i);
    await waitFor(() => {
      expect(songName).toBeInTheDocument();
    });
  });
});
