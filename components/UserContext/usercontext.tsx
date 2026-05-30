import { createContext, useContext, useState } from "react";

export type User = {
    email: string
    surname: string
    lastname: string
} | null

type UserContextType = {
    user: User
    setUser: (user: User) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider(props: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context
}