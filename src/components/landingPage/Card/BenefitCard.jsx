export default function BenefitCard({
    title,
    description,
    highlight,
    images,
    reverse = false,
    color = "bg-indigo-600"
    }) {

    return (
        <div
        className={`flex flex-col lg:flex-row items-start gap-6 py-4 ${
            reverse ? "lg:flex-row-reverse" : ""
        }`}
        >
        {/* Images */}
        <div className="relative w-full lg:w-1/2 flex justify-center">

            {images.map((img, i) => (
            <img
                key={i}
                src={img.src}
                alt=""
                className={`absolute rounded-2xl shadow-xl ${img.className}`}
            />
            ))}

            {/* bigger container */}
            <div className="h-[340px] md:h-[380px]" />
        </div>

            {/* Text */}
            <div className="lg:w-1/2 space-y-4">

                <div
                className={`inline-block px-8 py-4 rounded-2xl text-white text-4xl md:text-5xl font-bold ${color}`}
                >
                {title}
                </div>

                <p className="text-xl md:text-2xl text-black/70 leading-relaxed max-w-xl">
                <span className="font-bold text-black">{highlight}</span>{" "}
                {description}
                </p>

            </div>
        </div>
    );
}