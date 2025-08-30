import * as React from "react"
import { useStore } from "@/store/useStore"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RouteInput() {
    const { sourceAddress, targetAddress, setSourceAddress, setTargetAddress, geocodeAddress, isCampsitesLoading } = useStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        geocodeAddress(sourceAddress, "source");
        geocodeAddress(targetAddress, "target");
    };

    return (
        <Card className="mx-2">
            {/*<CardHeader>*/}
            {/*    <CardTitle>Create project</CardTitle>*/}
            {/*    <CardDescription>Deploy your new project in one-click.</CardDescription>*/}
            {/*</CardHeader>*/}
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="source">Source</Label>
                            <Input 
                                id="source" 
                                placeholder="Source Address"
                                value={sourceAddress}
                                onChange={(e) => setSourceAddress(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="destination">Destination</Label>
                            <Input 
                                id="destination" 
                                placeholder="Destination Address"
                                value={targetAddress}
                                onChange={(e) => setTargetAddress(e.target.value)}
                            />
                        </div>
                        <CardFooter className="flex justify-between px-0">
                            <Button type="submit" disabled={isCampsitesLoading}>
                                {isCampsitesLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Finding Campsites...</span>
                                    </div>
                                ) : (
                                    "Find Campsites"
                                )}
                            </Button>
                        </CardFooter>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
