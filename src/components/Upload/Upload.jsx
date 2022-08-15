import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UploadContainer, FormContainer } from "./UploadStyled";
import { Modal, Input, Button, Select } from "antd";

const Upload = ({ setIsModalVisible, isModalVisible }) => {
  const [initTags] = useState([
    {
      label: "Music",
      value: "music",
    },
    {
      label: "Sport",
      value: "sport",
    },
    {
      label: "Gaming",
      value: "gaming",
    },
    {
      label: "Movie",
      value: "movie",
    },
    {
      label: "Live",
      value: "live",
    },
  ]);
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [inputs, setInputs] = useState({});
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const navigate = useNavigate();

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const onSubmit = async (value) => {
    try {
      const { video, img, ...rest } = value;
      const res = await axios.post("/videos", { ...rest, ...inputs });
      res.status === 200 && navigate(`/video/${res.data._id}`);
      setIsModalVisible(false);
    } catch (error) {}
  };

  return (
    <Modal
      visible={isModalVisible}
      title="Create a new video"
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      className="modal-file__upload"
    >
      <FormContainer onFinish={onSubmit} layout="vertical">
        <FormContainer.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </FormContainer.Item>
        <FormContainer.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </FormContainer.Item>
        <FormContainer.Item
          label="Tags"
          name="tags"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Select
            mode="tags"
            placeholder="Please select tags"
            style={{ width: "100%" }}
          >
            {initTags.map((item, index) => {
              return (
                <Select.Option value={item.value} key={index}>
                  {item.label}
                </Select.Option>
              );
            })}
          </Select>
        </FormContainer.Item>
        {videoPerc > 0 ? (
          <div>"Uploading:" {videoPerc} "%"</div>
        ) : (
          <FormContainer.Item
            label="Video"
            name="video"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <UploadContainer
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </FormContainer.Item>
        )}
        {imgPerc > 0 ? (
          <div> "Uploading:" {imgPerc} "%"</div>
        ) : (
          <FormContainer.Item
            label="Image"
            name="img"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <UploadContainer
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </FormContainer.Item>
        )}

        <FormContainer.Item>
          <Button htmlType="submit" type="primary">
            Upload
          </Button>
        </FormContainer.Item>
      </FormContainer>
    </Modal>
  );
};

export default Upload;
