export function getFetchHeaders(apiRole: string = 'authenticated') {
  return {
    'Content-Type': 'application/json',
    'X-MS-API-ROLE': apiRole,
  };
}
