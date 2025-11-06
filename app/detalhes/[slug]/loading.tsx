export default function Loading() {
  return (
    <div className="intro-overlay">
      <video
        className="intro-video"
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
        loop
      />
      <div className="intro-card">
        <img src="/logoprincipal.png" alt="Donna Imobiliária" className="intro-logo" />
        <div className="intro-bar">
          <div className="intro-bar__progress" />
        </div>
        <p className="intro-hint">Carregando detalhes do imóvel...</p>
      </div>
    </div>
  )
}


