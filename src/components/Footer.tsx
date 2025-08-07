import React from "react";
import styled from "styled-components";
import pkg from "../../package.json";
import { SocialIcon } from 'react-social-icons';

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 24px 0 16px 0;
  background: #ff9900;
  color: #000; // changed to black
  text-align: center;
  font-size: 16px;
  margin-top: 40px;
`;

const SocialLinks = styled.div`
  margin-bottom: 8px;
  a {
    margin: 0 10px;
    color: #000;
    text-decoration: none;
    font-size: 20px;
    transition: color 0.2s;
    &:hover {
      color: #ffffffff; // orange on hover
    }
  }
`

export default function Footer() {
  return (
    <FooterWrapper>
      <SocialLinks>
        <SocialIcon url="https://twitter.com/i/communities/1949296345229181382" network="twitter" bgColor="#000" fgColor="#fff" style={{ height: 32, width: 32, margin: "0 10px" }} label="Twitter Community" />
        <SocialIcon url="https://discord.gg/QvYYUcwX" network="discord" bgColor="#000" fgColor="#fff" style={{ height: 32, width: 32, margin: "0 10px" }} label="Discord" />
        <SocialIcon url="https://github.com/Goshen-Digital-Group/bonkbet" network="github" bgColor="#000" fgColor="#fff" style={{ height: 32, width: 32, margin: "0 10px" }} label="GitHub" />
      </SocialLinks>
      <div>
        © {new Date().getFullYear()} Bonkbet. All rights reserved.
      </div>
      <div style={{ fontSize: "15px", marginTop: "4px" }}>
        Version: <a
          href="https://github.com/Goshen-Digital-Group/bonkbet"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#000", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = "#000")}
        >
          {pkg.version}
        </a>
      </div>
    </FooterWrapper>
  );
}