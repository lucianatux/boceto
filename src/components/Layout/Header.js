import logo from '../../assets/logo.png';

export const Header = () => {
  return (
    <header className="header">
      <div className='d-flex justify-content-center align-items-center p-1 m-1'>
        <h1 className='px-5'>Título</h1>
        <img className='logo' src={logo} alt=""/>
        <p className='px-3 py-0 m-0'>"una frase que represente"</p>
      </div>
    </header>
  )
}