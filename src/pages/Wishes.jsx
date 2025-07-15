import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send } from "lucide-react"; // Add Send import
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

export default function Wishes() {
  // State declarations
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [rsvpStatus, setRsvpStatus] = useState("");
  const [wishSubmitting, setWishSubmitting] = useState(false);
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [wishSuccess, setWishSuccess] = useState(false);

  // Auto-advance effect
  useEffect(() => {
    if (comments.length > 0) {
      const timer = setInterval(nextWish, 5000);
      return () => clearInterval(timer);
    }
  }, [currentIndex, comments.length]);

  // Fetch comments
  useEffect(() => {
    const q = query(collection(db, "wishes"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(updatedComments);
    });
    return () => unsubscribe();
  }, []);

  const nextWish = () => {
    setCurrentIndex((prev) => (prev + 1) % comments.length);
  };

  const prevWish = () => {
    setCurrentIndex((prev) => (prev - 1 + comments.length) % comments.length);
  };

  const handleWishSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;

    setWishSubmitting(true);
    try {
      await addDoc(collection(db, "wishes"), {
        userName: userName.trim(),
        comment: newComment.trim(),
        timestamp: serverTimestamp(),
      });

      setNewComment("");
      setUserName("");
      setWishSuccess(true);
      setTimeout(() => setWishSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setWishSubmitting(false);
    }
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!rsvpStatus) return;

    setRsvpSubmitting(true);
    try {
      await addDoc(collection(db, "rsvp"), {
        userName: userName.trim(),
        rsvpStatus: rsvpStatus,
        timestamp: serverTimestamp(),
      });
      setRsvpStatus("");
      setWishSuccess(true);
      setTimeout(() => setWishSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setRsvpSubmitting(false);
    }
  };

  return (
    <section
      id="wishes"
      className="min-h-screen relative overflow-hidden py-20"
    >
      <div className="max-w-4xl mx-auto mt-8 px-4">
        {/* Wishes Section */}
        <div className="mb-12">
          <h3 className="text-xl font-medium text-gray-800 mb-6">Тілектер</h3>

          {/* Success Message */}
          {wishSuccess && (
            <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-lg">
              Тілегіңіз сәтті жіберілді
            </div>
          )}

          {/* Wishes Display Slider */}
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
                  <div className="font-medium text-gray-800 mb-2">
                    {comments[currentIndex].userName}
                  </div>
                  <div className="text-gray-600 mb-3">
                    {comments[currentIndex].comment}
                  </div>
                  <div className="text-sm text-gray-400">
                    {comments[currentIndex].timestamp
                      ?.toDate()
                      .toLocaleDateString()}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={prevWish}
                  className="p-2 rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-500">
                  {currentIndex + 1} / {comments.length}
                </span>
                <button
                  onClick={nextWish}
                  className="p-2 rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Wish Form */}
          <motion.form
            onSubmit={handleWishSubmit}
            className="space-y-4 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            {/* Name Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-sm">Сіздің атыңыз</span>
              </div>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Атыңызды енгізіңіз..."
                className="w-full px-4 py-3 rounded-lg bg-gray-50/50 border border-gray-200"
                required
              />
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="text-sm">Тілегіңіз</span>
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Жас жұптарға тілегіңізді жазыңыз..."
                className="w-full px-4 py-3 rounded-lg bg-gray-50/50 border border-gray-200 h-32 resize-none"
                required
              />
            </div>

            {/* Wish Submit Button */}
            <button
              type="submit"
              disabled={wishSubmitting}
              className="w-full bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {wishSubmitting ? (
                <span>Жіберілуде...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Тілек жіберу</span>
                </>
              )}
            </button>
          </motion.form>
        </div>

        {/* RSVP Section */}
        <div className="mt-12">
          <h3 className="text-xl font-medium text-gray-800 mb-6">
            Қатысу жауабы
          </h3>
          <motion.form
            onSubmit={handleRsvpSubmit}
            className="space-y-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="relative flex cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-rose-200 hover:shadow-md">
                <input
                  type="radio"
                  name="rsvp"
                  value="attending"
                  checked={rsvpStatus === "attending"}
                  onChange={(e) => setRsvpStatus(e.target.value)}
                  className="absolute h-0 w-0 opacity-0"
                />
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`rounded-full p-2 ${
                      rsvpStatus === "attending"
                        ? "bg-rose-100 text-rose-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
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
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      rsvpStatus === "attending"
                        ? "text-rose-600"
                        : "text-gray-700"
                    }`}
                  >
                    Құрметпен қатысамын
                  </span>
                </div>
              </label>

              <label className="relative flex cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-rose-200 hover:shadow-md">
                <input
                  type="radio"
                  name="rsvp"
                  value="not_attending"
                  checked={rsvpStatus === "not_attending"}
                  onChange={(e) => setRsvpStatus(e.target.value)}
                  className="absolute h-0 w-0 opacity-0"
                />
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`rounded-full p-2 ${
                      rsvpStatus === "not_attending"
                        ? "bg-rose-100 text-rose-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
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
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      rsvpStatus === "not_attending"
                        ? "text-rose-600"
                        : "text-gray-700"
                    }`}
                  >
                    Өкінішке орай қатыса алмаймын
                  </span>
                </div>
              </label>

              <label className="relative flex cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-rose-200 hover:shadow-md">
                <input
                  type="radio"
                  name="rsvp"
                  value="uncertain"
                  checked={rsvpStatus === "uncertain"}
                  onChange={(e) => setRsvpStatus(e.target.value)}
                  className="absolute h-0 w-0 opacity-0"
                />
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`rounded-full p-2 ${
                      rsvpStatus === "uncertain"
                        ? "bg-rose-100 text-rose-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
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
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      rsvpStatus === "uncertain"
                        ? "text-rose-600"
                        : "text-gray-700"
                    }`}
                  >
                    Әзірге белгісіз
                  </span>
                </div>
              </label>
            </div>

            {/* RSVP Submit Button */}
            <button
              type="submit"
              disabled={rsvpSubmitting}
              className="w-full bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {rsvpSubmitting ? (
                <span>Жіберілуде...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Жауапты жіберу</span>
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
