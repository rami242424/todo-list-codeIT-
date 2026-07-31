/**
 * 추가(+) 아이콘
 * PNG 대신 인라인 SVG로 구현한 이유:
 * 1. 벡터라 어떤 크기에서도 선명하다
 * 2. stroke에 currentColor를 사용해 부모의 text 색상을 그대로 따라간다
 *    (Button의 active 상태에서 텍스트와 아이콘 색이 함께 바뀜)
 * 3. 별도 이미지 요청이 발생하지 않는다
 */

type IconProps = {
  className?: string;
};

export default function PlusIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" // 의미 전달은 옆의 텍스트가 담당하므로 스크린리더에서 제외
    >
      <path
        d="M8 2v12M2 8h12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}