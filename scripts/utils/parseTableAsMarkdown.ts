const parseTableAsMarkdown = (table: Element): string => {
  let result = '';
  const ths: string[] = [];
  table.querySelectorAll('thead th').forEach((th) => {
    ths.push(th.textContent || '');
  });
  const dashes = Array.from({ length: ths.length }, () => '-');
  result += `| ${ths.join(' | ')} |\n`;
  result += `| ${dashes.join(' | ')} |\n`;
  table.querySelectorAll('tbody tr').forEach((tr) => {
    const tds = [...tr.children].map((td) => td.textContent);
    result += `| ${tds.join(' | ')} |\n`;
  });
  return result;
};

export default parseTableAsMarkdown;
