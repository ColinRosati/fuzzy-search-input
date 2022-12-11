import React from "react";

export type SetAutoFillState = string[] | undefined;

export type SetFillValueState = { text: string, index: number };

export type HandleInputChange = (input: { target: { value: React.SetStateAction<string> | null }}) => void;

export type HandleClickSuggestion = (li: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
