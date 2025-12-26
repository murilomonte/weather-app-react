export function extractWeekDay(str: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(new Date(str));
}

export function extractHour(str: string, hour12: boolean = false): number {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: hour12,
    }).format(new Date(str)),
  );
}

export function extractDayHour(str: string): {
  day: string;
  hour: number;
} {
  const day = extractWeekDay(str);
  const hour = extractHour(str);

  return {
    day,
    hour,
  };
}
