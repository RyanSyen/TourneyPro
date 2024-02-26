// const ReactQueryExample = () => {
//   return (
//     <div>
//       <p>React Query Example</p>
//     </div>
//   );
// };

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Delete from "./delete";
import Get from "./get";
import GetAll from "./getAll";
import Post from "./post";
import Put from "./put";

const TabsDemo = () => {
  return (
    <Tabs defaultValue="account">
      <TabsList className="flex">
        <TabsTrigger value="getall">GET ALL</TabsTrigger>
        <TabsTrigger value="getbyid">GET BY ID</TabsTrigger>
        <TabsTrigger value="post">POST</TabsTrigger>
        <TabsTrigger value="put">PUT</TabsTrigger>
        <TabsTrigger value="delete">DELETE</TabsTrigger>
      </TabsList>
      <TabsContent value="getall">
        <Card>
          <CardHeader>
            <CardTitle>GET ALL</CardTitle>
            <CardDescription>This Component has GetAll Details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <GetAll />
          </CardContent>
          <CardFooter>{/* <Button>Save changes</Button> */}</CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="getbyid">
        <Card>
          <CardHeader>
            <CardTitle>GET BY ID</CardTitle>
            <CardDescription>This Component has GetAll Details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Get />
          </CardContent>
          <CardFooter>{/* <Button>Save password</Button> */}</CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="post">
        <Card>
          <CardHeader>
            <CardTitle>POST</CardTitle>
            <CardDescription>This Component has POST Details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Post />
          </CardContent>
          <CardFooter>{/* <Button>Save password</Button> */}</CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="put">
        <Card>
          <CardHeader>
            <CardTitle>PUT</CardTitle>
            <CardDescription>This Component has PUT Details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Put />
          </CardContent>
          <CardFooter>{/* <Button>Save password</Button> */}</CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="delete">
        <Card>
          <CardHeader>
            <CardTitle>DELETE</CardTitle>
            <CardDescription>This Component has POST Details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Delete />
          </CardContent>
          <CardFooter>{/* <Button>Save password</Button> */}</CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabsDemo;
