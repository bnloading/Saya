import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { realtimeDb } from "@/lib/firebase";
import config from "@/config/config";
import {
  onValue,
  orderByChild,
  push,
  query,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import SectionSeparator from "@/components/SectionSeparator";

export default function Wishes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [rsvpStatus, setRsvpStatus] = useState("");
  const [wishSubmitting, setWishSubmitting] = useState(false);
  const [wishSuccess, setWishSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  useEffect(() => {
    if (comments.length > 0) {
      const timer = setInterval(nextWish, 5000);
      return () => clearInterval(timer);
    }
  }, [currentIndex, comments.length]);

  useEffect(() => {
    const wishesQuery = query(
      ref(realtimeDb, "wishes"),
      orderByChild("timestamp"),
    );

    const unsubscribe = onValue(
      wishesQuery,
      (snapshot) => {
        const updatedComments = Object.entries(snapshot.val() ?? {})
          .map(([id, value]) => ({
            id,
            ...value,
          }))
          .sort(
            (first, second) => (second.timestamp ?? 0) - (first.timestamp ?? 0),
          );
        setComments(updatedComments);
        setError(null);
      },
      (error) => {
        console.error("Error fetching comments:", error);
        setError(config.data.texts.errorFetch);
      },
    );

    return () => unsubscribe();
  }, []);

  const nextWish = () => {
    setCurrentIndex((prev) => (prev + 1) % comments.length);
  };

  const prevWish = () => {
    setCurrentIndex((prev) => (prev - 1 + comments.length) % comments.length);
  };

  const handleCombinedSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!userName.trim()) {
      setError(config.data.texts.errorName);
      return;
    }

    if (!newComment.trim() && !rsvpStatus) {
      setError(config.data.texts.errorWishOrRsvp);
      return;
    }

    setWishSubmitting(true);

    try {
      if (newComment.trim()) {
        const wishRef = push(ref(realtimeDb, "wishes"));
        await set(wishRef, {
          userName: userName.trim(),
          comment: newComment.trim(),
          timestamp: serverTimestamp(),
        });
        setWishSuccess(true);
        setNewComment("");
      }

      if (rsvpStatus) {
        const rsvpRef = push(ref(realtimeDb, "rsvp"));
        await set(rsvpRef, {
          userName: userName.trim(),
          rsvpStatus,
          timestamp: serverTimestamp(),
        });
        setRsvpSuccess(true);
        setRsvpStatus("");
      }

      setUserName("");

      setTimeout(() => {
        setWishSuccess(false);
        setRsvpSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Жіберу қатесі:", error);
      setError(config.data.texts.errorSubmit);
    } finally {
      setWishSubmitting(false);
    }
  };

  return (
    <section id="wishes" className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-gray-100 text-gray-700 rounded-lg">
            {error}
          </div>
        )}

        {wishSuccess && (
          <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-lg">
            {config.data.texts.wishSuccess}
          </div>
        )}
        {rsvpSuccess && (
          <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-lg">
            {config.data.texts.rsvpSuccess}
          </div>
        )}

        {comments.length > 0 && (
          <div className="mb-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="font-medium text-gray-900 mb-2">
                  {comments[currentIndex].userName}
                </div>
                <div className="text-gray-700 mb-3">
                  {comments[currentIndex].comment}
                </div>
                <div className="text-sm text-gray-400">
                  {comments[currentIndex].timestamp
                    ? new Date(
                        comments[currentIndex].timestamp,
                      ).toLocaleDateString()
                    : ""}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={prevWish}
                className="p-2 bg-white border border-rose-100 text-rose-500 rounded-full shadow-sm shadow-rose-100/60"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-500">
                {currentIndex + 1} / {comments.length}
              </span>
              <button
                onClick={nextWish}
                className="p-2 bg-white border border-rose-100 text-rose-500 rounded-full shadow-sm shadow-rose-100/60"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <motion.form
          onSubmit={handleCombinedSubmit}
          className="space-y-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="space-y-1">
            <label className="text-sm text-gray-800">
              {config.data.texts.nameLabel}
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={config.data.texts.namePlaceholder}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gray-300 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-800">
              {config.data.texts.wishLabel}
            </label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={config.data.texts.wishPlaceholder}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 h-28 focus:border-gray-300 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                value: "attending",
                label: config.data.texts.rsvpAttending,
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ),
              },
              {
                value: "not_attending",
                label: config.data.texts.rsvpNotAttending,
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ),
              },
              {
                value: "uncertain",
                label: config.data.texts.rsvpUncertain,
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
            ].map((option) => (
              <label
                key={option.value}
                className={`relative group cursor-pointer flex flex-col items-center justify-center rounded-xl border px-6 py-6 transition-all duration-200 ${
                  rsvpStatus === option.value
                    ? "border-rose-300 bg-rose-50 shadow-md text-rose-700"
                    : "border-rose-100 bg-white hover:border-fuchsia-200 hover:shadow hover:text-fuchsia-700"
                }`}
              >
                <input
                  type="radio"
                  name="rsvp"
                  value={option.value}
                  checked={rsvpStatus === option.value}
                  onChange={(e) => setRsvpStatus(e.target.value)}
                  className="absolute h-0 w-0 opacity-0"
                />
                <div className="mb-2">{option.icon}</div>
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>

          {/* Жалғыз батырма */}
          <button
            type="submit"
            disabled={wishSubmitting}
            className="w-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white px-6 py-3 rounded-2xl shadow-lg shadow-gray-400/40 hover:from-gray-800 hover:via-gray-900 hover:to-black transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none"
          >
            {wishSubmitting ? (
              <span>{config.data.texts.submitting}</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{config.data.texts.submit}</span>
              </>
            )}
          </button>
        </motion.form>
      </div>

      {/* Section Separator */}
    </section>
  );
}
