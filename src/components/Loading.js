import React from "react";
import Lottie from "react-lottie";

import LoadingAnimationData from "../assets/animation/loadingAnimationData.json";

const Loading = () => {
  return (
    <Lottie
      style={{ marginTop: "3em" }}
      height={"10em"}
      width={"10em"}
      options={{
        loop: true,

        autoplay: true,
        animationData: LoadingAnimationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid Slice",
        },
      }}
    />
  );
};

export default Loading;
