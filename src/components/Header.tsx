import { useState } from 'react'
import { useGameContext } from '../context/GameContext'
import { LANGUAGES } from '../utils/constants'
import logo from '../assets/images/logo-5de3c5c1780841bd6b51a8ca36bce9c7.png'
import avatarImg from '../assets/images/missing_avatar_medium-392dc8ea63046044f92b68fae656614d.png'
import coinsImg from '../assets/images/coins-b0c4a9e2dd40550e61f8ead802d16d6a.png'
import addCoinsImg from '../assets/images/add_coins-64cadcd2c044bd9d071dbad85b5f26f5.png'
import magnifierImg from '../assets/images/magnifier-39e99762ce03caaa937c3500ec1f863e.png'
import shieldImg from '../assets/images/small_shield-e53da49caa2900535c33f8aa8840e2cc.png'
import envelopeImg from '../assets/images/small_envlope-1ea7ccd3166e293a7a8dd0640f0aa376.png'
import infoImg from '../assets/images/small_info-8ae78864e78dd46d7179236434a17301.png'
import videosBtn from '../assets/images/topbar_videos_btn-cf7f810ef7e691273db324129ed7bc85.png'

export default function Header() {
  const { user, addCoins, searchQuery, setSearchQuery } = useGameContext()
  const [showLang, setShowLang] = useState(false)

  return (
    <div
      id="header_container"
      className="fixed top-0 left-0 right-0 z-15 h-[53px] min-w-[1012px]"
      style={{ background: 'url(https://web.archive.org/web/20160729021620im_/http://cdn0.kizi.com/assets/collections/top_bar-8349973f656c4e46a411eecec1429b6d.png) repeat-x' }}
    >
      {/* Logo */}
      <div className="float-left">
        <a href="/">
          <img src={logo} alt="Kizi - Online Games" id="kizi_logo" className="ml-1" />
        </a>
      </div>

      {/* User info box */}
      <div id="user_info_box_container" className="float-left ml-[15px]">
        {/* Avatar */}
        <div
          id="user_avatar_thumb"
          className="float-left relative border border-[#103154] bg-[#003d68] w-[38px] h-[38px] mt-[5px] cursor-pointer"
        >
          <a href="#" onClick={(e) => e.preventDefault()}>
            <img src={avatarImg} alt="Avatar" id="user_image" className="w-[38px] h-[38px] float-left relative" />
          </a>
        </div>

        {/* Name & XP */}
        <div className="name_and_xp float-left h-[47px] px-[10px]">
          <div className="fl user_box_white_text text-left text-[15px] font-bold leading-[27px]">
            <div style={{ width: '80px' }}>Guest</div>
          </div>
          <div className="clr" />
          <div id="usr_exp_bar" className="h-[16px] w-[98%] bg-[#003760] rounded-[4px] relative text-left">
            <div id="exp_user_level" className="absolute top-0 left-0 z-9 w-full h-[16px] leading-[14px] text-white text-[12px] text-center">
              Level 1
            </div>
            <div id="exp_bar_fill" className="h-[14px] m-[1px] bg-[#fcdb03] rounded-[3px] relative" style={{ width: '2%' }} />
          </div>
        </div>

        {/* Coins */}
        <div id="coins_container" className="float-left h-[47px] border-l border-[#005e8c] pl-[8px] pr-[7px]">
          <img
            src={coinsImg}
            alt="Coins"
            className="float-left mt-[9px] ml-[3px] cursor-pointer"
            onClick={() => addCoins(100)}
          />
          <div id="coins_counter" className="float-left h-[31px] ml-[5px] mt-[9px] text-right">
            <div className="counter_cell float-left w-[13px] h-[31px] text-center leading-[31px] text-[22px] kizi_font">
              {user.coins.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Add coins */}
        <div id="get_coins_homepage" className="float-left w-[56px] h-[48px] relative cursor-pointer" onClick={() => addCoins(100)}>
          <img src={addCoinsImg} className="mt-[11px]" alt="+" />
        </div>

        {/* Videos button */}
        <div id="videos_btn" className="float-left h-[48px] w-[139px]">
          <a href="/videos">
            <img src={videosBtn} alt="Videos" className="mt-[2px]" />
          </a>
        </div>

        {/* Sign Up & Login */}
        <div
          className="signup float-left cursor-pointer h-[35px] bg-[#ffb82b] text-[15px] text-[#8E2B00] leading-[34px] text-center px-[10px] border border-[#8E2B00] rounded-[10px] mt-[6px] ml-[10px] font-bold kizi_font select-none"
        >
          Sign Up
        </div>
        <div
          className="login float-left cursor-pointer h-[35px] bg-[#1a5276] text-white leading-[34px] text-center px-[10px] rounded-[10px] text-[15px] border border-[#103154] mt-[6px] ml-[10px] font-bold kizi_font select-none"
        >
          Login
        </div>
      </div>

      {/* Right side: icons */}
      <div className="fr flex items-center mt-[11px]">
        {/* Facebook like */}
        <div className="fb-like-btn w-[90px] h-[21px] float-right" />

        {/* Language */}
        <div
          id="language_box"
          className="relative float-left mr-[5px]"
          onMouseEnter={() => setShowLang(true)}
          onMouseLeave={() => setShowLang(false)}
        >
          <div className="flag_container footer_nav_button cursor-pointer float-left w-[30px] h-[30px] mr-[5px]">
            <img
              src="https://web.archive.org/web/20160729021620im_/http://cdn1.kizi.com/assets/common/en-d44f81705c19a6f9731b6312a579b6ed.png"
              alt="English"
              className="mt-[4px]"
            />
          </div>
          {showLang && (
            <div className="absolute right-0 top-full z-50 mt-1 bg-white rounded shadow-lg text-sm text-black min-w-[120px]">
              {LANGUAGES.map((lang) => (
                <div key={lang.code} className="cursor-pointer px-2 py-1 hover:bg-gray-100 flex items-center gap-1">
                  <img
                    src={`https://web.archive.org/web/20160729021620im_/http://cdn1.kizi.com/assets/common/${lang.code}-placeholder.png`}
                    alt={lang.name}
                    className="w-[18px] h-[12px]"
                  />
                  {lang.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* About */}
        <a href="/about" className="footer_nav_button float-left mr-[5px]">
          <img src={infoImg} alt="About Kizi" className="mt-[4px]" />
        </a>

        {/* Contact */}
        <a href="/contact" className="footer_nav_button float-left mr-[5px]">
          <img src={envelopeImg} alt="Contact Kizi" className="mt-[6px]" />
        </a>

        {/* Privacy */}
        <a href="/privacy" className="footer_nav_button float-left mr-[5px]" id="privacy_button">
          <img src={shieldImg} alt="Privacy Policy" className="mt-[5px]" />
        </a>
      </div>

      {/* Search */}
      <div
        id="search_div"
        className="fr relative w-[200px] h-[41px] bg-[#044267] rounded-[20px] mt-[4px] mr-[8px]"
      >
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="kizi_font bg-transparent border-none text-white outline-none pl-[15px] pr-[35px] w-full h-full text-[13px]"
          maxLength={20}
        />
        <img
          src={magnifierImg}
          alt="Search"
          className="fr cursor-auto mr-[5px] mt-[6px] relative z-3"
        />
      </div>
    </div>
  )
}
