import React from "react";

export const metadata = {
  title: "NextGram",
  description:
    "A sample Next.js app showing dynamic routing with modals as a route.",
  metadataBase: new URL("https://nextgram.vercel.app"),
};

function layout(props: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <div>
      {props.children}
      {props.modal}
      <div id="modal-root" />
    </div>
  );
}

export default layout;
