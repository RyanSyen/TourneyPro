"use client";

import { usePostById } from "@/hooks/example";

const Get = () => {
  const { data: postData } = usePostById();

  return (
    <div>
      <h1>Get the Record for Particular Id</h1>
      <h6>
        Note* : For Example , here we hardcore the Id as 1 . We can also pass Id
        as dynamically
      </h6>
      <h4>
        Title :<ul>{postData?.data.title}</ul>
      </h4>
      <h4>
        Body :<ul>{postData?.data.body}</ul>
      </h4>
      <h4>
        Id :<ul>{postData?.data.id}</ul>
      </h4>
      <h4>
        UserId :<ul>{postData?.data.userId}</ul>
      </h4>
    </div>
  );
};

export default Get;
