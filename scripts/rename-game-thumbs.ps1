# Renombra thumbs en src/assets/games a nombres de juego (sin borrar archivos).
$gamesDir = (Join-Path $PSScriptRoot '..\src\assets\games' | Resolve-Path).Path

$map = [ordered]@{
  'thumb150_11806-Papa-Louie-3.jpg' = 'papas-louie-3-when-sundaes-attack.jpg'
  'thumb150_150 (1).jpg' = '3-pandas-in-brazil.jpg'
  'thumb150_150 (2).jpg' = '3-pandas-in-japan.jpg'
  'thumb150_150.jpg' = 'wheely.jpg'
  'thumb150_150_150.jpg' = 'soccer-brazil.jpg'
  'thumb150_150_150_Untitled-3.jpg' = 'wheely-2.jpg'
  'thumb150_150x150 (1).jpg' = '3-pandas.jpg'
  'thumb150_150x150 (2).jpg' = 'dino-shift-2.jpg'
  'thumb150_150x150 (3).jpg' = 'spy-mouse.jpg'
  'thumb150_150x150 (4).jpg' = 'red-ball-4.jpg'
  'thumb150_150x150 (5).jpg' = 'idle-heroes.jpg'
  'thumb150_150x150.jpg' = '3-pandas-fantasy.jpg'
  'thumb150_2b89b70d201b443991360f2ba5622c17-512x512.jpg' = 'snail-bob-2.jpg'
  'thumb150_31.jpg' = 'snail-bob.jpg'
  'thumb150_3430e03c9bc44c5389f9cc17890f572b-512x512.jpg' = 'papa-louie-character.jpg'
  'thumb150_37.jpg' = 'snail-bob-3.jpg'
  'thumb150_54.jpg' = 'goo-fighters.jpg'
  'thumb150_63.jpg' = 'bob-the-robber.jpg'
  'thumb150_77.jpg' = 'siege-hero.jpg'
  'thumb150_78.jpg' = 'blue-creature.jpg'
  'thumb150_79.jpg' = 'stickman-adventure.jpg'
  'thumb150_bob-the-robber-2-150.jpg' = 'bob-the-robber-2.jpg'
  'thumb150_BorTheRobber3_150x150.jpg' = 'bob-the-robber-3.jpg'
  'thumb150_burgeria_150x150.jpg' = 'papas-burgeria.jpg'
  'thumb150_cheeseria_200x200.jpg' = 'papas-cheeseria.jpg'
  'thumb150_comingsoon.jpg' = 'papas-bakeria.jpg'
  'thumb150_coverorangeplayerpack2150.jpg' = 'cover-orange-players-pack-2.jpg'
  'thumb150_cupcakeria_150x150.jpg' = 'papas-cupcakeria.jpg'
  'thumb150_deadtreedefender150.jpg' = 'dead-tree-defender.jpg'
  'thumb150_doggeria_150x150.jpg' = 'papas-hot-doggeria.jpg'
  'thumb150_donuteria_150x150.jpg' = 'papas-donuteria.jpg'
  'thumb150_duck4.jpg' = 'duck-life-4.jpg'
  'thumb150_duck-life-3-kizi.jpg' = 'duck-life-3-evolution.jpg'
  'thumb150_duck-life-space-kizi.jpg' = 'duck-life-space.jpg'
  'thumb150_FBWG1_150x150.jpg' = 'fireboy-watergirl-1-forest-temple.jpg'
  'thumb150_FBWG2_150x150.jpg' = 'fireboy-watergirl-2-light-temple.jpg'
  'thumb150_FBWG3_150x150 (1).jpg' = 'fireboy-watergirl-3-ice-temple.jpg'
  'thumb150_fireboy-and-watergirl-7-and-friends_150x150.jpg' = 'fireboy-watergirl-7-and-friends.jpg'
  'thumb150_fireboy-watergirl-6-150x150-.jpg' = 'fireboy-watergirl-6-fairy-tales.jpg'
  'thumb150_fpa_w1_remix_150x150.jpg' = 'fancy-pants-world-1-remix.jpg'
  'thumb150_freezeria_150x150.jpg' = 'papas-freezeria.jpg'
  'thumb150_frogout150x150.jpg' = 'frogout.jpg'
  'thumb150_FSB_150.jpg' = 'fancy-pants-adventure.jpg'
  'thumb150_gd-thumb-FBWG5_512x512.jpg' = 'fireboy-watergirl-5-elements.jpg'
  'thumb150_headless-zombie-150.jpg' = 'headless-zombie.jpg'
  'thumb150_hipposfeeder150.jpg' = 'hippo-feeder.jpg'
  'thumb150_homesheep2.jpg' = 'home-sheep-home-2.jpg'
  'thumb150_hqdefault.jpg' = 'bad-ice-cream.jpg'
  'thumb150_icon150.jpg' = 'sushi-cat.jpg'
  'thumb150_icon150x150.jpg' = 'papas-pancakeria.jpg'
  'thumb150_Icon5_150x150.jpg' = 'candy-crush-saga.jpg'
  'thumb150_knights150x150.jpg' = 'knights-and-brides.jpg'
  'thumb150_mm_3.jpg' = 'money-movers-3.jpg'
  'thumb150_MM2_c.jpg' = 'money-movers-2-kizi.jpg'
  'thumb150_MMM_150x150b.jpg' = 'money-movers-maker.jpg'
  'thumb150_Money150.jpg' = 'money-movers.jpg'
  'thumb150_ninja-miner-150.jpg' = 'ninja-miner.jpg'
  'thumb150_np2-150-150.jpg' = 'ninja-painter-2.jpg'
  'thumb150_original_41.jpg' = 'fancy-pants-adventure-2.jpg'
  'thumb150_Papa-Louie1_150x150.jpg' = 'papas-louie-1-when-pizzas-attack.jpg'
  'thumb150_papalouie2_150x150 (1).jpg' = 'papas-louie-2-when-burgers-attack.jpg'
  'thumb150_pastaria_150x150.jpg' = 'papas-pastaria.jpg'
  'thumb150_pd_150.jpg' = 'papas-donuteria-to-go.jpg'
  'thumb150_pirates150x150.jpg' = 'pirates.jpg'
  'thumb150_pizzeria_150x150.jpg' = 'papas-pizzeria.jpg'
  'thumb150_psushi150.jpg' = 'papas-sushiria.jpg'
  'thumb150_Scooperia_Logo.jpg' = 'papas-scooperia.jpg'
  'thumb150_Thumb_150x150.jpg' = 'bob-the-robber-4.jpg'
  'thumb150_Thumb_150x150_Bob4_S2_russia.jpg' = 'bob-the-robber-4-russia.jpg'
  'thumb150_thumb_435x280.jpg' = 'sushi-cat-2.jpg'
  'thumb150_Thumb_512x512_S3_c2.jpg' = 'bob-the-robber-4-temple.jpg'
  'thumb150_tls150.jpg' = 'the-last-survivors.jpg'
  'thumb150_tm_150.jpg' = 'twin-cat-warrior.jpg'
  'thumb150_treasurehunticon_150.jpg' = 'duck-life-treasure-hunt.jpg'
  'thumb150_w7_150_150.jpg' = 'wheely-7.jpg'
  'thumb150_w8_150_150.jpg' = 'wheely-8.jpg'
  'thumb150_WHEELY_150.jpg' = 'wheely-1.jpg'
  'thumb150_wheely3_150_150.jpg' = 'wheely-3.jpg'
  'thumb150_wheely4_150_150.jpg' = 'wheely-4.jpg'
  'thumb150_Wheely5_150_150.jpg' = 'wheely-5.jpg'
  'thumb150_wheely6_150_150.jpg' = 'wheely-6.jpg'
  'thumb150_wingeria_150x150.jpg' = 'papas-wingeria.jpg'
  'thumb300_MMM_300x300b.jpg' = 'money-movers-maker-large.jpg'
  'fireboy-watergirl.jpg' = 'fireboy-watergirl-classic.jpg'
}

