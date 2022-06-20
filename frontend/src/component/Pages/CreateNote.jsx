import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Lodingspinner from "../Loding";
import PageFormat from "./PageFormat";
import ErrorMessage from "../ErrorMessage";

// import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [Loding, setLoding] = useState(false);
  const [error, seterror] = useState({ state: false, message: null });
  let navigate = useNavigate();
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = async (e) => {
    setLoding(true);
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
    };

    await axios
      .post(`/user/note/create`, { title, content, category }, config)
      .then((res) => {
        if (res.data.status === 400) {
          // console.log("res :", res);
          seterror({ state: true, message: res.data.message });
          resetHandler();
          setTimeout(deboubce, 2000);
        } else {
          // console.log(res.data);
          navigate("/mynotes");
        }
      });
  };
  // seterror(false);

  useEffect(() => {}, []);
  function deboubce() {
    seterror({ state: false });
    setLoding(false);
  }
  return (
    <PageFormat title={"Create A new note"}>
      <Card>
        {/* <Card.Header>Create a new Note</Card.Header> */}
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error.state && (
              <ErrorMessage variant="danger">{error.message}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {Loding && <Lodingspinner />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </PageFormat>
  );
}

export default CreateNote;
