import { User } from "../../../redux/slices/appSlice";

export default interface IReport {
    id: number;
    user: User;
    userId: number;
    owner?: User;
    ownerId: number;
    image?: string;
    content: string;
    state: string;
    createdAt: string;
    updatedAt: string;
}
