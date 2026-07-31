import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "do it;",
  description: "할 일을 등록하고 관리하는 Todo 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-[NanumSquare]">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <Link href="/" className="inline-block">
              {/* 모바일: 로고만 */}
              <Image
                src="/logoSmall.png"
                alt="do it;"
                width={71}
                height={40}
                priority
                className="md:hidden"
              />
              {/* 데스크탑: 로고 + doit; */}
              <Image
                src="/logoFull.png"
                alt="do it;"
                width={151}
                height={40}
                priority
                className="hidden md:block"
              />
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}