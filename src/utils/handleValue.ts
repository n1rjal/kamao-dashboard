export function handleValue(value: string | number) {
  if (typeof value === "boolean") {
    return value ? "YES" : "NO";
  }
  if (typeof value === "string") {
    const parsedDate: Date = new Date(value);
    if (parsedDate.getDate()) {
      return new Date(value).toLocaleDateString();
    } else {
      return value;
    }
  }
  if (typeof value === "number") {
    return value;
  }
}
