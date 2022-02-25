import logo from '../../img/logo.png';


export default function NavBar () {
  return (
    <div className={s.home_header}>
      <div className={s.div_btn}>
        <div className={s.header_logo}>
          <Link to="/">
            <img classNam={s.logo_nb} src={logo} alt="logo" />
          </Link>
        </div>
        <div className={s.header_buttons}>
          <Link to="/new">
            <button className={s.btn}>Create new Videogame</button>
          </Link>
        </div>
          <div className={s.search_bar}>
            <SearchBar />
          </div>
      </div>
    </div>
)
}