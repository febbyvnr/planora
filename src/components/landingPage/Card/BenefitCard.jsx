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
        className={`flex flex-col lg:flex-row items-center gap-12 py-16 ${
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
                className={`absolute rounded-xl shadow-lg ${img.className}`}
            />
            ))}

            <div className="h-[320px]" />
        </div>

        {/* Text */}
        <div className="lg:w-1/2 space-y-6">

            <div className={`inline-block px-6 py-3 rounded-2xl text-white text-3xl md:text-4xl font-bold ${color}`}>
            {title}
            </div>

            <p className="text-lg md:text-xl text-black/60 leading-relaxed">
            <span className="font-bold text-black">{highlight}</span> {description}
            </p>

        </div>
        </div>
    );
    }