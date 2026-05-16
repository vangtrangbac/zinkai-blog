/**
 * import.meta.env.BASE_URL có thể là `/repo` hoặc `/repo/` — chuẩn hoá slash cuối
 * để nối `blog/...` không bị `/repoblog/`.
 */
export function siteBaseUrl(): string {
  const b = import.meta.env.BASE_URL;
  return b.endsWith("/") ? b : `${b}/`;
}
