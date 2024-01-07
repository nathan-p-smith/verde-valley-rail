export default function formatDuration(totalMinutes: number): string {
  if (typeof totalMinutes !== "number" || totalMinutes < 0) {
    throw new Error("Input must be a non-negative number");
  }

  const hours: number = Math.floor(totalMinutes / 60);
  const minutes: number = totalMinutes % 60;

  const formattedHours: string = hours.toString().padStart(2, "0");
  const formattedMinutes: string = minutes.toString().padStart(2, "0");

  if (hours > 0 && minutes > 0) return `${hours} hrs ${minutes} mins`;

  if (hours > 0 && minutes == 0) return `${hours} hrs`;

  if (hours == 0 && minutes > 0) return `${minutes} mins`;

  return `${formattedHours}:${formattedMinutes}`;
}
