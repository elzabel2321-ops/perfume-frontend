import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    // ==========================================
    // GOOGLE
    // ==========================================

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ==========================================
    // EMAIL + PASSWORD
    // ==========================================

    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        try {
          const backendUrl =
            process.env.BACKEND_URL ||
            "http://localhost:4000";

          const response = await fetch(
            `${backendUrl}/api/auth/login`,
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                email: String(
                  credentials.email
                )
                  .trim()
                  .toLowerCase(),

                password: String(
                  credentials.password
                ),
              }),

              cache: "no-store",
            }
          );

          const data = await response.json();

          console.log(
            "Backend login:",
            data
          );

          if (!response.ok) {
            return null;
          }

          if (
            !data?.user ||
            !data?.token
          ) {
            return null;
          }

          // ========================================
          // RETURN USER TO NEXTAUTH
          // ========================================

          return {
            id: String(
              data.user.id ||
              data.user._id
            ),

            name:
              data.user.name || "",

            email:
              data.user.email || "",

            role:
              data.user.role ||
              "customer",

            token:
              data.token,
          };

        } catch (error) {
          console.error(
            "NextAuth login error:",
            error
          );

          return null;
        }
      },
    }),
  ],

  // ==========================================
  // SESSION
  // ==========================================

  session: {
    strategy: "jwt",
  },

  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET,

  // ==========================================
  // CALLBACKS
  // ==========================================

  callbacks: {
    // ------------------------------------------
    // JWT
    // ------------------------------------------

    async jwt({
      token,
      user,
      account,
    }) {
      if (account?.provider === "google" && user?.email) {
        try {
          const backendUrl =
            process.env.BACKEND_URL ||
            process.env.NEXT_PUBLIC_API_BASE ||
            "http://localhost:4000";

          const response = await fetch(
            `${backendUrl}/api/auth/oauth-upsert`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Internal-Secret":
                  process.env.INTERNAL_API_SECRET ||
                  "aromanova-dev-internal",
              },
              body: JSON.stringify({
                name: user.name || "Customer",
                email: user.email,
              }),
              cache: "no-store",
            }
          );

          const data = await response.json();

          if (data?.user) {
            token.id = String(data.user.id);
            token.role = data.user.role || "customer";
            token.accessToken = data.token;
            return token;
          }
        } catch (error) {
          console.error("Google account sync failed.");
        }
      }

      if (user) {
        token.id = user.id;
        token.role = user.role || "customer";
        token.accessToken =
          user.token ||
          token.accessToken;
      }

      return token;
    },

    // ------------------------------------------
    // SESSION
    // ------------------------------------------

    async session({
      session,
      token,
    }) {
      if (session.user) {
        session.user.id =
          String(
            token.id || ""
          );

        session.user.role =
          String(
            token.role ||
            "customer"
          );
      }

      // IMPORTANT
      // Backend JWT token
      // becomes available to frontend

      session.accessToken =
        String(
          token.accessToken ||
          ""
        );

      return session;
    },
  },

  // ==========================================
  // LOGIN PAGE
  // ==========================================

  pages: {
    signIn: "/login",
  },
});