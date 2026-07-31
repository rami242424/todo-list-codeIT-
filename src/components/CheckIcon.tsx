/**
 * 체크(✓) 아이콘 — 수정 완료 버튼에 사용
 * currentColor를 사용해 버튼 상태에 따라 색상이 자동 전환된다.
 */

type IconProps = {
  className?: string;
};

export default function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2.5 8.5L6 12L13.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}