import { useEffect } from "react";

export default function CommunicationProvider(props) {
  useEffect(() => {
    function handleMessage(e) {
      let { key, value, method } = e.data;
      if (method == "STORE") {
        window.localStorage.setItem(key, value);
      } else if (method == "RETRIEVE") {
        let response = window.localStorage.getItem(key);
        e.source.postMessage(
          {
            key,
            response,
            method: "RESPONSE",
          },
          "*"
        );
      }
    }
    window.addEventListener("message", handleMessage, false);
    return () => {
      window.removeEventListener("message", handleMessage, false);
    };
  }, []);

  return <>{props.children}</>;
}
