import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader, SidebarMenuButton, SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {Command} from "lucide-react";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarTrigger />
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-3xl leading-tight">
                                    <span className="truncate font-semibold font-pine-forest">Camp Along</span>
                                    <span className="truncate text-xs italic">Find campsites along your route!</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}