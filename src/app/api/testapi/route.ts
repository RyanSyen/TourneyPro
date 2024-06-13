import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  console.log(searchParams.keys().next().value);
  //   console.log(searchParams.keys().return());
  //   console.log(searchParams.keys().throw);
  console.log(searchParams.values());
  // query is "hello" for /api/search?query=hello
  // http://localhost:3000/api/testapi?query=test&query1=test1
  /*
    URLSearchParams Iterator { 'query', 'query1' }
    URLSearchParams Iterator { 'test', 'test1' }
  */

  // if(searchParams.keys())
  const queryKey = searchParams.keys().next().value;
  const queryValue = searchParams.values().next().value;

  console.log("is query key empty: ", queryKey == null);
  console.log("queryValue: ", queryValue);

  switch (queryKey) {
    case "id":
      return new Response(`query key: ${queryKey}`);
    case "orgId":
      return new Response(`query key: ${queryKey}`);
    default:
      return new Response(`query key: invalid`);
  }
}
