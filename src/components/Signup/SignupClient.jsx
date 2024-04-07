import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";

import axiosClient from "../../api/axios";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(30)
});

export default function SignupClient() {
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"adem",
      email: "adem@gmail.com",
      password: "00000000",
      confirmPassword :"00000000",
    }
  });

  const { handleSubmit, control } = formMethods;
  const form = useForm({
    resolver: zodResolver(formSchema),
  })
  const { formState: {isSubmitting}} = form
  const onSubmit = async (values) => {
    
    console.log("Form values:", values);
    console.log("Axios client:", axiosClient);
    try {
      const response = await axiosClient.post('/register', values); // Adjust the endpoint to /register
      console.log("Response:", response.data); // Assuming the response contains data
      // Handle success response (if needed)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (if needed)
    }
  }
  
  return (
<Form {...formMethods}>
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={control}
      name="name" 
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter your name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
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
    <FormField
      control={control}
      name="confirmPassword" 
      render={({ field }) => (
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Confirm your password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  <Button className={''} disabled={isSubmitting} type="submit">
          {isSubmitting && <Loader className={'mx-2 my-2 animate-spin'}/>} {' '} Login
        </Button>
  </form>
</Form>

  );
}
