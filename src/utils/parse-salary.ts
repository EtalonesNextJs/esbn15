export function parseSalary(salary: string | undefined | null): number {
  if (!salary) return 0;

  // Убираем пробелы между цифрами (например: "1 500" => "1500")
  const cleaned = salary.replace(/[\s€]/g, '');

  // Ищем все группы цифр, включая "1.500" или "1,500"
  const matches = cleaned.match(/\d+(?:[.,]?\d+)?/g);

  if (!matches || matches.length === 0) return 0;

  const nums = matches.map((n) =>
    Number(n.replace(',', '.').replace('.', '')) // заменим запятые и точки, чтобы не было NaN
  ).filter((n) => !isNaN(n));

  return Math.max(...nums);
}
