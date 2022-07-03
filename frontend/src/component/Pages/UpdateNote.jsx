import React, { useEffect, useState } from "react";
import PageFormat from "./PageFormat";
import Lodingspinner from "../Loding";
import ErrorMessage from "../ErrorMessage";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function UpdateNote() {
  const goHome = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [Loding] = useState(false);
  // const [date, setDate] = useState(null);/
  const [error, seterror] = useState({ state: false, message: null });
  const config = {
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")).token
      }`,
    },
  };
  useEffect((id, config) => {
    // console.log("id :", id);
    const fetching = async () => {
      axios.get(`/notes/${id}`, config).then((data) => {
        setTitle(data.data.title);
        setContent(data.data.content);
        setCategory(data.data.category);
      });
    };

    fetching();
  }, []);

  const updateHandler = async (e) => {
    e.preventDefault();
    // setLoding(true);
    if (!title || !content || !category === null) {
      seterror({ state: true, message: "field cannot be empty" });
    } else {
      await axios
        .put(`/notes/${id}`, { title, content, category }, config)
        .then((res) => {
          if (res.data.status === 400) {
            // console.log("res :", res);
            seterror({ state: true, message: res.data.message });
            // setTimeout(deboubce, 2000);
          } else {
            // console.log(res.data);
            goHome("/mynotes");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  // seterror(false);

  // function deboubce() {
  //   seterror({ state: false });
  //   setLoding(false);
  // }
  return (
    <PageFormat title={"Update Notes"}>
      <Card>
        <Card.Body>
          <Form
            onSubmit={(e) => {
              updateHandler(e);
            }}
          >
            {Loding && <Lodingspinner />}
            {error.state && (
              <ErrorMessage variant="danger">{error.message}</ErrorMessage>
            )}
            {/* {error && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )} */}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {/* {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )} */}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {/* {loading && <Loading size={50} />} */}
            <br className="my-2" />

            <Button
              variant="primary"
              type="submit"
              // onClick={() => {
              //   updateHandler();
              // }}
            >
              Update Note
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </PageFormat>
  );
}

export default UpdateNote;
