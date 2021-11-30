import NextAuth from "next-auth"
import GoogleAuthProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GoogleAuthProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name.split(" ").join("").toLowerCase();
      session.user.uid = token.sub;
      return session;
    }
  },
  secret: "super_secret_key"
})