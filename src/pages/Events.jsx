import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import EventCards from "@/components/EventsCard";
import config from "@/config/config";
import { useState } from "react";

// Custom Calendar Component
const CustomCalendar = ({ markedDate = 3 }) => {
  const year = 2025;
  const month = "тамыз";
  const daysOfWeek = ["жс", "дс", "сс", "ср", "бс", "жм", "сн"];
  const daysInMonth = 31;
  const firstDayOfWeek = 5; // August 1st, 2025 is a Friday

  const renderCalendarDays = () => {
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isMarked = day === markedDate;
      days.push(
        <div key={day} className={`calendar-day ${isMarked ? "marked" : ""}`}>
          {isMarked ? (
            <div className="flex flex-col items-center">
              <Heart
                className="w-4 h-4 text-rose-500 mb-1"
                fill="currentColor"
              />
              <span className="text-xs">{day}</span>
            </div>
          ) : (
            day
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2 className="font-cormorant text-xl text-rose-700 mb-4">
          {month} {year} жыл
        </h2>
      </div>

      <div className="calendar-grid">
        {/* Days of week header */}
        {daysOfWeek.map((day, index) => (
          <div key={index} className="calendar-day-header">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default function Events() {
  const [date] = useState(new Date(2025, 6, 2)); // 2 шілде 2025 (month is 0-indexed)

  return (
    <>
      <section
        id="event"
        className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 py-20"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block text-rose-500 font-cormorant text-lg tracking-wide mb-2"
            >
              Маңызды күнді белгілеңіз
            </motion.span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl font-monserrat text-rose-600 mb-4"
            >
              <h1 className="font-Toy text-4xl">Той иелері:</h1>
              <br /> Әкесі: Өмірбек
              <br />
              Анасы: Алтынгүл
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-cormorant font-semibold text-gray-800 leading-tight tracking-wide"
            >
              Той салтанатының бағдарламасы
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 max-w-md mx-auto font-montserrat text-base leading-relaxed"
            >
              Біз сіздерді махаббат жолымыздың басталуының куәгері болуға
              шақырамыз
            </motion.p>

            {/* Custom Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex justify-center my-8"
            >
              <div className="rounded-3xl shadow-xl bg-white/80 p-6 border border-rose-100 backdrop-blur-md">
                <CustomCalendar markedDate={3} />
              </div>
            </motion.div>

            {/* Decorative line with heart */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4 mt-6"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <div className="text-rose-400">
                <Heart className="w-4 h-4" fill="currentColor" />
              </div>
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>
          </motion.div>

          {/* Event Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <EventCards events={config.data.agenda} />
          </motion.div>
        </motion.div>
      </section>

      {/* Custom Calendar Styles */}
      <style jsx>{`
        .calendar-container {
          max-width: 350px;
          margin: 0 auto;
          font-family: inherit;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
        }

        .calendar-day-header {
          background-color: rgb(244 63 94 / 0.1);
          padding: 8px;
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          color: rgb(244 63 94);
          border-radius: 8px;
          margin-bottom: 4px;
        }

        .calendar-day {
          padding: 8px;
          text-align: center;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          border-radius: 8px;
          font-size: 14px;
          color: rgb(75 85 99);
          transition: all 0.2s ease;
        }

        .calendar-day.empty {
          background-color: transparent;
        }

        .calendar-day.marked {
          background-color: rgb(244 63 94 / 0.1);
          font-weight: bold;
          color: rgb(244 63 94);
          border: 2px solid rgb(244 63 94 / 0.3);
          transform: scale(1.05);
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .calendar-day:hover:not(.empty):not(.marked) {
          background-color: rgb(244 63 94 / 0.05);
          cursor: pointer;
          transform: scale(1.02);
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </>
  );
}
