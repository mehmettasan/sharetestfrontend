import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

export const sessionAtom =atomWithStorage(null);
export const activeMenuAtom = atom("");
export const questionsAtom = atom([
    {
        id:1,
        question:"",
        optionA:"",
        optionB:"",
        optionC:"",
        optionD:"",
        trueAnswer:"a"
    }
]);

export const TestAtom = atom(null)