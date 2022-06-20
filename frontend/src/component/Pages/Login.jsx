import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styeld from "styled-components";
import PageFormat from "./PageFormat";
import Lodingspinner from "../Loding";
import ErrorMessage from "../ErrorMessage";
import { useNavigate } from "react-router-dom";
const Input = styeld.input`
        padding: 10px;
        width: 100%;
        margin-bottom: 10px;
    &:focus {
    outline: none;
        
}
`;
const LoginPage = styeld.div`
height: auto;


`;
function Login() {
  let navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState(false);
  const [Loding, setLoding] = useState(false);
  const handleLoginSubmit = async () => {
    setLoding(true);
    await axios
      .post("/user/", {
        email: Email,
        password: Password,
      })
      .then((data) => {
        if (data.data.status === 400) {
          setError(`error  : ${data.data.message}`);
        } else {
          localStorage.setItem("userInfo", JSON.stringify(data.data));
          navigate("/MyNotes");
        }
        setLoding(false);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("userInfo") !== null) {
      navigate("/MyNotes");
    }
  }, [navigate]);

  return (
    <PageFormat title={"LOGIN "}>
      {/* <h4 className="pageTitle">Login</h4> */}
      <LoginPage>
        {Loding && <Lodingspinner />}
        {Error && <ErrorMessage variant="danger">{Error}</ErrorMessage>}
        <fieldset>
          <legend>Email</legend>
          <Input
            type="Email"
            placeholder="Email"
            name="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </fieldset>
        <fieldset>
          <legend>Password</legend>
          <Input
            type="Password"
            placeholder="Password"
            name="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </fieldset>
        <Button
          className="py-2 my-2"
          onClick={() => {
            handleLoginSubmit();
          }}
        >
          {" "}
          Submit{" "}
        </Button>
        <div>
          {" "}
          New user{" "}
          <Link
            to="/Register"
            className=" p-2  text-primary"
            varient="outline-primary"
          >
            {" "}
            Register{" "}
          </Link>{" "}
        </div>
      </LoginPage>
    </PageFormat>
  );
}

export default Login;
