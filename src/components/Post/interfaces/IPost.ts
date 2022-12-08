import { User } from "../../../redux/slices/appSlice";

export default interface IPost {
    id: number;
    ownerId: number;
    content: string;
    questioningAudio?: string;
    questioningImage?: string[];
    tags: string[];
    vote: number;
    createdAt: string;
    updatedAt: string;
    owner: User;
}
