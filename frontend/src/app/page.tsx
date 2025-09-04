import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockBlogs = [
  {
    id: 1,
    title: "Bài viết đầu tiên",
    excerpt: "Đây là đoạn tóm tắt ngắn...",
    author: "Admin",
  },
  {
    id: 2,
    title: "Hello Next.js",
    excerpt: "Bắt đầu học Next.js với shadcn...",
    author: "User01",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-4">
      {mockBlogs.map((blog) => (
        <Card key={blog.id} className="hover:shadow-md transition">
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{blog.excerpt}</p>
            <p className="text-sm text-gray-500">Tác giả: {blog.author}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
