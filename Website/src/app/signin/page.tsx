import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/server/auth";

function Page() {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center">
      <Card className="flex w-96 flex-col items-center pt-6">
        <CardHeader>
          <CardDescription>
            Sign in using your Google Workspace account to access your
            attendance dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server";
              await signIn("google", { callbackUrl: "/dashboard" });
            }}
          >
            <Button variant="outline" className="w-full" type="submit">
              <IconBrandGoogleFilled />
              Sign In with Google Workspace
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
