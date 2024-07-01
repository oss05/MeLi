"use client";
import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="h-80 flex justify-center items-center">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#009ee3"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
