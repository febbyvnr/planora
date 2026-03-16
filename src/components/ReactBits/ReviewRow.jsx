import { motion } from "framer-motion";

export default function ReviewRow({ reviews, direction = "left" }) {

    const duplicated = [...reviews, ...reviews];

    return (
        <div className="overflow-hidden w-full">
        <motion.div
            className="flex gap-6 w-max"
            animate={{
            x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
            }}
            transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear"
            }}
        >
            {duplicated.map((review, i) => (
            <div
                key={i}
                className="min-w-[350px] bg-white p-6 rounded-3xl shadow-lg border border-neutral-100"
            >
                <p className="text-neutral-700 mb-6">
                “{review.message}”
                </p>

                <div className="flex justify-between items-end">
                <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-neutral-500">{review.date}</p>
                </div>

                <span className="text-xs text-neutral-400">
                    {review.time}
                </span>
                </div>
            </div>
            ))}
        </motion.div>
        </div>
    );
}