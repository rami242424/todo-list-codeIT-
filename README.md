# ✅ do it;

> Next.js App Router 기반 할 일 관리 서비스

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss) ![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel)

---

## 📎 배포 링크

🔗 [do it; 바로가기](https://todo-list-code-it-ylay.vercel.app/)

---

## 📸 화면 구성

| 목록 페이지 | 상세 페이지 | 모바일 |
|---|---|---|
| ![목록](./screenshot_list.png) | ![상세](./screenshot_detail.png) | ![모바일](./screenshot_mobile.png) |

---

## 📌 주요 기능

- 진행 중(TO DO) / 완료(DONE) 목록 구분 조회
- 입력창에서 **버튼 클릭** 또는 **엔터 키**로 할 일 추가
- 체크 버튼 클릭으로 완료 ↔ 진행 중 상태 전환
- 완료 항목은 배경색과 취소선으로 구분
- 항목이 없을 경우 안내 이미지와 메시지 노출
- 상세 페이지에서 이름 · 상태 · 메모 수정
- 이미지 첨부 (파일명 영문 검증, 5MB 용량 제한)
- 수정 완료 / 삭제 후 목록 페이지로 자동 이동
- 모바일 · 태블릿 · 데스크탑 반응형 레이아웃

---

## 🛠 기술 스택

| 역할 | 기술 |
|---|---|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS |
| API | Todo REST API |
| 배포 | Vercel |

---

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── items/
│   │   └── [itemId]/
│   │       ├── page.tsx        # 상세 페이지 (서버 컴포넌트)
│   │       └── TodoDetail.tsx  # 상세 편집 UI (클라이언트 컴포넌트)
│   ├── globals.css             # 컬러 시스템 · 폰트 토큰
│   ├── layout.tsx              # 공통 레이아웃 (헤더)
│   └── page.tsx                # 할 일 목록 페이지
├── components/
│   ├── Button.tsx              # 공용 버튼
│   ├── Input.tsx               # 공용 입력창
│   ├── PlusIcon.tsx            # 추가 아이콘
│   ├── CheckIcon.tsx           # 체크 아이콘
│   └── XIcon.tsx               # 삭제 아이콘
└── lib/
    └── api.ts                  # API 통신 모듈
```

---

## 🔧 구현 포인트

### 디자인 시안 구조를 그대로 옮긴 Button 컴포넌트

시안의 버튼은 **Type(추가·수정·삭제) / Size(large·small) / State(default·active)** 세 축으로 정의되어 있었습니다. 버튼마다 컴포넌트를 따로 만들면 같은 스타일이 여러 파일에 흩어지므로, 이 세 축을 그대로 props로 옮겨 하나의 컴포넌트가 모든 조합을 처리하도록 했습니다.

색상은 중첩 객체로 매핑해 조건문 대신 인덱싱으로 접근합니다.

```tsx
const colorVariants = {
  add:  { default: "bg-slate-200 ...", active: "bg-violet-600 text-white" },
  edit: { default: "bg-slate-200 ...", active: "bg-lime-300 ..." },
};

const colorStyle = colorVariants[buttonType][state];
```

---

### 아이콘을 이미지 대신 인라인 SVG로 구현

처음에는 시안에서 아이콘을 PNG로 내보내 사용했지만 두 가지 문제가 있었습니다. 원본보다 크게 렌더링하면 화질이 뭉개졌고, 버튼이 활성 상태로 바뀌어 텍스트가 흰색이 되어도 아이콘은 검은색 그대로 남았습니다.

`stroke`에 `currentColor`를 지정한 인라인 SVG로 교체하자 두 문제가 함께 해결되었습니다. 벡터라 어떤 크기에서도 선명하고, 부모의 `text-*` 색상을 그대로 상속받아 상태 전환 시 아이콘 색상도 자동으로 따라갑니다.

```tsx
<path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2.5" />
```

---

### 반응형 로고를 CSS로 전환한 이유

데스크탑에서는 심볼과 텍스트가 함께 있는 로고를, 그 미만에서는 심볼만 노출해야 했습니다. `useState`로 화면 너비를 감지하는 방식도 가능했지만, 레이아웃은 서버 컴포넌트인데 이를 위해 `"use client"`를 붙이는 것은 비용이 컸습니다. 또 초기 렌더링 시점에는 화면 크기를 알 수 없어 깜빡임이 발생합니다.

두 이미지를 모두 렌더링하고 `md:hidden` / `hidden md:block`으로 노출만 전환하는 방식을 선택했습니다.

---

### 서버 컴포넌트와 클라이언트 컴포넌트의 역할 분리

상세 페이지는 데이터 조회와 편집이라는 성격이 다른 두 작업이 필요합니다. `page.tsx`(서버 컴포넌트)가 초기 데이터를 미리 가져와 props로 넘기고, `TodoDetail.tsx`(클라이언트 컴포넌트)는 전달받은 값을 state 초기값으로 사용해 상호작용만 담당합니다.

덕분에 첫 화면은 서버에서 완성된 상태로 전달되고, 클라이언트 번들에는 편집 로직만 포함됩니다.

---

### 입력마다 요청하지 않고 한 번에 저장

이름·메모·이미지·완료 여부는 모두 개별 state로 관리하되, 서버 전송은 **수정 완료** 버튼을 눌렀을 때 한 번만 수행합니다. 타이핑할 때마다 PATCH 요청을 보내면 불필요한 통신이 발생하고, 사용자가 수정을 취소할 방법도 사라지기 때문입니다.

```tsx
const handleUpdate = async () => {
  await updateTodo(todo.id, { name, memo, isCompleted, imageUrl });
  router.push("/");
};
```

---

### FormData 전송 시 Content-Type을 지정하지 않는 이유

이미지 업로드는 JSON이 아닌 `multipart/form-data`로 전송됩니다. 이때 헤더를 직접 지정하면 요청이 실패합니다. 각 파트를 구분하는 `boundary` 값을 브라우저가 자동 생성해야 하는데, 헤더를 덮어쓰면 이 값이 누락되기 때문입니다.

```ts
const formData = new FormData();
formData.append("image", file);

await fetch(`${BASE_URL}/images/upload`, {
  method: "POST",
  body: formData, // headers를 지정하지 않는다
});
```

---

### label로 file input을 감싼 파일 선택 UI

기본 `<input type="file">`은 브라우저마다 모양이 달라 시안대로 구현할 수 없습니다. input을 `hidden`으로 숨기고 `<label>`로 감싸면, label 클릭이 input 클릭으로 전달되어 원하는 디자인의 버튼으로 파일 선택 창을 열 수 있습니다. `useRef`와 `.click()` 호출 없이 HTML 표준 동작만으로 처리됩니다.

---

### tenantId 환경변수 분리

API는 `/api/{tenantId}/items` 형태로 사용자별 데이터 공간을 구분합니다. 이 값을 코드에 하드코딩하면 저장소를 공개할 때 그대로 노출되므로 `NEXT_PUBLIC_TENANT_ID` 환경변수로 분리하고, 로컬은 `.env.local`, 배포는 Vercel 환경변수로 각각 주입했습니다.

---

## 🚀 시작하기

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

루트에 `.env.local` 파일 생성 후 아래 내용 추가

```
NEXT_PUBLIC_TENANT_ID=your_tenant_id
```

> `tenantId`는 API 요청 경로에 사용되는 개인 식별자입니다. 값에 따라 데이터 공간이 분리됩니다.
