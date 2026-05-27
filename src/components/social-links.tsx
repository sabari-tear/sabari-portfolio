import Link from "next/link";

import { siteContent } from "@/lib/site-content";

const { socialLinks } = siteContent;

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={className}>
      {socialLinks.map((social) => (
        <li key={social.label}>
          <Link
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-slate-400 transition hover:text-cyan-300"
          >
            {social.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
