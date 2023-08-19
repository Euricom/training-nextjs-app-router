import 'server-only';

/**
 * Return a Prisma orderBy object from a sort expression like 'LastName' or '-LastName'
 * @param sortExpression
 * @returns
 */
export function getOrderBy(sortExpression: string): Record<string, unknown> {
  const order = sortExpression.startsWith('-') ? 'desc' : 'asc';
  return { [sortExpression.replace('-', '')]: order };
}
