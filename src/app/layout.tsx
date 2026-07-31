import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "do it;",
  description: "할 일을 등록하고 관리하는 Todo 앱",
};

/**
 * 전체 페이지 공통 레이아웃
 * 상단 헤더(로고)를 모든 페이지에 공통으로 노출한다.
 */
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
            {/* 로고 클릭 시 목록 페이지(/)로 이동 */}
            <Link href="/" className="inline-block">
              {/*
                반응형 로고 처리
                두 이미지를 모두 렌더링하고 CSS로 노출을 전환한다.
                JS로 화면 크기를 감지하면 클라이언트 컴포넌트 전환과
                초기 렌더링 깜빡임이 발생하므로 CSS 방식을 선택했다.
              */}
              {/* 모바일/태블릿: 심볼만 */}
              <Image
                src="/logoSmall.png"
                alt="do it;"
                width={71}
                height={40}
                priority
                className="md:hidden"
              />
              {/* 데스크탑: 심볼 + 텍스트 */}
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