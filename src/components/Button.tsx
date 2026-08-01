/**
 * 공용 버튼 컴포넌트
 * 디자인 시안의 Type / Size / State 3축 구조를 그대로 props로 옮겼다.
 * - buttonType: 용도별 색상 (추가 / 수정 / 삭제)
 * - size: large(164px) / small(55px)
 * - state: default / active (입력값 유무, 완료 여부 등에 따라 전환)
 */

type ButtonProps = {
  buttonType: "add" | "edit" | "delete";
  size: "large" | "small";
  state?: "default" | "active";
  children: React.ReactNode;
  onClick?: () => void;
};

/** buttonType과 state 조합에 따른 색상 매핑 */
const colorVariants = {
  add: {
    default: "bg-slate-200 text-slate-900",
    active: "bg-violet-600 text-white",
  },
  edit: {
    default: "bg-slate-200 text-slate-900",
    active: "bg-lime-300 text-slate-900",
  },
};

/**
 * 모든 버튼이 공통으로 갖는 스타일
 * shadow는 시안의 하드 그림자(오프셋 4px, blur 없음)를 재현한 것
 */
const base =
  "h-[52px] rounded-3xl border-2 border-slate-900 flex items-center justify-center gap-1 text-base font-bold leading-none whitespace-nowrap shadow-[4px_4px_0_0_#0F172A] cursor-pointer";

export default function Button({
  buttonType,
  size,
  state = "default",
  children,
  onClick,
}: ButtonProps) {
  // delete는 state 구분이 없어 별도 처리
  const colorStyle =
    buttonType === "delete"
      ? "bg-rose-500 text-white"
      : colorVariants[buttonType][state];

  const sizeStyle = size === "large" ? "w-[164px]" : "w-[55px]";

  return (
    <button className={`${colorStyle} ${sizeStyle} ${base}`} onClick={onClick}>
      {children}
    </button>
  );
}