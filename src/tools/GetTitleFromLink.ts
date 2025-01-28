export function GetTitleFromLink(url: string): string {
  const title = url.split('/').pop()?.split('.').slice(0, -1).join('.');
  return title ? title : '';
}