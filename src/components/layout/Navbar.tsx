import { useTranslation } from "react-i18next"
import { User, Settings, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface NavbarProps {
  setIsMobileMenuOpen: (open: boolean) => void
}

export function Navbar({ setIsMobileMenuOpen }: NavbarProps) {
  const { t, i18n } = useTranslation()

  const toggleLanguage = (checked: boolean) => {
    const newLang = checked ? "en" : "fr"
    i18n.changeLanguage(newLang)
  }

  // Mock user data - replace with actual user data from context/store
  const user = {
    name: "Admin User",
    email: "admin@example.com"
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b bg-white px-4 md:px-6 shadow-sm dark:bg-gray-900">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden text-gray-700 hover:text-gray-900"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Search - hidden on mobile */}
      {/* Search - hidden on mobile */}
      {/* <div className="hidden md:flex w-1/3 items-center">
        ...
      </div> */}

      <div className="flex-1" />

      <div className="flex items-center gap-2 md:gap-4">
        {/* Language toggle - smaller on mobile */}
        <div className="flex items-center space-x-1 md:space-x-2">
          <Label htmlFor="language-mode" className="text-xs md:text-sm font-medium">
            FR
          </Label>
          <Switch
            id="language-mode"
            checked={i18n.language === "en"}
            onCheckedChange={toggleLanguage}
          />
          <Label htmlFor="language-mode" className="text-xs md:text-sm font-medium">
            EN
          </Label>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/images/avatar-placeholder.png" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/images/avatar-placeholder.png" alt="User" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              {t("navbar.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              {t("navbar.settings")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
