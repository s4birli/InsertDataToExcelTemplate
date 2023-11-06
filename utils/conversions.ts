import { Row } from "../types/excel";
export function excelDateToJSDate(date: number): Date {
  return new Date(Math.round((date - 25569) * 864e5));
}
export function formatDate(date: Date): string {
  const pad = (num: any) => (num < 10 ? "0" + num : num);
  date.setHours(date.getHours() - 1);

  const dd = pad(date.getDate());
  const mm = pad(date.getMonth() + 1);
  const yyyy = date.getFullYear();
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
}

export function processData(jsonData: Row[]): Row[] {
  return jsonData.map((row: Row) => {
    const dateKey = Object.keys(row)[0];
    if (row[dateKey]) {
      const parsedDate = excelDateToJSDate(row[dateKey]);
      row[dateKey] = formatDate(parsedDate);
    }
    return row;
  });
}
