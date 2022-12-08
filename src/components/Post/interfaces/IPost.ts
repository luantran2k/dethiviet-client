import { User } from "../../../redux/slices/appSlice";
import { IComment } from "../../Comment/interfaces/Comment";

export default interface IPost {
    id: number;
    ownerId: number;
    content: string;
    questioningAudio?: string;
    questioningImage?: string[];
    tags: string[];
    upVote: number[];
    downVote: number[];
    createdAt: string;
    updatedAt: string;
    owner: User;
    explainings: IComment[];
}
