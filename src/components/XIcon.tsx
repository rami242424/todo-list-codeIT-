/**
 * 엑스(✕) 아이콘 — 삭제하기 버튼에 사용
 * currentColor를 사용해 버튼의 텍스트 색상을 따라간다.
 */

type IconProps = {
  className?: string;
};

export default function XIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 4L12 12M12 4L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}