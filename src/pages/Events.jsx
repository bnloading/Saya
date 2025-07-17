import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import EventCards from "@/components/EventsCard";
import config from "@/config/config";
import { useState } from "react";
import SectionSeparator from "@/components/SectionSeparator";

// Simple Custom Calendar Component
const CustomCalendar = ({ markedDate = 28 }) => {
  const year = 2025;
  const month = "шілде";
  const daysOfWeek = ["Дүй", "Сей", "Сәр", "Бей", "Жұм", "Сен", "Жек"];
  const daysInMonth = 31;
  const firstDayOfWeek = 2; // July 1st, 2025 starts on Tuesday

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
          <span>{day}</span>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
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
  const [date] = useState(new Date(2025, 7, 28)); // 27 шілде 2025 (month is 0-indexed)

  return (
    <>
      <section
        id="event"
        className="min-h-screen relative overflow-hidden bg-gray-100"
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
              className="inline-block text-gray-500 font-cormorant text-lg tracking-wide mb-2"
            ></motion.span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl font-monserrat text-gray-600 mb-4"
            >
              <h1 className="font-Toy text-4xl text-gray-800">Той иелері:</h1>
              <p className="text-2xl font-monserrat text-gray-900">
                <br />
                <span className="italic font-semibold text-gray-800 text-lg">
                  АТА-АНАСЫ:
                </span>
                <br />
                <span className="font-cormorant text-2xl text-gray-700">
                  АҒЖАН, ЖАЙНАГҮЛ
                </span>
                <br />
                <span className="italic font-semibold text-gray-800 text-lg">
                  АҒА-ЖЕҢГЕСІ:
                </span>
                <br />
                <span className="font-cormorant text-2xl text-gray-700">
                  МАҒЖАН, ӨМІРГҮЛ
                </span>
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-cormorant font-semibold text-gray-900 leading-tight tracking-wide"
            >
              Той салтанатының бағдарламасы
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 max-w-md mx-auto font-montserrat text-base leading-relaxed"
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
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <CustomCalendar markedDate={28} />
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
              <div className="h-[1px] w-12 bg-gray-200" />
              <div className="text-gray-600">
                <Heart className="w-4 h-4" fill="currentColor" />
              </div>
              <div className="h-[1px] w-12 bg-gray-200" />
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

      {/* Section Separator */}
      <SectionSeparator variant="default" />

      {/* Custom Calendar Styles */}
      <style jsx>{`
        .calendar-container {
          max-width: 320px;
          margin: 0 auto;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }

        .calendar-day-header {
          background: #f8f9fa;
          padding: 8px 4px;
          text-align: center;
          font-weight: 600;
          font-size: 13px;
          color: #6c757d;
          border-radius: 8px;
          margin-bottom: 8px;
        }

        .calendar-day {
          padding: 12px 8px;
          text-align: center;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          color: #495057;
          border: 1px solid #e9ecef;
        }

        .calendar-day.empty {
          background: transparent;
          border: none;
        }

        .calendar-day.marked {
          background: linear-gradient(135deg, #6b7280, #4b5563);
          color: white;
          font-weight: 700;
          border: none;
          box-shadow: 0 4px 12px rgba(75, 85, 99, 0.3);
        }

        .calendar-day:hover:not(.empty):not(.marked) {
          background: #f8f9fa;
          border-color: #dee2e6;
        }
      `}</style>
    </>
  );
}
