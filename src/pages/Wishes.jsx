import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
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

  // Авто-слайдер
  useEffect(() => {
    if (comments.length > 0) {
      const timer = setInterval(nextWish, 5000);
      return () => clearInterval(timer);
    }
  }, [currentIndex, comments.length]);

  // Тілектерді алу
  useEffect(() => {
    const q = query(collection(db, "wishes"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const updatedComments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(updatedComments);
        setError(null);
      },
      (error) => {
        console.error("Error fetching comments:", error);
        setError("Тілектерді жүктеу кезінде қате шықты");
      }
    );

    return () => unsubscribe();
  }, []);

  const nextWish = () => {
    setCurrentIndex((prev) => (prev + 1) % comments.length);
  };

  const prevWish = () => {
    setCurrentIndex((prev) => (prev - 1 + comments.length) % comments.length);
  };

  // Жалғыз батырма арқылы екі дерек жіберу
  const handleCombinedSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!userName.trim()) {
      setError("Атыңызды енгізіңіз");
      return;
    }

    if (!newComment.trim() && !rsvpStatus) {
      setError("Тілегіңізді немесе қатысу жауабын енгізіңіз");
      return;
    }

    setWishSubmitting(true);

    try {
      if (newComment.trim()) {
        await addDoc(collection(db, "wishes"), {
          userName: userName.trim(),
          comment: newComment.trim(),
          timestamp: serverTimestamp(),
        });
        setWishSuccess(true);
        setNewComment("");
      }

      if (rsvpStatus) {
        await addDoc(collection(db, "rsvp"), {
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
      setError("Деректерді жіберу кезінде қате шықты");
    } finally {
      setWishSubmitting(false);
    }
  };

  return (
    <section id="wishes" className="min-h-screen py-20 px-4 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-gray-100 text-gray-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Success messages */}
        {wishSuccess && (
          <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-lg">
            Тілегіңіз сәтті жіберілді
          </div>
        )}
        {rsvpSuccess && (
          <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-lg">
            Қатысу жауабы жіберілді
          </div>
        )}

        {/* Слайдер */}
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
                    ?.toDate()
                    .toLocaleDateString()}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={prevWish}
                className="p-2 bg-white border rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-500">
                {currentIndex + 1} / {comments.length}
              </span>
              <button
                onClick={nextWish}
                className="p-2 bg-white border rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Біріктірілген форма */}
        <motion.form
          onSubmit={handleCombinedSubmit}
          className="space-y-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm text-gray-800">Сіздің атыңыз</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Атыңызды енгізіңіз..."
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200"
              required
            />
          </div>

          {/* Wish */}
          <div className="space-y-1">
            <label className="text-sm text-gray-800">Тілегіңіз</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Тілегіңізді жазыңыз..."
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 h-28"
            />
          </div>

          {/* RSVP */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                value: "attending",
                label: "Қатысамын",
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
                label: "Қатыса алмаймын",
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
                label: "Белгісіз",
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
                    ? "border-gray-500 bg-gray-50 shadow-md text-gray-600"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow"
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
            className="w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {wishSubmitting ? (
              <span>Жіберілуде...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Жіберу</span>
              </>
            )}
          </button>
        </motion.form>
      </div>

      {/* Section Separator */}
    </section>
  );
}
