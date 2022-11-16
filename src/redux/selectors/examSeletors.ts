import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const exam = (state: RootState) => state.exam;
const parts = (state: RootState) => state.exam.parts;

//Param
const partClientIdParam = (state: RootState, partClientId: number) =>
    partClientId;
const questionClientIdParam = (
    state: RootState,
    questionInfo: { partClientId: number; questionClientId: number }
) => questionInfo;
const answerClientIdParam = (
    state: RootState,
    answerInfo: {
        partClientId: number;
        questionClientId: number;
        answerClientId: number;
    }
) => answerInfo;

export const partClientIdsSelector = createSelector(parts, (parts) =>
    parts?.map((part) => part.clientId)
);

export const partsSelector = createSelector(parts, (parts) => parts);

export const partSeletor = createSelector(
    parts,
    partClientIdParam,
    (parts, partClientId) =>
        parts?.find((part) => part.clientId === partClientId)
);

export const questionSeletor = createSelector(
    parts,
    questionClientIdParam,
    (parts, { partClientId, questionClientId }) =>
        parts
            ?.find((part) => part.clientId === partClientId)
            ?.questions?.find(
                (question) => question.clientId === questionClientId
            )
);

export const answerSeletor = createSelector(
    parts,
    answerClientIdParam,
    (parts, { partClientId, questionClientId, answerClientId }) =>
        parts
            ?.find((part) => part.clientId === partClientId)
            ?.questions?.find(
                (question) => question.clientId === questionClientId
            )
            ?.answers?.find((answer) => answer.clientId === answerClientId)
);
