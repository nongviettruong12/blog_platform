import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <nav className="p-4 shadow bg-white">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Blog Platform</h1>
            <div className="space-x-4">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a href="/auth/login" className="hover:underline">
                Login
              </a>
              <a href="/auth/register" className="hover:underline">
                Register
              </a>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
