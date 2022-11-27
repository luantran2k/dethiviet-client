import { createSelector } from "@reduxjs/toolkit";
import { AnswerType } from "../../components/Answer/interfaces/IAnswer";
import { RootState } from "../store";

const exam = (state: RootState) => state.exam;
const parts = (state: RootState) => state.exam.parts;

//Param
const partIdParam = (state: RootState, partId: number) => partId;
const questionIdParam = (
    state: RootState,
    questionInfo: { partId: number; questionId: number }
) => questionInfo;
const answerIdParam = (
    state: RootState,
    answerInfo: {
        partId: number;
        questionId: number;
        answerId: number;
    }
) => answerInfo;

export const partIdsSelector = createSelector(parts, (parts) =>
    parts?.map((part) => part.id)
);

export const partsSelector = createSelector(parts, (parts) => parts);

export const partSeletor = createSelector(parts, partIdParam, (parts, partId) =>
    parts?.find((part) => part.id === partId)
);

export const questionSeletor = createSelector(
    parts,
    questionIdParam,
    (parts, { partId, questionId }) =>
        parts
            ?.find((part) => part.id === partId)
            ?.questions?.find((question) => question.id === questionId)
);

export const answerSeletor = createSelector(
    parts,
    answerIdParam,
    (parts, { partId, questionId, answerId }): AnswerType | undefined =>
        parts
            ?.find((part) => part.id === partId)
            ?.questions?.find((question) => question.id === questionId)
            ?.answers?.find((answer) => answer.id === answerId)
);
