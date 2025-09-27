\"use client\";

export default function FeedbackButton() {
  return (
    <button
      className="fixed bottom-4 left-4 z-40 rounded-lg bg-white/90 px-4 py-2 text-sm shadow hover:bg-white"
      onClick={() => {
        alert("Open Feedback");
      }}
    >
      Feedback
    </button>
  );
}
