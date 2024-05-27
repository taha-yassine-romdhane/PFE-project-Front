import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import axiosClient from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../router";
import { Oval } from "react-loader-spinner";
import { useUserContext } from "../../context/ClientContext";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(30)
});

export default function ClientLogin() {
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "tahayassine@example.com",
      password: "12341234",
    }
  });
  const { handleSubmit, control, formState: { isSubmitting } } = formMethods;
  const navigate = useNavigate();
  const { setUser, setAuthenticated } = useUserContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosClient.get('/sanctum/csrf-cookie');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (values) => {
    try {
      const { data } = await axiosClient.post('/api/login', values);
      localStorage.setItem('token', data.token);
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      setAuthenticated(true);
      navigate(HOME_ROUTE);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Form {...formMethods}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Oval height={80} width={80} color="gray" ariaLabel="loading" />
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-md w-full">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <Oval height={20} width={20} color="white" ariaLabel="loading" />
              ) : 'Login'}
            </Button>
          </form>
        </div>
      )}
    </Form>
  );
}
