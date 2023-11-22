import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type DiscourseUser = {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
  trust_level: number;
};

type Props = {
  users: DiscourseUser[];
};

export function UserList({ users }: Props) {
  users = users.filter(
    (user) => user.trust_level === 2 || user.trust_level === 3
  );
  users.sort(() => Math.random() - 0.5);

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Link
          className="flex items-center justify-between gap-4 rounded-md p-2"
          key={user.id}
          target="_blank"
          href={`https://community.openstreetmap.org/u/${user.username}/summary`}
        >
          <div className="flex items-center h-9">
            <Avatar className="h-9 w-9">
              <Image
                src={`https://community.openstreetmap.org${user.avatar_template.replace(
                  "{size}",
                  "36"
                )}`}
                alt={user.username}
                width={36}
                height={36}
              ></Image>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.username}
              </p>
              <p className="text-sm text-muted-foreground">{user.name}</p>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground"></ExternalLink>
        </Link>
      ))}
    </div>
  );
}
