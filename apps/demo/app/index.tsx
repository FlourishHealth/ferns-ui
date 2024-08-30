import {Redirect} from "expo-router";
import React from "react";

export default function Route() {
  if (process.env.NODE_ENV === "production") {
    return <Redirect href="/demo" />;
  }
  return <Redirect href="/dev" />;
}
