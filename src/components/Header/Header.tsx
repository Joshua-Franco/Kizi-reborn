import { useGameContext } from '../../context/GameContext'
import { LANGUAGES } from '../../utils/constants'
import { KIZI_UI } from '../../utils/kiziAssets'
import { ui } from '../../utils/assetCatalog'
import './Header.css'

const FLAG_FILES: Record<string, string> = {
  en: 'en.png',
  es: 'es.png',
  pt: 'pt.png',
  ru: 'ru.png',
  de: 'de.png',
  fr: 'fr.png',
  pl: 'pl.png',
  he: 'he.png',
}

function formatCoinDigits(coins: number): string[] {
  return String(coins).padStart(7, '0').split('')
}

export default function Header() {
  const { user, addCoins, searchQuery, setSearchQuery } = useGameContext()
  const coinDigits = formatCoinDigits(user.coins)

  return (
    <div
      id="header_container"
      className="narrow_screen"
      style={
        {
          '--kizi-join-btn': `url(${KIZI_UI.joinBtn})`,
          '--kizi-join-btn-hover': `url(${KIZI_UI.joinBtnHover})`,
          '--kizi-login-btn': `url(${KIZI_UI.loginBtn})`,
          '--kizi-login-btn-hover': `url(${KIZI_UI.loginBtnHover})`,
        } as React.CSSProperties
      }
    >
      <div className="fl">
        <a href="/">
          <img src={KIZI_UI.logo} alt="Kizi - Online Games" id="kizi_logo" />
        </a>
      </div>

      <div id="user_info_box_container">
        <div id="user_avatar_thumb" style={{ cursor: 'pointer' }}>
          <a href="#" onClick={(e) => e.preventDefault()} title="Sign Up">
            <img src={KIZI_UI.avatar} alt="Avatar" id="user_image" />
          </a>
        </div>

        <div className="name_and_xp">
          <div className="fl user_box_white_text" style={{ textAlign: 'left', lineHeight: '27px', fontSize: '15px' }}>
            <div style={{ width: '80px' }}>Guest</div>
          </div>
          <div className="clr" />
          <div id="usr_exp_bar">
            <div style={{ width: '98%' }}>
              <div id="exp_user_level">Level 1</div>
              <div id="exp_bar_fill" />
            </div>
          </div>
        </div>

        <div id="coins_container">
          <img
            src={KIZI_UI.coins}
            alt="Coins"
            className="fl"
            style={{ margin: '9px 0 0 3px', cursor: 'pointer' }}
            onClick={() => addCoins(100)}
          />
          <div id="coins_counter" className="kizi_font">
            {coinDigits.map((digit, i) => (
              <div key={i} className="counter_cell">
                {digit}
              </div>
            ))}
          </div>
        </div>

        <div id="get_coins_homepage" onClick={() => addCoins(100)}>
          <img src={KIZI_UI.addCoins} style={{ marginTop: '11px' }} alt="+" />
        </div>

        <div className="signup kizi_font prevent_select">Sign Up</div>
        <div className="login kizi_font prevent_select">Login</div>
      </div>

      <div id="search_div" className="fr">
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="kizi_font"
          maxLength={20}
        />
        <img src={KIZI_UI.magnifier} alt="Search" />
      </div>

      <div id="header_right_icons" className="fr">
        <a href="/privacy" className="footer_nav_button" id="privacy_button" title="Privacy Policy">
          <img src={KIZI_UI.shield} alt="Privacy Policy" style={{ marginTop: '5px' }} />
        </a>
        <a href="/contact" className="footer_nav_button" id="contact_button" title="Contact Kizi">
          <img src={KIZI_UI.envelope} alt="Contact Kizi" style={{ marginTop: '6px' }} />
        </a>
        <a href="/about" className="footer_nav_button" id="info_button" title="About Kizi">
          <img src={KIZI_UI.info} alt="About Kizi" style={{ marginTop: '4px' }} />
        </a>
        <div id="language_box">
          <div className="flag_selector">
            {LANGUAGES.map((lang) => (
              <div key={lang.code}>
                <img
                  src={ui(FLAG_FILES[lang.code])}
                  alt={lang.name}
                  className="flag_icon"
                  style={{ width: 18, height: 12, marginRight: 4, verticalAlign: 'middle' }}
                />
                {lang.name}
              </div>
            ))}
          </div>
          <div className="flag_container footer_nav_button">
            <img src={ui('en.png')} alt="Select your language" className="selected_flag" title="Select your language" />
          </div>
        </div>
      </div>
    </div>
  )
}
