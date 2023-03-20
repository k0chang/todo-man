import { Dispatch, SetStateAction } from "react";

export type UseStateType<T> = [T, Dispatch<SetStateAction<T>>];
