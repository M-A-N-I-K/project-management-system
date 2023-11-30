import Src from "../assets/icon2.png"

export default function Header() {
    return (
        <nav className="bg-light navbar mb-4 p-0">
            <div className="container">
                <a href="/" className="navbar-brand">
                    <div className="d-flex">
                        <img src={Src} alt="ProjeX." />
                        <div>ProjeX</div>
                    </div>
                </a>
            </div>
        </nav>
    )
}

