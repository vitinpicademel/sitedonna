export default function ImageGallery() {
  const images = [
    "/modern-luxury-apartment-living-room-interior.jpg",
    "/modern-apartment-building-exterior-architecture.jpg",
    "/modern-apartment-building-blue-glass-facade.jpg",
    "/luxury-apartment-bedroom-interior-dark.jpg",
    "/modern-apartment-hallway-corridor-white.jpg",
  ]

  return (
    <section className="py-0 bg-[#c89968]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0">
        {images.map((image, index) => (
          <div key={index} className="h-[200px] md:h-[250px] lg:h-[200px] relative group overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </section>
  )
}
