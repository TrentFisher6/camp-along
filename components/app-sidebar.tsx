import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader, SidebarMenuButton, SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {Command} from "lucide-react";
import {RouteInput} from "@/components/ui/route-input";
import { SearchDistanceSlider } from "@/components/ui/search-distance-slider";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import * as React from "react";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                        <div className='py-4' />
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
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                    <RouteInput />
                <SidebarGroup />
                <SidebarGroup>
                    <SearchDistanceSlider />
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Card>
                    <CardContent>
                        <Label className='pb-2'>About</Label>
                        <div className="text-sm text-muted-foreground space-y-2">
                            <p>
                                Campsite data and icons provided by{' '}
                                <a href="https://opencampingmap.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    opencampingmap.org
                                </a>
                            </p>
                            <p>
                                Mapping data provided by{' '}
                                <a href="https://openstreetmap.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    openstreetmap.org
                                </a>
                            </p>
                            <p>
                                Routing data provided by{' '}
                                <a href="https://openrouteservice.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    openrouteservice.org
                                </a>
                            </p>
                            <br />
                            <p>
                                Source code available on{' '}
                                <a href="https://github.com/TrentFisher6/camp-along" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    Github
                                </a>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </SidebarFooter>
        </Sidebar>
    )
}