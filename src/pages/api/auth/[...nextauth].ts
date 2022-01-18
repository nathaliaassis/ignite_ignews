import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { query as q } from 'faunadb';
import { serverClient } from '../../../services/fauna';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: 'https://github.com/login/oauth/authorize?scope=read:user+user:email'
    }),
  ],
  jwt: {
    secret: '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',
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async signIn({ user }) {
      const { email } = user;

      if (email) {

        try {
          await serverClient.query(
            q.If(
              q.Not(
                q.Exists(
                  q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(user.email)
                  )
                )
              ),
              q.Create(
                q.Collection('users'),
                { data: { email } },
              ),
              q.Get(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            )
          );
          return true;
        } catch (err) {
          console.log('Error: \s', err);
          return false;
        }
      }
    },
  },
})