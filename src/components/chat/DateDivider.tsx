import { isToday, isYesterday, format } from "date-fns";

interface DateDividerProps {
  date: Date;
}

export function DateDivider({ date }: DateDividerProps) {
  let label: string;
  if (isToday(date)) {
    label = "Today";
  } else if (isYesterday(date)) {
    label = "Yesterday";
  } else {
    label = format(date, "MMMM d, yyyy");
  }

  return (
    <div className="flex items-center justify-center my-3 sticky top-0 z-10">
      <span className="bg-muted/80 backdrop-blur-sm text-muted-foreground text-[11px] font-bold px-3 py-1 rounded-full">
        {label}
      </span>
    </div>
  );
}
