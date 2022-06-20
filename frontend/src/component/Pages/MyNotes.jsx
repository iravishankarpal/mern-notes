import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import PageFormat from "./PageFormat";
import { Link } from "react-router-dom";

const MyNotesPage = styled.div`
  min-width: 80vw;

  @media screen and (max-width: 880px) {
    min-width: 90vw;
  }
  @media screen and (max-width: 580px) {
    min-width: 80vw;
  }
`;
const SubCArd = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & Button {
    margin-left: 10px;
  }
`;
const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
`;

function MyNotes() {
  const [notes, setNotes] = React.useState([]);
  var config = {
    headers: {
      authorization: `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")).token
      }`,
    },
  };
  const fetchNotes = async () => {
    await axios
      .get("/user/note/all", config)
      // .then((data) => console.log(data.data))
      .then((data) => setNotes(data.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  const handleDelete = async (id) => {
    await axios.delete(`/user/note/${id}`, config).then(() => fetchNotes());
  };
  return (
    <PageFormat title={"MyNotes"}>
      <MyNotesPage>
        <Link to="/CreateNote" className="px-3 py-2 my-8 bg-primary text-light">
          Create a New Note
        </Link>
        {notes.map((x) => {
          return (
            <Accordion className="py-1" key={x._id}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <SubCArd>
                    <h6>{x.title}</h6>
                  </SubCArd>
                </Accordion.Header>
                <Accordion.Body>
                  <Card.Body>
                    <CardBody>
                      <div>
                        <Badge bg="success">{x.category}</Badge>

                        <blockquote className="blockquote mb-0">
                          <p>{x.content}</p>

                          <footer className="blockquote-footer">
                            -- caretedAT {x.updatedAt.split("T")[0]}
                          </footer>
                        </blockquote>
                      </div>

                      <span>
                        <Link
                          to={`/UpdateNote/${x._id}`}
                          variant="outline-primary "
                          style={{ border: "1px solid blue", padding: "3px" }}
                          className="m-2 px-3"
                          // onClick={() => {
                          //   handleUpdate(x._id);
                          // }}
                        >
                          Edit
                        </Link>
                        <br />
                        <Button
                          variant="outline-danger"
                          className="m-2"
                          onClick={() => {
                            handleDelete(x._id);
                          }}
                        >
                          Delete
                        </Button>
                      </span>
                    </CardBody>
                  </Card.Body>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          );
        })}
      </MyNotesPage>
    </PageFormat>
  );
}

export default MyNotes;
