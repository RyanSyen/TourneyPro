import { NextRequest, NextResponse } from "next/server";

// export { default, withAuth } from "next-auth/middleware";

// export const config = { matcher: ["/protected"] };

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //   console.log("middleware req header url: ", request.url);

  // request.headers.forEach((req) => {
  //   console.log(req.toString());
  // });

  // store current req url in custom header to be read later
  //! currently not using - previously wanted to be used to render based on url but this is only applicable for server side, if a page redirects then middleware wont be able to detect
  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("x-url", request.url);

  return NextResponse.next({
    headers: reqHeaders,
  });
}

// export withAuth(
//     function middleware(req: NextRequest){
//         console.log(req.nextauth.token)
//     }
// )
