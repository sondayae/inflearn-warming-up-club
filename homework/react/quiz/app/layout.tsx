import type { Metadata } from "next";
import Link from 'next/link';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "퀴즈",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flexArea'>
        <h2>Quiz</h2>
        <nav>
          <Link href={'/'}>
            Home
          </Link>&nbsp;&nbsp;
          <Link href={'/quiz'}>
            Quiz
          </Link>
        </nav>
        </div>

        <main>
          {children}
        </main>

      </body>
    </html>
  );
}
