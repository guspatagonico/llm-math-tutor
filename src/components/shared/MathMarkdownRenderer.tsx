import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface MathMarkdownRendererProps {
  content: string;
  textClassName?: string;
}

export default function MathMarkdownRenderer({ content }: MathMarkdownRendererProps) {
  return (
    <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 leading-relaxed space-y-2">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ children }) => <p className="mb-2">{children}</p>,
          strong: ({ children }) => <strong className="font-bold text-slate-900 dark:text-white">{children}</strong>,
          code: ({ children }) => (
            <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-xs font-mono text-purple-600 dark:text-purple-400">
              {children}
            </code>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-2">
              <table className="w-full text-xs border-collapse border border-slate-200 dark:border-slate-700 rounded-lg">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-left">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-2 border border-slate-200 dark:border-slate-700">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
