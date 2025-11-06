export default function Head() {
  return (
    <>
      {/* Vendor CSS do tema (apenas para a rota /home-novo) */}
      <link rel="stylesheet" href="/alipes/assets/vendors/bootstrap/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/alipes/assets/vendors/alipes-icons/style.css" />
      <link rel="stylesheet" href="/alipes/assets/vendors/flaticons/css/flaticon.css" />
      {/* Modo escuro do Alipes */}
      <link rel="stylesheet" href="/alipes/assets/css/modes/alipes-dark.css" />

      {/* Vendor JS básico do tema (carrosséis/animações do template) */}
      <script defer src="/alipes/assets/vendors/bootstrap/js/bootstrap.min.js"></script>
      <script defer src="/alipes/assets/js/alipes-theme.js"></script>
    </>
  )
}


