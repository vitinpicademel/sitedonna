import { MessageCircle } from "lucide-react"

export default function LatestNews() {
  const news = [
    {
      date: "08 MAR",
      category: "Apartments",
      author: "Alipes",
      title: "THE DIFFERENT TYPES OF LUXURY SPACES",
      image: "/luxury-apartment-bedroom-white.jpg",
      comments: 2,
    },
    {
      date: "08 MAR",
      category: "Building",
      author: "Alipes",
      title: "LOREM IPSUM DOLOR SIT AMET, CONSECTETUR",
      image: "/business-meeting-real-estate.jpg",
      comments: 2,
    },
    {
      date: "08 MAR",
      category: "Rooms",
      author: "Alipes",
      title: "NULLAM DOLOR EST, INTERDUM A FAUCIBUS",
      image: "/images/hotel-1.png",
      comments: 2,
    },
  ]

  return (
    <section className="py-24 bg-[#f5f5f0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[#c89968] text-sm font-bold mb-4 tracking-widest">WHAT'S HAPPENING</p>
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            LATEST NEWS UPDATES
            <br />& ARTICLES
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <div key={index} className="bg-white group cursor-pointer overflow-hidden">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-[#c89968] text-white px-4 py-2 text-sm font-bold">
                  {item.date}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Meta */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <span className="flex items-center gap-2 text-[#c89968]">
                    <span className="text-[#c89968]">📁</span>
                    {item.category}
                  </span>
                  <span className="text-gray-400">|</span>
                  <span className="flex items-center gap-2 text-gray-600">
                    <span>👤</span>
                    by {item.author}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-black mb-6 group-hover:text-[#c89968] transition-colors">
                  {item.title}
                </h3>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <button className="text-black font-medium hover:text-[#c89968] transition-colors">Read More</button>
                  <div className="flex items-center gap-2 text-[#c89968]">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{item.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Button */}
        <div className="flex justify-end mt-8">
          <button className="w-14 h-14 rounded-full bg-[#c89968] text-white flex items-center justify-center hover:bg-[#b8956a] transition-colors">
            →
          </button>
        </div>
      </div>
    </section>
  )
}
