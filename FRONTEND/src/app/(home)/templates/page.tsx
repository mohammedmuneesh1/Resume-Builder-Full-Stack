import Image from "next/image";

const resumeTemplates = ["01.webp", "02.webp", "03.webp", "04.webp"];

export default function TemplatesPage() {
  return (
    <section className="screenPadding screenWidth py-20 min-h-screen">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
          TEMPLATES
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-4">
          Professional Templates for Every Career
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stand out with our carefully crafted resume designs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resumeTemplates.map((fileName, index) => {
          const label = `Template ${String(index + 1).padStart(2, "0")}`;
          const src = `/resumeTemplates/${fileName}`;

          return (
            <div key={fileName} className="group cursor-pointer">
              <div className="bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-blue-500 transition-all duration-300 group-hover:shadow-xl">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                  <Image
                    src={src}
                    alt={label}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-center mt-4 font-semibold text-gray-700">
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}