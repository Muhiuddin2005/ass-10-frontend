import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About</a>
        <a className="link link-hover">Contact</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a>
            <FaFacebook className="text-2xl" />
          </a>
          <a>
            <FaXTwitter className="text-2xl" />

          </a>
          <a>
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          © 2025 EcoTrack — All rights reserved. <br />
          <span className="text-sm">
            Accessibility and Privacy . Designed for a greener globe!
          </span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
