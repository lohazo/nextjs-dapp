import React from "react";

function Footer(props) {
  return (
    <div>
      <div
        className="max-w-6xl mx-auto bg-privacy bg-opacity-20 mt-28"
        style={{ height: "1px" }}
      ></div>
      <div className="flex text-privacy max-w-6xl mx-auto justify-between mt-4 pb-4 px-4 md:px-0">
        <p>©2021 PROJECT </p>
        <div className="flex">
          <a href="/">
            <p>IDO</p>
          </a>
          <a href="/farm">
            <p className="ml-6 md:ml-12">Farm</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