$tempFiles = [System.Collections.Generic.List[object]]::new()
$i = 0

foreach ($entry in $map.GetEnumerator()) {
  $src = Join-Path $gamesDir $entry.Key
  if (-not (Test-Path -LiteralPath $src)) {
    Write-Warning "No existe: $($entry.Key)"
    continue
  }
  $tmp = "__renaming_{0}.jpg" -f $i++
  Rename-Item -LiteralPath $src -NewName $tmp
  $tempFiles.Add([PSCustomObject]@{ Temp = $tmp; Final = $entry.Value }) | Out-Null
}

foreach ($item in $tempFiles) {
  $src = Join-Path $gamesDir $item.Temp
  $dest = Join-Path $gamesDir $item.Final
  if (Test-Path -LiteralPath $dest) {
    Write-Warning "Destino ocupado, queda temporal: $($item.Temp) -> $($item.Final)"
    continue
  }
  Rename-Item -LiteralPath $src -NewName $item.Final
}

$remaining = Get-ChildItem -LiteralPath $gamesDir -Filter '__renaming_*.jpg' -ErrorAction SilentlyContinue
if ($remaining) {
  Write-Warning "Quedaron $($remaining.Count) archivos sin renombrar final (colision)."
}

Write-Host "Listo. Archivos en carpeta: $((Get-ChildItem -LiteralPath $gamesDir -File).Count)"
