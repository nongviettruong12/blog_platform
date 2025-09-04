import { apiFetch } from "@/lib/api";

export default async function BlogList() {
  const data = await apiFetch("/posts");
  const posts = data.items;

  return (
    <div className="space-y-4">
      {posts.map((post: any) => (
        <a
          key={post._id}
          href={`/blog/${post._id}`}
          className="block border p-4 rounded-lg hover:bg-gray-50"
        >
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-sm text-gray-600">
            {post.content.slice(0, 100)}...
          </p>
        </a>
      ))}
    </div>
  );
}
