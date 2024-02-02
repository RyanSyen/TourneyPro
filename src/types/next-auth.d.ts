import NextAuth, { DefaultSession } from "next-auth/next";
import type {
  OAuth2TokenEndpointResponse,
  OpenIDTokenEndpointResponse,
} from "oauth4webapi";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  //   interface Account extends Partial<OpenIDTokenEndpointResponse> {
  //     /** Provider's id for this account. Eg.: "google" */
  //     provider: string;
  //     /**
  //      * This value depends on the type of the provider being used to create the account.
  //      * - oauth/oidc: The OAuth account's id, returned from the `profile()` callback.
  //      * - email: The user's email address.
  //      * - credentials: `id` returned from the `authorize()` callback
  //      */
  //     providerAccountId: string;
  //     /** Provider's type for this account */
  //     type: ProviderType;
  //     /**
  //      * id of the user this account belongs to
  //      *
  //      * @see https://authjs.dev/reference/core/adapters#user
  //      */
  //     userId?: string;
  //     /**
  //      * Calculated value based on {@link OAuth2TokenEndpointResponse.expires_in}.
  //      *
  //      * It is the absolute timestamp (in seconds) when the {@link OAuth2TokenEndpointResponse.access_token} expires.
  //      *
  //      * This value can be used for implementing token rotation together with {@link OAuth2TokenEndpointResponse.refresh_token}.
  //      *
  //      * @see https://authjs.dev/guides/basics/refresh-token-rotation#database-strategy
  //      * @see https://www.rfc-editor.org/rfc/rfc6749#section-5.1
  //      */
  //     expires_at?: number;
  //   }

  //   interface Profile {
  //     sub?: string | null;
  //     name?: string | null;
  //     given_name?: string | null;
  //     family_name?: string | null;
  //     middle_name?: string | null;
  //     nickname?: string | null;
  //     preferred_username?: string | null;
  //     profile?: string | null;
  //     picture?: string | null | any;
  //     website?: string | null;
  //     email?: string | null;
  //     email_verified?: boolean | null;
  //     gender?: string | null;
  //     birthdate?: string | null;
  //     zoneinfo?: string | null;
  //     locale?: string | null;
  //     phone_number?: string | null;
  //     updated_at?: Date | string | number | null;
  //     address?: {
  //       formatted?: string | null;
  //       street_address?: string | null;
  //       locality?: string | null;
  //       region?: string | null;
  //       postal_code?: string | null;
  //       country?: string | null;
  //     } | null;
  //     [claim: string]: unknown;
  //   }

  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      address?: string;
    };
  }

  //   interface DefaultUser {
  //     name?: string | null;
  //     email?: string | null;
  //     image?: string | null;
  //   }

  //   interface User extends Record<string, unknown>, DefaultUser {}
}
