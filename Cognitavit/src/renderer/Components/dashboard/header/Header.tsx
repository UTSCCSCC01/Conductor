
import './Header.css'

interface headerinput{
    header_path: string;
}

const Header = (prop: headerinput) => {
    return (
        <div className="topbar">
            <div className="path">
                Cognitavit / {prop.header_path}
            </div>
            <div className="user">
                <p>NAME</p>
                <div className="circle" />
            </div>
        </div>
    );
};

export default Header;

