import { AuthStore, User } from "@/domain";
import { generateUUID } from "@/infra/utils";

interface Params<T> {
    get: () => T;
    set: (state: T | ((state: T) => Partial<T>)) => void;
}

export class AuthUseCase {
    static add({ set }: Params<AuthStore>, email: string, password: string) {
        if (password.length < 6) {
            return false;
        }

        const user: User = {
            id: generateUUID(),
            name: email.split("@")[0],
            email,
            role: 'admin'
        };

        set(state => ({
            ...state,
            user,
            isAuthenticated: true,
        }));

        return true;
    }
}
