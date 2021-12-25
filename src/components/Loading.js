import React from "react";
import Lottie from "react-lottie";

import LoadingAnimationData from "../assets/animation/loadingAnimationData.json";

const Loading = () => {
  return (
    <Lottie
      style={{ marginTop: "3em" }}
      height={"6em"}
      width={"6em"}
      options={{
        loop: true,

        autoplay: true,
        animationData: LoadingAnimationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
    />
  );
};

export default Loading;
