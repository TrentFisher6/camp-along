import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader, SidebarMenuButton, SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
// ... existing code ...
import {RouteInput} from "@/components/ui/route-input";
import { SearchDistanceSlider } from "@/components/ui/search-distance-slider";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import * as React from "react";
import { useState, useEffect } from "react";

export function AppSidebar() {
    const [showAbout, setShowAbout] = useState(true);
    
    useEffect(() => {
        const checkScreenHeight = () => {
            // Hide about section when screen height is less than 700px
            // This threshold can be adjusted based on your needs
            setShowAbout(window.innerHeight >= 800);
        };
        
        // Check on mount
        checkScreenHeight();
        
        // Check on resize
        window.addEventListener('resize', checkScreenHeight);
        
        // Cleanup
        return () => window.removeEventListener('resize', checkScreenHeight);
    }, []);
    
    return (
        <Sidebar>
            <SidebarHeader>
                        <div className='py-4' />
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <span className="text-2xl">🏕️</span>
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
            {showAbout ? (
                <SidebarFooter>
                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between pb-2">
                                <Label>About</Label>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => setShowAbout(false)}
                                    className="h-6 px-2 text-xs"
                                >
                                    Hide
                                </Button>
                            </div>
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
                                        GitHub
                                    </a>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </SidebarFooter>
            ) : (
                <SidebarFooter>
                    <Card>
                        <CardContent>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setShowAbout(true)}
                                className="w-full text-xs"
                            >
                                Show Credits
                            </Button>
                        </CardContent>
                    </Card>
                </SidebarFooter>
            )}
        </Sidebar>
    )
}