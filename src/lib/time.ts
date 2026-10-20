export const BUILD_DATE = __BUILD_DATE__;
export const BUILD_YEAR = Number(BUILD_DATE.slice(0, 4));
export const dayOfYear = Math.floor((Date.parse(`${BUILD_DATE}T00:00:00Z`) - Date.UTC(BUILD_YEAR, 0, 0)) / 86400000);
