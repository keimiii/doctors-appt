'use client';

import React, {FormEvent, useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

type ScheduleProps = {
    date: Date;
}

type Event = {
    date: string;
    time: string;
    email: string;
    name: string;
    description: string;
};

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    height: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const hours = Array.from({length: 9}, (_, i) => 9 + i); // 9 AM to 5 PM

export default function DaySchedule(props: ScheduleProps) {
    const date = props.date;
    const [appointments, setAppointments] = useState<Event[]>([]); // Set list of appointments
    const [loading, setLoading] = useState(true); // Set loading page
    const [open, setOpen] = useState(false); // Open modal for booking
    const [time, setTime] = useState(''); // Set time for booking
    const [refreshIndex, setRefreshIndex] = useState(0); // Used to trigger rerender

    // Get list of existing appointments for current date
    useEffect(() => {
        fetch('/api/get_appointments?date=' + date.toDateString())
            .then((res) => res.json())
            .then((data) => {
                setAppointments(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error loading appointments:', err);
                setLoading(false);
            });
    }, [date, refreshIndex]);

    // Rerender day schedule component on booking
    const refreshEvent = () => setRefreshIndex((prev) => prev + 1);

    // Close modal
    const handleClose = () => setOpen(false);

    // Open booking modal with timeslot
    const handleBooking = (time: string | undefined) => {
        setOpen(true);
        setTime(time ? time : '');
    };

    // Submit booking via modal
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        formData.set("date", props.date.toDateString())
        formData.set("time", time)
        const response = await fetch('/api/book_appointment', {
            method: 'POST',
            body: formData,
        })

        if (response.status !== 200) {
            console.error('Error booking appointment');
        }

        refreshEvent(); // trigger rerender
        handleClose(); // close modal
    }

    if (loading) return <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Day Schedule: {props.date ? props.date.toDateString() : ""}</h2>
        <div className="space-y-2">Loading...</div>
    </div>;

    return (
        <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Day Schedule: {props.date ? props.date.toDateString() : ""}</h2>
            <div className="space-y-2">
                {hours.map((hour) => {
                    const timeLabel = `${hour}:00`;
                    const event = appointments.find((e) => e.time === timeLabel);
                    return (
                        <div
                            key={timeLabel}
                            className="flex items-center justify-between p-2 border rounded hover:bg-gray-50 cursor-pointer text-sm"
                            onClick={() => event?.name ? undefined : handleBooking(timeLabel)}
                        >
                            <span className="text-gray-600">{timeLabel}</span>
                            <span className={event?.name ? "text-red-600" : "text-blue-600"}>
                                {event?.name ? 'Unavailable' : 'Book'}
                            </span>
                        </div>
                    );
                })}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={modalStyle} className={"rounded-lg"}>
                    <form onSubmit={onSubmit} className={"flex flex-col"}>
                        <input type="text" name="name" placeholder={"Name"} required className={"p-2 mb-2"} />
                        <input type="text" name="email" placeholder={"Email"} required className={"p-2 mb-2"} />
                        <input type="text" name="description" placeholder={"Description of your symptoms"} required autoComplete={"off"} className={"p-2 mb-6 h-10 "} />
                        <button type="submit" className={"p-2 bg-gray-200"}>Submit</button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
