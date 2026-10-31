// React
import React from "react";

// External

// Local

interface ExternalLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel" | "referrerPolicy"> {
  href: string;
  children: React.ReactNode;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">
      {children}
    </a>
  );
};

export default ExternalLink;
