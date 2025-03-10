import * as React from "react"
import { useStore } from "@/store/useStore"
import {Slider} from "@/components/ui/slider";
import {Card, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";

export function SearchDistanceSlider    () {
    const { searchDistance, setSearchDistance } = useStore();

    return(
        <Card>
            <CardContent>
                <Label className='pb-4'>{`Search Distance:   ${searchDistance} miles`}</Label>
                <Slider value={[searchDistance]} onValueChange={(newVal) => setSearchDistance(newVal[0])} max={100} step={1} />
            </CardContent>
        </Card>
    )
}