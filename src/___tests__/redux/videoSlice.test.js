import reducer, {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  like,
  dislike,
} from "../../redux/videoSlice";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

describe("Test redux video", () => {
  test("should return the initial state", () => {
    expect(reducer(initialState, { type: undefined })).toEqual(initialState);
  });
  test("should change state when fetch start", () => {
    expect(reducer(initialState, fetchStart())).toEqual({
      ...initialState,
      loading: true,
    });
  });
  test("should change state when fetch failed", () => {
    expect(reducer(initialState, fetchFailure())).toEqual({
      ...initialState,
      error: true,
    });
  });
  test("should change state when fetch success", () => {
    expect(
      reducer(
        initialState,
        fetchSuccess({
          _id: "62df443acdba5275676632b4",
          userId: "62def184fb86363613c71ac1",
          title: "ca nhac dong que",
          description: "hay",
          imgUrl:
            "https://firebasestorage.googleapis.com/v0/b/unit-test-social-app.appspot.com/o/1658799142906netflix-background.jpg?alt=media&token=37bba55b-08fa-4563-8f72-f55aceae83ed",
          videoUrl:
            "https://firebasestorage.googleapis.com/v0/b/unit-test-social-app.appspot.com/o/1658799131500Mi%E1%BB%81n%20An%20Nhi%C3%AAn%20-%20Ph%E1%BA%A1m%20Minh%20Th%C3%A0nh%20%5BOfficial%20Music%20Video%5D.mp4?alt=media&token=af995b11-a03a-44a1-b475-c518b4662182",
          views: 0,
          tags: ["music", "live"],
          likes: [],
          dislikes: ["62def184fb86363613c71ac1"],
          createdAt: "2022-07-26T01:32:42.632Z",
          updatedAt: "2022-07-26T01:34:10.381Z",
          __v: 0,
        })
      )
    ).toEqual({
      ...initialState,
      currentVideo: {
        _id: "62df443acdba5275676632b4",
        userId: "62def184fb86363613c71ac1",
        title: "ca nhac dong que",
        description: "hay",
        imgUrl:
          "https://firebasestorage.googleapis.com/v0/b/unit-test-social-app.appspot.com/o/1658799142906netflix-background.jpg?alt=media&token=37bba55b-08fa-4563-8f72-f55aceae83ed",
        videoUrl:
          "https://firebasestorage.googleapis.com/v0/b/unit-test-social-app.appspot.com/o/1658799131500Mi%E1%BB%81n%20An%20Nhi%C3%AAn%20-%20Ph%E1%BA%A1m%20Minh%20Th%C3%A0nh%20%5BOfficial%20Music%20Video%5D.mp4?alt=media&token=af995b11-a03a-44a1-b475-c518b4662182",
        views: 0,
        tags: ["music", "live"],
        likes: [],
        dislikes: ["62def184fb86363613c71ac1"],
        createdAt: "2022-07-26T01:32:42.632Z",
        updatedAt: "2022-07-26T01:34:10.381Z",
        __v: 0,
      },
    });
  });
});

test("should change state when like with hasn't been disliked ever", () => {
  expect(
    reducer(
      {
        currentVideo: {
          likes: [],
          dislikes: [],
        },
        __v: 0,
      },
      like("62def184fb86363613c71ac1")
    )
  ).toEqual({
    currentVideo: {
      likes: ["62def184fb86363613c71ac1"],
      dislikes: [],
    },
    __v: 0,
  });
});
test("should change state when like with has been disliked", () => {
  expect(
    reducer(
      {
        currentVideo: {
          likes: [],
          dislikes: ["62def184fb86363613c71ac1"],
        },
        __v: 0,
      },
      like("62def184fb86363613c71ac1")
    )
  ).toEqual({
    currentVideo: {
      likes: ["62def184fb86363613c71ac1"],
      dislikes: [],
    },
    __v: 0,
  });
});

test("should change state when dislike with has been liked", () => {
  expect(
    reducer(
      {
        currentVideo: {
          likes: ["62def184fb86363613c71ac1"],
          dislikes: [],
        },
        __v: 0,
      },
      dislike("62def184fb86363613c71ac1")
    )
  ).toEqual({
    currentVideo: {
      likes: [],
      dislikes: ["62def184fb86363613c71ac1"],
    },
    __v: 0,
  });
});

test("should change state when dislike with hasn't been liked ever", () => {
  expect(
    reducer(
      {
        currentVideo: {
          likes: [],
          dislikes: [],
        },
        __v: 0,
      },
      dislike("62def184fb86363613c71ac1")
    )
  ).toEqual({
    currentVideo: {
      likes: [],
      dislikes: ["62def184fb86363613c71ac1"],
    },
    __v: 0,
  });
});
