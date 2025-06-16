'use client';

import {useState} from "react";
import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css";
import DaySchedule from "@/app/components/daySchedule";

export function DatePicker() {
    let today = new Date()
    const [selected, setSelected] = useState<Date>(today);

    return <>
        <div className="flex flex-col md:w-screen md:flex-row justify-evenly">
            <DayPicker
                className="pb-2"
                animate
                mode="single"
                selected={selected}
                onSelect={setSelected}
                required={true}
                disabled={{ before: today }}
                captionLayout={"dropdown-months"}
            />
            <DaySchedule date={selected}/>
        </div>
    </>;
}