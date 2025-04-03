import Image from "next/image";
import TemplateError from "/public/imageError.svg";
import User from "/public/user.png";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { getCookie } from "cookies-next";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { UserPlus, UserRoundSearch } from "lucide-react";
import { jwtDecode } from "jwt-decode";

interface UserData {
  user: string;
  id: string;
  name: string;
  email: string;
  descriptionProfile: string;
  blogProfile: string;
  linkedinProfile: string;
  profilePicture: string;
  createdAt: string;
  title: string;
  imageUrl: string;
  description: string;
  comments: string;
  content: string;
  likes: string;
  initialLiked: boolean;
  followers: string;
  following: string;
}

export const UserTemplate = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [posts, setPosts] = useState<UserData[]>([]);

  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [usersFollowed, setUsersFollowed] = useState([]);

  const [loading, setLoading] = useState(false);

  const userSelect = (userPostInfo: { userId: string }) => {
    const { userId } = userPostInfo;
    setSelectedUserId(userId);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getCookie("login");

        if (!token) {
          console.error("Error loading user data: Token not found");
          return;
        }

        const decoded = jwtDecode(token as string) as { sub: string };

        const currentUserId = decoded.sub;

        const response = await api.get(`/following`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
        setUsers((prev) =>
          prev!.filter((user) => user.id !== response.data.id)
        );
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    fetchUsers();
  }, []);

  const fetchPosts = async (userId: string) => {
    try {
      const token = getCookie("login");

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await api.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const post = response.data.posts?.map(
        (post: {
          id: string;
          imageUrl: string;
          title: string;
          description: string;
        }) => {
          return post;
        }
      );

      const follower = response.data.followers?.map(
        (follower: { id: string; followerId: string }) => {
          return follower;
        }
      );

      const following = response.data.following?.map(
        (following: { id: string; followedId: string }) => {
          return following;
        }
      );

      setFollowing(following?.length);
      setFollowers(follower?.length);
      setPosts(post || []);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleFollowButton = async (userId: string) => {
    try {
      const token = getCookie("login");
      if (!token) {
        console.error("Cookie not found");
        return;
      }
      const decoded = jwtDecode(token as string) as { sub: string };

      const currentUserId = decoded.sub;
      const formData = new FormData();
      formData.append("followedId", currentUserId);
      formData.append("followerId", userId);

      const response = await api.post("/follow", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`${currentUserId} following ${selectedUserId}`);

      console.log(response.data);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="md:max-h-[250px] xl:max-h-[250px] 2xl:max-h-[300px] overflow-y-auto mx-1 2xl:mx-0">
      {users.map((user, index) => (
        <div
          key={index}
          className="bg-zinc-900 flex items-center justify-between border border-zinc-700 rounded-lg py-1.5 px-1.5 mb-2 xl:mr-2 2xl:mr-1"
        >
          <Dialog>
            <DialogTrigger
              onClick={() => {
                fetchPosts(user.id);
              }}
            >
              <div className="flex items-center gap-1">
                <Image
                  src={user.profilePicture || User}
                  alt="profile"
                  width={100}
                  height={100}
                  priority
                  className="size-8 rounded-full border border-red-500"
                />
                <p className="text-xs truncate max-w-[100px]">{user.name}</p>
              </div>
            </DialogTrigger>

            <DialogContent className="md:max-w-[600px] lg:max-w-[800px] bg-zinc-200 dark:bg-zinc-900">
              <DialogHeader>
                <DialogTitle className="text-zinc-700 dark:text-zinc-200 flex gap-1 items-center">
                  Preview
                  <UserRoundSearch className="size-4" />
                </DialogTitle>
                <DialogDescription></DialogDescription>

                <div className="flex items-center gap-3">
                  <Image
                    src={user.profilePicture || User}
                    alt="profile"
                    width={100}
                    height={100}
                    priority
                    className="2xl:w-24 2xl:h-24 xl:w-20 xl:h-20 md:w-16 md:h-16 rounded-full border border-red-700 flex-shrink-0"
                  />
                  <div>
                    <div className="font-bold text-zinc-700 dark:text-zinc-200 flex gap-2 items-baseline">
                      {user.name} -
                      <button
                        onClick={() => {
                          handleFollowButton(user.id);
                        }}
                        className="flex rounded-md px-2 py-1 bg-red-600 hover:bg-red-900 duration-300"
                      >
                        <div className="text-xs flex gap-1">
                          <UserPlus className="size-5" />
                        </div>
                      </button>
                    </div>
                    <div className="text-sm text-zinc-700 dark:text-zinc-200">
                      {user.descriptionProfile
                        ?.split("\n")
                        .map((item, index) => (
                          <div
                            key={index}
                            className="mb-5 text-xs lg:text-sm text-zinc-700 dark:text-zinc-200"
                          >
                            {item}
                          </div>
                        )) || "Sem descrição"}
                    </div>
                  </div>
                </div>
                <div
                  key={user.id}
                  className="flex gap-5 font-semibold items-center justify-center"
                >
                  <p className="text-zinc-700 dark:text-zinc-200 leading-[10px]">
                    {posts?.length || 0} publicações
                  </p>
                  <p className="text-zinc-700 dark:text-zinc-200 leading-[10px]">
                    {followers} seguidores
                  </p>
                  <p className="text-zinc-700 dark:text-zinc-200 leading-[10px]">
                    {following} seguindo
                  </p>
                </div>
              </DialogHeader>

              <div className="flex justify-center items-center">
                <DropdownMenuSeparator className="w-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className="rounded-lg p-1 border bg-zinc-950/50 border-zinc-600"
                  >
                    <Image
                      src={post.imageUrl || TemplateError}
                      alt="Post"
                      width={500}
                      height={500}
                      style={{ objectFit: "contain" }}
                      className="w-full h-full"
                      priority
                    />
                  </div>
                ))}
              </div>
            </DialogContent>

            <button
              onClick={() => {
                handleFollowButton(user.id);
              }}
              className={`flex rounded-md px-2 py-1 ${
                loading ? "bg-gray-500" : "bg-red-600"
              } hover:${loading ? "" : "bg-red-900"} duration-300`}
              disabled={loading}
            >
              <p className="text-xs">{loading ? "Carregando..." : "Seguir"}</p>
            </button>
          </Dialog>
        </div>
      ))}
    </div>
  );
};
