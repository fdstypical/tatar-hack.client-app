import { ReactNode } from "react";

export type Nullable<T> = T | null;

export type WithChildren<T = {}> = T & { children: ReactNode };
