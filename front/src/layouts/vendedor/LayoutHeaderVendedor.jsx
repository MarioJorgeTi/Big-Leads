const LayoutHeaderVendedor = () => {

  const pegarNomeUsuario = () => {
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    return usuario.nome || "Usuário";
  };

  const nome = pegarNomeUsuario();

  return (
    <header className="w-full flex align-items-center p-3">
      <h1 className="text-xl font-bold">Bem-vindo, {nome}!</h1>
    </header>
  )
}

export default LayoutHeaderVendedor
