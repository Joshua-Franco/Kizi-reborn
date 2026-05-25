import { useGameContext } from '../context/GameContext'

const categories = [
  { id: 'homepage', name: 'Homepage', img: 'https://web.archive.org/web/20160729021618im_/http://static0.kizi.com/system/static/thumbs/collections/1.png?1449753697' },
  { id: 'food', name: 'Food', img: 'https://web.archive.org/web/20160729021618im_/http://static0.kizi.com/system/static/thumbs/collections/113.png?1449753812' },
  { id: 'management', name: 'Management', img: 'https://web.archive.org/web/20160729021618im_/http://static1.kizi.com/system/static/thumbs/collections/17.png?1449753784' },
  { id: 'dress-up', name: 'Dress up', img: 'https://web.archive.org/web/20160729021618im_/http://static1.kizi.com/system/static/thumbs/collections/12.png?1449753771' },
  { id: 'racing', name: 'Racing', img: 'https://web.archive.org/web/20160729021618im_/http://static1.kizi.com/system/static/thumbs/collections/25.png?1449753793' },
  { id: 'alien', name: 'Alien', img: 'https://web.archive.org/web/20160729021618im_/http://static0.kizi.com/system/static/thumbs/collections/116.png?1449754047' },
  { id: 'strategy', name: 'Strategy', img: 'https://web.archive.org/web/20160729021618im_/http://static0.kizi.com/system/static/thumbs/collections/6.png?1449753757' },
  { id: 'action-arcade', name: 'Action', img: 'https://web.archive.org/web/20160729021618im_/http://static0.kizi.com/system/static/thumbs/collections/5.png?1449754062' },
  { id: 'puzzle', name: 'Puzzle', img: 'https://web.archive.org/web/20160729021618im_/http://static0.kizi.com/system/static/thumbs/collections/3.png?1449753728' },
]

export default function Sidebar() {
  const { currentCategory, setCurrentCategory } = useGameContext()

  return (
    <div id="collections_wrapper" className="relative z-10">
      <ul className="absolute top-[50px] left-0 bottom-0 bg-[#034566]">
        {categories.map((cat) => (
          <li key={cat.id} className="w-[60px] h-[60px] block">
            <a
              href={`/${cat.id === 'homepage' ? '' : cat.id}`}
              onClick={(e) => {
                e.preventDefault()
                setCurrentCategory(cat.id)
              }}
              className={`block w-[60px] h-[60px] bg-cover bg-no-repeat relative ${
                currentCategory === cat.id ? 'selected_category' : ''
              }`}
              style={{
                backgroundImage: `url(${cat.img})`,
                backgroundPosition: currentCategory === cat.id ? 'right' : 'left',
              }}
              rel="categorySidebar"
            >
              <div
                className="category_title hidden absolute top-[20px] left-[50px] w-[80px] bg-[#c0e0ee] border border-[#3a789e] z-[1000] overflow-hidden whitespace-nowrap px-[5px] py-[1px] text-[12px] text-[#044267] rounded-[5px]"
                style={{ fontFamily: 'Oswald' }}
              >
                {cat.name}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
