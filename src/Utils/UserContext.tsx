import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { auth } from "./FirebaseConfig";

export interface AppUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

interface UserContextType {
    user: AppUser | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    logout: async () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AppUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Restore from localStorage on first load (covers Supabase email/password sessions)
        const storedId = localStorage.getItem("user_id");
        const storedEmail = localStorage.getItem("user_email");
        const storedName = localStorage.getItem("username");
        if (storedId && storedEmail) {
            setUser({
                uid: storedId,
                email: storedEmail,
                displayName: storedName,
                photoURL: null,
            });
        }

        // Firebase auth state (covers Google sign-in sessions)
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
            if (firebaseUser) {
                const appUser: AppUser = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                };
                setUser(appUser);
                // Keep localStorage in sync
                localStorage.setItem("user_id", firebaseUser.uid);
                localStorage.setItem("user_email", firebaseUser.email ?? "");
                localStorage.setItem("username", firebaseUser.displayName ?? firebaseUser.email ?? "");
            } else {
                // Only clear context if localStorage is also empty
                const localId = localStorage.getItem("user_id");
                if (!localId) setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_email");
        localStorage.removeItem("username");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, loading, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
