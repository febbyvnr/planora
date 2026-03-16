import ReviewRow from "../ReactBits/ReviewRow";

export default function ReviewSection() {

    const reviews = [
        {
            name: "Brian Setiawan",
            message:
                "Planora helps me stay focused when preparing for exams. The timer feature is incredibly helpful.",
            date: "Apr 18, 2026",
            time: "08:10 PM"
            },
            {
            name: "Nadia Prameswari",
            message:
                "I love how simple and clean the interface is. It makes planning my study sessions much easier.",
            date: "Apr 16, 2026",
            time: "09:25 PM"
            },
            {
            name: "Kevin Wijaya",
            message:
                "The session log is my favorite feature. It helps me reflect on how productive my day was.",
            date: "Apr 14, 2026",
            time: "07:40 PM"
            },
            {
            name: "Stephanie Tan",
            message:
                "Planora makes studying feel less overwhelming. Everything is structured and easy to manage.",
            date: "Apr 12, 2026",
            time: "10:05 PM"
            },
            {
            name: "Albert Gunawan",
            message:
                "I've tried many study planners before, but Planora feels the most intuitive and motivating.",
            date: "Apr 10, 2026",
            time: "08:30 PM"
            },
            {
            name: "Jessica Lim",
            message:
                "Using Planora daily helped me stay consistent with my study routine.",
            date: "Apr 8, 2026",
            time: "06:55 PM"
            },
            {
            name: "Vincent Santoso",
            message:
                "The productivity timer and planning tools together make studying much more effective.",
            date: "Apr 6, 2026",
            time: "09:18 PM"
            },
            {
            name: "Rachel Ong",
            message:
                "Planora helps me keep track of my group projects and assignments in one place.",
            date: "Apr 4, 2026",
            time: "07:22 PM"
            },
            {
            name: "Felix Pratama",
            message:
                "I love how the design feels modern and motivating to use every day.",
            date: "Apr 2, 2026",
            time: "08:48 PM"
            },
            {
            name: "Diana Wijaya",
            message:
                "It feels satisfying to see my study streak grow every day thanks to Planora.",
            date: "Mar 30, 2026",
            time: "10:11 PM"
            }
    ];

    return (
        <section className="w-full py-20 -mt-24 relative z-10 bg-[#4C27B2] overflow-hidden">

        {/* Header */}
        <div className="max-w-6xl mx-auto text-center mb-14">

            <h2 className="text-4xl md:text-5xl font-bold text-white mt-24">
            What People Say About Planora?
            </h2>

            <p className="font-bold mt-4 max-w-xl mx-auto text-[#baa1ff]">
            Many people use Planora to manage their academic life
            better, stay focused, and keep their plans organized.
            </p>

        </div>


        {/* Review Rows */}
        <div className="space-y-8">

            {/* Row 1 (scroll left) */}
            <ReviewRow reviews={reviews} direction="left" />

            {/* Row 2 (scroll right) */}
            <ReviewRow reviews={reviews} direction="right" />

        </div>


        {/* Edge Fade Effect */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-[#4C27B2] to-transparent" />

        <div className="pointer-events-none absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-[#4C27B2] to-transparent" />

        </section>
    );
}