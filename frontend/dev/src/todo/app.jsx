import React from "react";
import { PlusCircle } from "react-bootstrap-icons";

import Context from "./context";
import TodoTabList from "../components/todo/tab/List";
import TodoTabEdit from "../components/todo/tab/Edit";
import TodoTabNew from "../components/todo/tab/New";
import TodoTabView from "../components/todo/tab/View";

export default () => {
  const [tab, setTab] = React.useState({ key: "list", loadList: true });
  const [list, setList] = React.useState([]);
  const csrfData = getCsrfData();

  const handleTabClick = (event, tab) => {
    event.preventDefault();

    const key = event.currentTarget.hash.replace("#", "");
    setTab({ key, ...tab });
  };

  return (
    <Context.Provider value={{ list, tab, csrfData, setList, setTab, setList }}>
      <ul className="nav nav-tabs mb-5">
        <li className="nav-item">
          <a
            className={`nav-link ${tab.key === "list" ? "active" : ""}`}
            href="#list"
            onClick={(event) => handleTabClick(event, { loadList: true })}
          >
            <div className={`h5 text-${tab.key === "list" ? "dark" : "muted"}`}>
              Мои задачи
            </div>
          </a>
        </li>

        {tab.key === "edit" ? (
          <li className="nav-item">
            <a className="nav-link active" href="#">
              <div
                className={`h5 text-${tab.key === "edit" ? "dark" : "muted"}`}
              >
                Задача № {tab.data?.id} -{" "}
                <span style={{ fontSize: ".8em", opacity: 0.5 }}>
                  редактирование
                </span>
              </div>
            </a>
          </li>
        ) : (
          <></>
        )}

        {tab.key === "view" ? (
          <li className="nav-item">
            <a className="nav-link active" href="#">
              <div
                className={`h5 text-${tab.key === "view" ? "dark" : "muted"}`}
              >
                Задача № {tab.data?.id}
              </div>
            </a>
          </li>
        ) : (
          <></>
        )}

        {tab.key == "new" ? (
          <li className="nav-item">
            <a className="nav-link active" href="#">
              <div
                className={`h5 text-${tab.key === "new" ? "dark" : "muted"}`}
              >
                Новая задача
              </div>
            </a>
          </li>
        ) : (
          <li className="nav-item">
            <a
              className="nav-link"
              href="#new"
              onClick={handleTabClick}
              style={{ padding: "10px 12px 14px 12px" }}
            >
              <PlusCircle size="1.2em" />
            </a>
          </li>
        )}
      </ul>

      <div style={{ minHeight: 100 }}>
        {tab.key === "list" ? <TodoTabList /> : <></>}
        {tab.key === "new" ? <TodoTabNew /> : <></>}
        {tab.key === "edit" ? <TodoTabEdit {...tab.data} /> : <></>}
        {tab.key === "view" ? <TodoTabView {...tab.data} /> : <></>}
      </div>
    </Context.Provider>
  );
};

const getCsrfData = () => {
  const csrfToken = document
      .querySelector('[name="csrf-token"]')
      ?.getAttribute("content"),
    csrfParam = document
      .querySelector("meta[name=csrf-param]")
      ?.getAttribute("content");

  return { [csrfParam]: csrfToken };
};
