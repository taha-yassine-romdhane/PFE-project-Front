import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import axiosClient from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { HOME_ADMIN_ROUTE,LOGIN_ROUTE } from "../../router";
import {Loader} from "lucide-react";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(30)
});

export default function AdminLogin() {
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "adem@example.com",
      password: "00000000",
    }
  });
  const { handleSubmit, control } = formMethods;
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
  })
  const {setError, formState: {isSubmitting}} = form
 
  const onSubmit = async (values) => {
    // Fetch CSRF token
    await axiosClient.get('/sanctum/csrf-cookie');
    try {
      const { data } = await axiosClient.post('/api/login', values);
      // Save credentials securely
      localStorage.setItem('token', data.token);
      // Set the Authorization header for Axios
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      // Navigate to the desired page
      navigate(HOME_ADMIN_ROUTE); // Make sure /dashboard route is correct
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <Form {...formMethods}>
      <div  className="flex justify-center mt-10 text-4xl  " > Admin Login Page </div>
       <div className="flex justify-center mt-10  " >
        
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
          {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'}/>} {' '} Login
        </Button>
      </form>
      </div>
    </Form>
  );
}
