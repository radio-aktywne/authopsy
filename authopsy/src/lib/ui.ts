import { TTailwindString } from "tailwindcss-classnames";

export type TailwindClass<T> = T & {
  className?: TTailwindString;
};
