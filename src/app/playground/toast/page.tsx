"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const ToastPlayground = () => {
  const { toast } = useToast();

  return (
    <div>
      <h3>Toast Config</h3>
      <section>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "this title is optional",
              description: "Your message has been sent.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }}
        >
          Show Toast
        </Button>
      </section>
    </div>
  );
};

export default ToastPlayground;
