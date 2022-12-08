import { User } from "../../../redux/slices/appSlice";

export interface IComment {
    id: number;
    questioningId: number;
    owner: User;
    ownerId: number;
    content: string;
    upVote: number[];
    downVote: number[];
    createdAt: string;
    updatedAt: string;
}
