import React, { useEffect } from "react";

export default function Page(props) {
  useEffect(() => {
    document.title = `IWS Forms | ${props.title}`;
    window.scrollTo(0, 0);
  });
  return <div>{props.children}</div>;
}
