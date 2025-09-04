import { apiFetch } from "@/lib/api";

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const data = await apiFetch(`/posts/${params.id}`);
  const post = data.post;

  return (
    <article className="prose lg:prose-xl">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p className="text-sm text-gray-500">Tác giả: {post.author?.username}</p>
    </article>
  );
}
