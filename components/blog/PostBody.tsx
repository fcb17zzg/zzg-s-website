import { MDXRemote } from 'next-mdx-remote/rsc';

type PostBodyProps = {
  content: string;
};

export default function PostBody({ content }: PostBodyProps) {
  return (
    <div className="prose prose-neutral max-w-none">
      <MDXRemote source={content} />
    </div>
  );
}
