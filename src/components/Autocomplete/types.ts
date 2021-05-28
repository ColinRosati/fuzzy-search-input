import React from "react";

export type SetAutoFillState = string[] | undefined;

export type SetFillValueState = { text: string, index: number };

export type HandleChange = (e: { target: { value: React.SetStateAction<string> | null }}) => void;

export type HandleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
