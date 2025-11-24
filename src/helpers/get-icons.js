import { ICON_MAP } from "../api/iconMap";

export const getIconUrl = (iconCode) => {
  return `icons/${ICON_MAP.get(iconCode)}.svg`;
};
