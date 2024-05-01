import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import axiosClient from "axios"; // Import axios for making HTTP requests
import React, { useState, useEffect } from "react";

export default function AdminProfilePage() {
  const [name, setName] = useState("Adem2");
  const [email, setEmail] = useState("adem2@admin.com");
  const [telephone, setNumber] = useState("95000001");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);



  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      
        await axiosClient.put(`/api/usersupdate/`, { name, email, telephone });
        setIsLoading(false);
        alert("Changes saved successfully!");
     
        console.error("User ID is not set.");
      
    } catch (error) {
      setIsLoading(false);
      console.error("Error saving changes:", error);
      alert("Error saving changes. Please try again.");
    }
  };

  const handleSavePassword = async () => {
    setIsLoading(true);
    try {
      // Send request to update password
      setIsLoading(false);
      alert("Password changed successfully! You'll be logged out.");
      history.push("/logout");
    } catch (error) {
      setIsLoading(false);
      console.error("Error saving password:", error);
      alert("Error saving password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="Email">Email</Label>
                <Input
                  id="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  textColor="gray"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="telephone">telephone</Label>
                <Input
                  id="username"
                  value={telephone}
                  onChange={(e) => setNumber(e.target.value)}
                  textColor="gray"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveChanges} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input
                  id="current"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input
                  id="new"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePassword} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save password"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
