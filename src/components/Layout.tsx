import React from "react";
import MainNav from "./MainNav";

function Layout(props) {
  return (
    <div className="h-screen bg-background">
      <MainNav />
      {props.children}
    </div>
  );
}

export default Layout;
