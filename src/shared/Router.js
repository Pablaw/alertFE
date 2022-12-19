import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Main from "../pages/Main";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import AddEdit from "../pages/Add";
import Edit from "../pages/Edit";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route>
            <Route path="/" element={<Main />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
            <Route path="add" element={<AddEdit />} />
            <Route path="edit/:id" element={<Edit />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
