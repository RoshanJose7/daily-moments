export function formateDate(isoString: string) {
  return new Date(isoString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
