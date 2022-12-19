import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Main from "../pages/Main";
import SignUp from "../pages/SignUp";
import Login from "../pages/LogIn";
import Add from "../pages/Add";
import Edit from "../pages/Edit";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route>
            <Route path="/" element={<Main />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="add" element={<Add />} />
            <Route path="edit/:id" element={<Edit />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
