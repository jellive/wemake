import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuLink, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BarChart3Icon, BellIcon, LogOutIcon, MessageCircleIcon, SettingsIcon, UserIcon } from "lucide-react";

const menus = [
	{
		name: "Products",
		to: "/products",
		items: [
			{
				name: "Leaderboards",
				description: "See the top performers in your community",
				to: "/products/leaderboards"
			},
			{
				name: "Categories",
				description: "Create and manage categories",
				to: "/products/categories"
			},
			{
				name: "Search",
				description: "Search for a specific product",
				to: "/products/search"
			},
			{
				name: "Submit a Product",
				description: "Submit a new product to our community",
				to: "/products/submit"
			},
			{
				name: "Promote",
				description: "Promote your product to our community",
				to: "/products/promote"
			}
		]
	},
	{
		name: "Jobs",
		to: "/jobs",
		items: [
			{
				name: "Remote Jobs",
				description: "Find remote jobs",
				to: "/jobs?type=remote"
			},
			{
				name: "Full-Time Jobs",
				description: "Find full-time jobs",
				to: "/jobs?type=full-time"
			},
			{
				name: "Freelance Jobs",
				description: "Find freelance jobs",
				to: "/jobs?type=freelance"
			},
			{
				name: "Internships",
				description: "Find internships",
				to: "/jobs?type=internship"
			},
			{
				name: "Submit a Job",
				description: "Submit a new job to our community",
				to: "/jobs/submit"
			}
		]
	}, {
		name: "Community",
		to: "/community",
		items: [
			{
				name: "All Posts",
				description: "See all posts in our community",
				to: "/community/posts"
			},
			{
				name: "Top Posts",
				description: "See the top posts in our community",
				to: "/community?sort=top"
			},
			{
				name: "New Posts",
				description: "See the latest posts in our community",
				to: "/community?sort=new"
			},
			{
				name: "Create a Post",
				description: "Create a new post to our community",
				to: "/community/create"
			}
		]
	},
	{
		name: "IdeasGPT",
		to: "/ideas"
	},
	{
		name: "Teams",
		to: "/teams",
		items: [
			{
				name: "All Teams",
				description: "See all teams in our community",
				to: "/teams"
			},
			{
				name: "Create a Team",
				description: "Create a new team to our community",
				to: "/teams/create"
			}
		]
	}
]

interface NavigationProps {
	isLoggedIn: boolean;
	hasNotifications: boolean;
	hasMessages: boolean;
}

export default function Navigation({ isLoggedIn, hasNotifications, hasMessages }: NavigationProps) {
	return <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
		<div className="flex items-center">
			<Link to="/" className="font-bold tracking-tighter text-lg">Wemake</Link>
			<Separator orientation="vertical" className="h-6 mx-4" />
			<NavigationMenu>
				<NavigationMenuList>{
					menus.map(menu => (
						<NavigationMenuItem key={menu.name}>
							{menu.items ? <>
								<Link to={menu.to}>
									<NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
								</Link>
								<NavigationMenuContent>
									<ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2 ">
										{menu.items?.map(item => (
											<NavigationMenuItem key={item.name}
												className={cn([
													"select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
													menu.to === item.to && "bg-accent",
													item.to === '/products/promote' && "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
													item.to === '/jobs/submit' && "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20"
												])}>
												<NavigationMenuLink asChild>
													<Link to={item.to} className="p-3 space-y-1 block leading-none no-underline outline-none">
														<span className="text-sm font-medium leading-none">{item.name}</span>
														<p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
													</Link>
												</NavigationMenuLink>
											</NavigationMenuItem>
										))}
									</ul>
								</NavigationMenuContent>
							</> :
								<Link to={menu.to} className={navigationMenuTriggerStyle()}>
									<span className="text-sm font-medium leading-none">{menu.name}</span>
								</Link>
							}
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
		{isLoggedIn ?
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="icon" asChild className="relative">
					<Link to="/my/notifications">
						<BellIcon className="size-4" />
						{hasNotifications && <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full">
							{hasNotifications}
						</span>}
					</Link>
				</Button>
				<Button variant="ghost" size="icon" asChild className="relative">
					<Link to="/my/messages">
						<MessageCircleIcon className="size-4" />
						{hasMessages && <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full">
							{hasMessages}
						</span>}
					</Link>
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>N</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuLabel className="flex flex-col">
							<span className="font-medium">John Doe</span>
							<span className="text-xs text-muted-foreground">@username</span>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild className="cursor-pointer">
								<Link to="/my/dashboard"><BarChart3Icon className="size-4 mr-2" />Dashboard</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild className="cursor-pointer">
								<Link to="/my/profile"><UserIcon className="size-4 mr-2" />Profile</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild className="cursor-pointer">
								<Link to="/my/settings"><SettingsIcon className="size-4 mr-2" />Settings</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild className="cursor-pointer">
							<Link to="/auth/logout"><LogOutIcon className="size-4 mr-2" />Logout</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			:
			<div className="flex items-center gap-4">
				<Button asChild variant="outline">
					<Link to="/auth/login">Login</Link>
				</Button>
				<Button asChild>
					<Link to="/auth/join">Join</Link>
				</Button>
			</div>
		}
	</nav>
}