import type { Game, FeaturedGame, HomepageGamesData } from '../types/game'

const GAMES: Game[] = [
  { new: true, name: 'Moto X3M 2', rel_id: 24693, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static1.kizi.com/system/static/thumbs/tile_thumb/1561/thumb150_160x160.jpg?1456236440', path: '/games/moto-x3m-2', render_play_icon: false, is_video: false },
  { new: true, name: 'Guthood', rel_id: 24670, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static1.kizi.com/system/static/thumbs/tile_thumb/1602/thumb150_300x300_b.jpg?1469430828', path: '/games/guthood', render_play_icon: false, is_video: false },
  { new: true, name: 'Adam & Eve 2', rel_id: 24653, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static1.kizi.com/system/static/thumbs/tile_thumb/1408/thumb150_Screen_Shot_2015-05-07_at_12.38.08_PM.jpg?1431003370', path: '/games/adam-eve-2', render_play_icon: false, is_video: false },
  { new: false, name: 'Toy Defense', rel_id: 24645, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static1.kizi.com/system/static/thumbs/tile_thumb/1615/thumb150_toy_defense_1435933244.5888.jpg?1469009104', path: '/games/toy-defense', render_play_icon: false, is_video: false },
  { new: false, name: 'Farm Days', rel_id: 24630, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static0.kizi.com/system/static/thumbs/tile_thumb/1610/thumb150_8310_FDS_Kizi_150x150_jpg_fz.jpg?1468242557', path: '/games/farm-days', render_play_icon: false, is_video: false },
  { new: false, name: 'NeoGP', rel_id: 24622, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static0.kizi.com/system/static/thumbs/tile_thumb/1007/thumb150_NeoGP_150x150.jpg?1377515879', path: '/games/neogp', render_play_icon: false, is_video: false },
  { new: false, name: 'Garden Tales', rel_id: 24573, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static0.kizi.com/system/static/thumbs/tile_thumb/1605/thumb150_8303_GT_Kizi_150x150_jpg_fz.jpg?1466521696', path: '/games/garden-tales', render_play_icon: false, is_video: false },
  { new: false, name: 'Candy Rain', rel_id: 1830, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static1.kizi.com/system/static/thumbs/tile_thumb/1033/thumb150_candyrain_150x150.jpg?1379331916', path: '/games/candy-rain', render_play_icon: false, is_video: false },
  { new: false, name: 'Red Beard', rel_id: 24599, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static0.kizi.com/system/static/thumbs/tile_thumb/1608/thumb150_RedBeard_150x150.jpg?1467626216', path: '/games/red-beard', render_play_icon: false, is_video: false },
  { new: false, name: 'Hidden Objects', rel_id: 24586, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static0.kizi.com/system/static/thumbs/tile_thumb/1592/thumb150_ho_kizi_150x150.jpg?1465462912', path: '/games/hidden-objects', render_play_icon: false, is_video: false },
  { new: false, name: 'Glance', rel_id: 6760, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static1.kizi.com/system/static/thumbs/tile_thumb/409/thumb150_glance_150x150.jpg?1364462754', path: '/games/glance', render_play_icon: false, is_video: false },
  { new: false, name: 'Arcuz', rel_id: 24510, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static0.kizi.com/system/static/thumbs/tile_thumb/1586/thumb150_arcuz_150x150.jpg?1463533476', path: '/games/arcuz', render_play_icon: false, is_video: false },
  { new: false, name: 'Hydrophobia', rel_id: 24509, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static1.kizi.com/system/static/thumbs/tile_thumb/1585/thumb150_hydrophobia_150x150.jpg?1463508315', path: '/games/hydrophobia', render_play_icon: false, is_video: false },
  { new: false, name: 'Touch', rel_id: 24019, unity: false, thumb: 'https://web.archive.org/web/20160729021618/http://static1.kizi.com/system/static/thumbs/tile_thumb/1499/thumb150_touch_kizi_150x150.jpg?1457452337', path: '/games/touch', render_play_icon: false, is_video: false },
]

const FEATURED: FeaturedGame[] = [
  { item_id: 22921, name: 'Money Movers 2', countries: null, new: false, permalink: '/games/money-movers-2', thumb: 'https://web.archive.org/web/20160729021618/http://static1.kizi.com/system/static/thumbs/big_tile_thumb/1320/thumb300_MM2_2_300.jpg?1421161858' },
  { item_id: 22922, name: 'Jacksmith', countries: null, new: false, permalink: '/games/jacksmith', thumb: 'https://web.archive.org/web/20160729021618/http://static1.kizi.com/system/static/thumbs/big_tile_thumb/1068/thumb300_jacksmith_300x300.jpg?1382835782' },
  { item_id: 22299, name: 'Super Mechs', countries: null, new: false, permalink: '/games/super-mechs', thumb: 'https://web.archive.org/web/20160729021618/http://static0.kizi.com/system/static/thumbs/big_tile_thumb/1277/thumb300_sm_300x300.jpg?1438687100' },
  { item_id: 24164, name: 'Dynamons', countries: null, new: false, permalink: '/games/dynamons', thumb: 'https://web.archive.org/web/20160729021618/http://static0.kizi.com/system/static/thumbs/big_tile_thumb/1476/thumb300_2016-02-07.jpg?1454853752' },
  { item_id: 24308, name: 'Goodgame Empire', countries: null, new: false, permalink: '/games/goodgame-empire', thumb: 'https://web.archive.org/web/20160729021618/http://static0.kizi.com/system/static/thumbs/big_tile_thumb/605/thumb300_em_warofempires_300x300.jpg?1458829291' },
  { item_id: 13154, name: 'Fireboy and Watergirl - The Crystal Temple', countries: null, new: false, permalink: '/games/fireboy-and-watergirl-thel-crystal-temple', thumb: 'https://web.archive.org/web/20160729021618/http://static1.kizi.com/system/static/thumbs/big_tile_thumb/1035/thumb300_Thumb_300x300.jpg?1379944969' },
  { item_id: 23994, name: 'Fish Always Online', countries: null, new: false, permalink: '/games/c/fish-always-online', thumb: 'https://web.archive.org/web/20160729021618/http://static1.kizi.com/system/static/thumbs/big_tile_thumb/1157/thumb300_300x300.jpg?1451316414' },
  { item_id: 24155, name: 'Family Barn', countries: null, new: false, permalink: '/games/c/family-barn', thumb: 'https://web.archive.org/web/20160729021618/http://static0.kizi.com/system/static/thumbs/big_tile_thumb/1482/thumb300_fb_kizi_300x300_logo.jpg?1455114830' },
]

function simulateNetwork<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 300)
  })
}

export function fetchHomepageGames(): Promise<HomepageGamesData> {
  return simulateNetwork({
    record_efficiency: true,
    page: 1,
    total_pages: 1,
    rel: 'CollectionItem',
    collection_id: 111,
    selected_games: [],
    games: GAMES,
  })
}

export function fetchFeaturedGames(): Promise<FeaturedGame[]> {
  return simulateNetwork(FEATURED)
}
