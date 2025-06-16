import {DatePicker} from "@/app/components/schedule";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-evenly md:p-24">
            <div className="w-full md:max-w-5xl items-center text-2xl md:flex md:p-0 pt-5 pl-5">
                Book your next Doctor's Appointment here!
            </div>
            <div className="w-full md:max-w-5xl items-center md:flex md:p-0 p-5">
                <DatePicker/>
            </div>
        </main>
    )
}
