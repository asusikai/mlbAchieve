import React from "react";
import AppBar from "@/app/AppBar";
import LoginCheck from "@/app/loginCheck";

export default function SearchLayout({
                                      children,
                                    }: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppBar />
      <LoginCheck />
      {children}
    </>
  )
}