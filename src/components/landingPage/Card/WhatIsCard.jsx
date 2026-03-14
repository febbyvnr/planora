export default function FeatureCard({
        title,
        description,
        icon,
        iconBg,
        iconColor,
        rotation
    }) {
        
    return (
        <div
        className={`
        bg-white p-6 rounded-2xl shadow-md
        transform transition duration-300
        ${rotation}
        hover:rotate-0 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-2xl
        `}
        >

        {/* Icon */}
        <div
            className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${iconBg}`}
        >
            <div className={`${iconColor} w-6 h-6`}>
            {icon}
            </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2">
            {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed">
            {description}
        </p>

        </div>
    );
}