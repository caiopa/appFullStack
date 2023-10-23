import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"


const heandletr = NextAuth(authOptions)

export { heandletr as GET, heandletr as POST }