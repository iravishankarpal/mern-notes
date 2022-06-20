import React, { useState } from "react";
import PageFormat from "./PageFormat";
import { Button } from "react-bootstrap";
import styeld from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import axios from "axios";
import Lodingspinner from "../Loding";
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
function Regester() {
  let navigate = useNavigate();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [reEnteredPassword, setreEnteredPassword] = useState();
  const [error, seterror] = useState({ state: false, message: null });
  const [Loding, setLoding] = useState(false);
  const handleRegisterSubmit = async (e) => {
    setLoding(true);
    // console.log(error, password, reEnteredPassword);
    if (!(reEnteredPassword === password)) {
      seterror({
        status: true,
        message: "Re entered password didn't match",
      });
    } else {
      await axios
        .post("/user/Register", { name, email, password })
        .then((data) => {
          if (data.data.status === 400) {
            seterror({ status: true, message: data.data.message });
          } else {
            localStorage.setItem("userInfo", JSON.stringify(data.data));
            navigate("/MyNotes");
          }
        })
        .catch((err) => {
          seterror({ status: true, message: err });
          console.log(error);
        });
    }
    setLoding(false);
  };

  return (
    <PageFormat title={"Register"}>
      <LoginPage>
        <div>
          {error.status && (
            <ErrorMessage variant="danger">{error.message}</ErrorMessage>
          )}
          {Loding && <Lodingspinner />}
          <fieldset>
            <span>Name</span>
            <Input
              type="Name"
              placeholder="Name"
              name="Name"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <span>Password</span>
            <Input
              type="Password"
              placeholder="Password"
              name="Password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <span>Retry Password</span>
            <Input
              type="Password"
              placeholder="Password"
              name="Password"
              onChange={(e) => {
                setreEnteredPassword(e.target.value);
                seterror({ status: false });
              }}
            />
          </fieldset>
          <fieldset>
            <span>Email</span>
            <Input
              type="Email"
              placeholder="Email"
              name="Email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </fieldset>

          <Button
            className="py-2 my-2"
            type="submit"
            onClick={(e) => {
              handleRegisterSubmit();
            }}
          >
            {" "}
            Submit{" "}
          </Button>
          <div>
            {" "}
            New user{" "}
            <Link
              to="/"
              className=" p-2  text-primary"
              varient="outline-primary"
            >
              {" "}
              Login{" "}
            </Link>{" "}
          </div>
        </div>
      </LoginPage>
    </PageFormat>
  );
}

export default Regester;
