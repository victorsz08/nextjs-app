"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import api from "@/lib/axios";
import { login } from "@/services/login/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Lock, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "username ou senha incorretos"),
  password: z.string().min(1, "username ou senha incorretos"),
});

type LoginDataType = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginDataType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginDataType) {
    const { username, password } = data;

    const response = await api.post("/auth/login", {
            username,
            password,
        });

    console.log(response);

    if(response.status === 400) {
      form.setError("username", {
        type: "min",
        message: "username ou senha incorretos",
      });

      form.setError("password", {
        type: "min",
        message: "username ou senha incorretos",
      });

      return
    };

    if(response.status === 204) {
      return redirect("/");
    };
  };

  return (
    <main className="flex h-screen w-screen">
      <section className="w-full h-screen grid justify-center items-center">
        <Image
          src="/login_photo.svg"
          width={350}
          height={92}
          alt="login-picture"
        />
      </section>
      <section className="w-full h-screen grid justify-center items-center">
        <Card className="shadow-none px-[32px] py-[36px]">
          <CardHeader className="flex flex-col justify-center items-center">
            <CardTitle className="font-bold text-[20px]">Entrar</CardTitle>
            <CardDescription className="text-[12px] text-primary font-light">
              Faça login para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <section className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <Label>
                          <UserRound
                            className="w-[18px] h-[18px] text-primary absolute 
                                         translate-x-[8px] transform translate-y-[28px]"
                          />
                        </Label>
                        <Input
                          {...field}
                          type="text"
                          placeholder="username"
                          className="pl-8 w-[300px] py-5"
                        />
                        <FormMessage className="text-[11px]"/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <Label>
                          <Lock
                            className="w-[18px] h-[18px] text-primary absolute 
                                         translate-x-[8px] transform translate-y-[28px]"
                          />
                        </Label>
                        <Input
                          {...field}
                          type="password"
                          placeholder="**********"
                          className="pl-8 py-5"
                        />
                        <FormMessage className="text-[11px]"/>
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col justify-end items-end gap-1">
                    <Link href="/forgot-password">
                      <span className="text-[12px] font-light text-accent-foreground mr-1">
                        Esqueceu a senha?
                      </span>
                      <span className="text-[12px] font-medium text-primary underline">
                        Recupere o acesso
                      </span>
                    </Link>
                    <Button type="submit" className="w-full cursor-pointer" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? <Loader className="w-[12px] h-[12px] animate-spin repeat-infinite"/> : "Entrar"}
                    </Button>
                  </div>
                  <Separator />
                </section>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <section className="flex flex-col items-center justify-center gap-3">
              <Image
                src="/window.svg"
                width={26}
                height={26}
                alt="notetools logo"
              />
              <div className="flex flex-col items-center gap-2">
                <p className="text-[14px] font-semibold text-accent-foreground">
                  Notetools Inc
                </p>
                <span className="text-[10px] text-slate-500">
                  Copyright 2024 - 2025 - Todos os direitos reservados
                </span>
              </div>
            </section>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
