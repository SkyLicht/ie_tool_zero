import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Optional: Adjust as needed
const FAST_API_URL = process.env.FASTAPI_URL;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { username, password } = credentials;
          if (!username || !password) {
            return null;
          }

          // Check if username and password are strings
          if (typeof username !== "string" || typeof password !== "string") {
            return null;
          }

          // Check if username and password are empty

          if (!username || !password) {
            return null;
          }

          // 1. Call FastAPI /token endpoint
          const res = await fetch(`${FAST_API_URL}/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              username: username,
              password: password,
            }),
          });

          if (!res.ok) {
            // If the login fails, return null
            return null;
          }

          // 2. Extract JWT token
          const data = await res.json();
          // data = { "access_token": "<JWT>", "token_type": "bearer" }
          const { access_token } = data;

          // 3. Get user profile from FastAPI using the token (optional)
          //    This allows you to attach user info (e.g., role, username) to the session.
          const profileRes = await fetch(`${FAST_API_URL}/api/v1/user/`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          if (!profileRes.ok) {
            return null;
          }

          const userProfile = await profileRes.json();
          // userProfile = { id, username, role_name, ... }
          // console.log("User Profile", userProfile);
          // 4. Return user object to NextAuth
          //    NextAuth will store this object in `user` and pass it to `jwt` and `session` callbacks.
          return {
            id: userProfile.user_id,
            username: userProfile.username,
            routes: userProfile.routes,
            access_token: access_token,
          };

          // maybe i need the access token here
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When user is returned (e.g., on login), attach data to the token
      if (user) {
        token.id = user.id;
        token.name = user.username;
        token.routes = user.routes;
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Make session data available in the client
      if (token) {
        session.sessionToken = token.accessToken;
        const { id, name, routes } = token;

        session.user = {
          id: id,
          name: name,
          routes: routes,
          email: "",
          image: "",
          token: token.accessToken,
          emailVerified: new Date(), // remove in the furtureq
        };
      }

      return session;
    },
  }, // Add callbacks as needed
  session: {
    strategy: "jwt", // use JWT-based sessions
    maxAge: 60 * 60 * 24, // Session expiration in seconds (e.g., 30 minutes)
  },
  secret: process.env.NEXTAUTH_SECRET,
});
