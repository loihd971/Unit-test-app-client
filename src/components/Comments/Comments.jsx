import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, NewComment, Avatar, Input } from "./CommentsStyled";
import Comment from "../Comment/Comment";

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${videoId}`);
      setComments(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const handleComment = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const body = { description: e.target.value, videoId };
        await axios.post(`/comments`, body);
        fetchComments();
      } catch (err) {}
    }
  };

  return (
    <Container >
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input
          onKeyDown={(e) => handleComment(e)}
          placeholder="Add a comment..."
        />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
