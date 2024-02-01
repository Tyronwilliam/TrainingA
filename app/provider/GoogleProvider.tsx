"use client";
import Script from "next/script";
import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function GoogleProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LdOB3IoAAAAAHy_OhqQXCkbiT58MrqG_cyTu1SM">
      {children}
      {/* <Script
        id="cookieyes"
        type="text/javascript"
        src="https://cdn-cookieyes.com/client_data/25f157bf1a80fb0cb0b9e79c/script.js"
      /> */}
    </GoogleReCaptchaProvider>
  );
}
