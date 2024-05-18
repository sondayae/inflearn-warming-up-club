import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Nav = () => {
  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const [userData, setUserData] = useState(initialUserData); //TODO - 추후 상태관리를 통해 로그인여부 저장

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else if (user && pathname === "/") {
        navigate("/main");
      }
    });
  }, [auth, navigate, pathname]);

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listener = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUserData();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="Disney Plus logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
      {pathname === "/" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Input onChange={handleChange} />
          <SignOut>
            <UserImg src={userData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span onClick={handleLogOut}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </NavWrapper>
  );
};

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  color: white;
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  height: 100%;
  border-radius: 50%;
  height: 90%;
`;

const Login = styled.a`
  color: #f9f9f9;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: 1px solid lightgray;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

export default Nav;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Nav.css";

// export default function Nav() {
//   const initialUserData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};

//   const isLogin = window.location.pathname !== "/" ? true : false; //TODO - 추후 상태관리를 통해 로그인여부 가져옴
//   const [show, setShow] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.addEventListener("scroll", () => {
//       console.log("window.scrollY", window.scrollY);
//       if (window.scrollY > 50) {
//         setShow(true);
//       } else {
//         setShow(false);
//       }
//     });

//     return () => {
//       window.removeEventListener("scroll", () => {});
//     };
//   }, []);

//   const handleChange = (e) => {
//     setSearchValue(e.target.value);
//     navigate(`/search?q=${e.target.value}`);
//   };

//   return (
//     <nav className={`nav ${show && "nav__black"} `}>
//       <img
//         style={{ cursor: "pointer" }}
//         alt="Netflix logo"
//         src="https://upload.wikimedia.org/wikipedia/commons/7/77/Disney_Plus_logo.svg"
//         className="nav__logo"
//         onClick={() =>
//           isLogin
//             ? (window.location.href = "/main")
//             : (window.location.href = "/")
//         }
//       />
//       {isLogin && (
//         <input
//           value={searchValue}
//           onChange={handleChange}
//           className="nav__input"
//           type="text"
//           placeholder="영화를 검색해주세요."
//         />
//       )}
//     </nav>
//   );
// }
