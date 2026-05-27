import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => <h2 className="mb-4 mt-12 text-xl text-slate-200 lg:text-2xl">{children}</h2>,
  p: ({ children }) => <p className="mb-6">{children}</p>,
  ul: ({ children }) => <ul className="mb-6 list-disc pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="mb-6 list-decimal pl-6">{children}</ol>,
  li: ({ children }) => <li className="mb-2">{children}</li>,
  a: ({ children, href }) => (
    <a className="font-medium text-blue-300 underline decoration-blue-300/50 underline-offset-4 transition hover:text-slate-200 hover:decoration-slate-200 focus-visible:text-slate-200 focus-visible:decoration-slate-200" href={href}>
      {children}
    </a>
  ),
};
