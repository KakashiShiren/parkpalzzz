import { PawPrint, Baby } from "lucide-react";

interface ParkPalsLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizes = {
  sm: { icon: 14, text: "text-lg", gap: "gap-1.5", container: "w-8 h-8" },
  md: { icon: 16, text: "text-xl", gap: "gap-2", container: "w-10 h-10" },
  lg: { icon: 22, text: "text-2xl", gap: "gap-2.5", container: "w-14 h-14" },
};

const ParkPalsLogo = ({ size = "md", showText = true }: ParkPalsLogoProps) => {
  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap}`}>
      <div className={`${s.container} rounded-xl gradient-primary flex items-center justify-center relative`}>
        <PawPrint size={s.icon} className="text-primary-foreground absolute -left-0.5 top-0.5" style={{ transform: "rotate(-15deg)" }} />
        <Baby size={s.icon - 2} className="text-primary-foreground absolute right-0 bottom-0.5" style={{ transform: "rotate(10deg)" }} />
      </div>
      {showText && (
        <span className={`${s.text} font-extrabold gradient-text`}>ParkPals</span>
      )}
    </div>
  );
};

export default ParkPalsLogo;
