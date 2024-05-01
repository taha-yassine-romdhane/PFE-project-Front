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

import { FadeLoader  } from "react-spinners";

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
  const { handleSubmit, control } = formMethods;
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
  })
  const {setError, formState: {isSubmitting}} = form
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch CSRF token
        await axiosClient.get('/sanctum/csrf-cookie');
        // Set loading to false once token is fetched
        setLoading(false);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        // Set loading to false in case of error too
        setLoading(false);
      }
    };
    // Call fetchData when component mounts
    fetchData();
  }, []);

  const onSubmit = async (values) => {
    try {
      const { data } = await axiosClient.post('/api/login', values);
      // Save credentials securely
      localStorage.setItem('token', data.token);
      // Set the Authorization header for Axios
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      // Navigate to the desired page
      navigate(HOME_ROUTE); // Make sure /dashboard route is correct
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Form {...formMethods}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <FadeLoader  color="gray"  size={150} />
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
            <Button className={''} disabled={isSubmitting} type="submit">
              {isSubmitting ? <FadeLoader  color="white"  size={10} /> : 'Login'} 
            </Button>
          </form>
        </div>
      )}
    </Form>
  );
}
