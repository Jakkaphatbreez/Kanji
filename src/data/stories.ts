import type { Story } from '@/types/content';

// Sentences/Thai translations ported from this project's pre-Next.js prototype
// (index.html); English translations and comprehension questions are new.
export const stories: Story[] = [
  {
    id: 'tale-ookina-kabu',
    title: 'おおきな かぶ',
    category: 'tale',
    sentences: [
      { jp: 'むかしむかし、おじいさんが　かぶを　うえました。', th: 'กาลครั้งหนึ่ง คุณปู่ปลูกหัวผักกาด', en: 'Once upon a time, grandpa planted a turnip.' },
      {
        jp: '「おおきく、あまく　なれ」と、おじいさんは　いいました。',
        th: 'คุณปู่พูดว่า "โตขึ้น หวานขึ้นนะ"',
        en: 'Grandpa said, "Grow big and sweet."',
      },
      { jp: 'かぶは　とても　おおきく　なりました。', th: 'หัวผักกาดโตขึ้นมากๆ', en: 'The turnip grew very big.' },
      {
        jp: 'おじいさんは　かぶを　ぬこうとしました。でも、ぬけません。',
        th: 'คุณปู่พยายามถอนหัวผักกาด แต่ถอนไม่ออก',
        en: "Grandpa tried to pull out the turnip. But it wouldn't come out.",
      },
      {
        jp: 'おじいさんは　おばあさんを　よびました。ふたりで　ひっぱりました。でも、ぬけません。',
        th: 'คุณปู่เรียกคุณย่ามาช่วย ทั้งสองคนช่วยกันดึง แต่ก็ถอนไม่ออก',
        en: "Grandpa called grandma. The two of them pulled together. But it wouldn't come out.",
      },
      {
        jp: 'おばあさんは　まごを　よびました。さんにんで　ひっぱりました。でも、ぬけません。',
        th: 'คุณย่าเรียกหลานมาช่วย สามคนช่วยกันดึง แต่ก็ยังถอนไม่ออก',
        en: "Grandma called the grandchild. The three of them pulled together. But it still wouldn't come out.",
      },
      {
        jp: 'まごは　いぬを　よびました。よにんと　いっぴきで　ひっぱりました。',
        th: 'หลานเรียกสุนัขมาช่วย สี่คนกับหมาหนึ่งตัวช่วยกันดึง',
        en: 'The grandchild called the dog. Four people and one dog pulled together.',
      },
      {
        jp: 'とうとう、かぶは　ぬけました！みんな　よろこびました。',
        th: 'ในที่สุด หัวผักกาดก็ถอนออกมาได้! ทุกคนดีใจกันมาก',
        en: 'Finally, the turnip came out! Everyone was happy.',
      },
    ],
    questions: [
      {
        questionJp: 'だれが いちばん さいごに よばれましたか。',
        choicesJp: ['おばあさん', 'まご', 'いぬ', 'おじいさん'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'tale-usagi-to-kame',
    title: 'うさぎと かめ',
    category: 'tale',
    sentences: [
      { jp: 'うさぎと　かめが　きょうそうを　しました。', th: 'กระต่ายกับเต่าแข่งวิ่งกัน', en: 'The rabbit and the turtle had a race.' },
      { jp: '「よーい、どん！」ふたりは　はしりました。', th: '"พร้อม ไป!" ทั้งสองวิ่งออกไป', en: '"Ready, go!" The two of them ran.' },
      {
        jp: 'うさぎは　とても　はやかったです。かめは　ゆっくり　あるきました。',
        th: 'กระต่ายวิ่งเร็วมาก ส่วนเต่าเดินไปช้าๆ',
        en: 'The rabbit was very fast. The turtle walked slowly.',
      },
      {
        jp: 'うさぎは　「かめは　おそいから、すこし　ねよう」と　おもいました。',
        th: 'กระต่ายคิดว่า "เต่าช้าอยู่แล้ว นอนพักหน่อยดีกว่า"',
        en: 'The rabbit thought, "The turtle is slow, so I\'ll sleep a little."',
      },
      { jp: 'うさぎは　きの　したで　ねました。', th: 'กระต่ายนอนหลับอยู่ใต้ต้นไม้', en: 'The rabbit slept under a tree.' },
      {
        jp: 'かめは　やすまないで、ずっと　あるきました。',
        th: 'เต่าไม่หยุดพัก เดินไปเรื่อยๆ',
        en: "The turtle didn't rest, and kept walking the whole time.",
      },
      {
        jp: 'うさぎが　おきたとき、かめは　もう　ゴールに　いました。',
        th: 'ตอนที่กระต่ายตื่นขึ้นมา เต่าไปถึงเส้นชัยแล้ว',
        en: 'When the rabbit woke up, the turtle was already at the goal.',
      },
      {
        jp: 'かめが　かちました。うさぎは　とても　おどろきました。',
        th: 'เต่าชนะ กระต่ายตกใจมาก',
        en: 'The turtle won. The rabbit was very surprised.',
      },
    ],
    questions: [
      {
        questionJp: 'うさぎは どこで ねましたか。',
        choicesJp: ['いえ', 'きの した', 'みち', 'やま'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'tale-koneko-no-bouken',
    title: 'こねこの ぼうけん',
    category: 'tale',
    sentences: [
      { jp: 'ちいさい　こねこが　いました。なまえは　ももです。', th: 'มีลูกแมวตัวเล็กๆ ตัวหนึ่ง ชื่อว่าโมโมะ', en: 'There was a small kitten. Its name was Momo.' },
      { jp: 'ある　ひ、ももは　まどから　そとへ　でました。', th: 'วันหนึ่ง โมโมะออกไปข้างนอกทางหน้าต่าง', en: 'One day, Momo went outside through the window.' },
      { jp: 'にわに　きれいな　はなが　たくさん　ありました。', th: 'ในสวนมีดอกไม้สวยๆ อยู่มากมาย', en: 'There were many pretty flowers in the garden.' },
      { jp: 'ももは　ちょうちょうを　おいかけました。', th: 'โมโมะวิ่งไล่ตามผีเสื้อ', en: 'Momo chased a butterfly.' },
      {
        jp: 'でも、みちが　わからなく　なりました。ももは　こまりました。',
        th: 'แต่แล้วก็หลงทาง โมโมะรู้สึกลำบากใจ',
        en: "But then it didn't know the way anymore. Momo was troubled.",
      },
      {
        jp: 'そのとき、おんなのこが　きました。「だいじょうぶ？」と　ききました。',
        th: 'ตอนนั้นเด็กผู้หญิงคนหนึ่งเดินมาถามว่า "ไม่เป็นไรใช่ไหม"',
        en: 'At that moment, a girl came. She asked, "Are you okay?"',
      },
      { jp: 'おんなのこは　ももを　いえまで　つれて　いきました。', th: 'เด็กผู้หญิงพาโมโมะกลับบ้าน', en: 'The girl took Momo home.' },
      { jp: 'ももの　かぞくは　とても　よろこびました。', th: 'ครอบครัวของโมโมะดีใจกันมาก', en: "Momo's family was very happy." },
    ],
    questions: [
      {
        questionJp: 'ももは なにを おいかけましたか。',
        choicesJp: ['とり', 'ちょうちょう', 'ねこ', 'いぬ'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'tale-ari-to-kirigirisu',
    title: 'アリと キリギリス',
    category: 'tale',
    sentences: [
      {
        jp: 'なつ、アリたちは　まいにち　はたらいて、たべものを　あつめました。',
        th: 'ฤดูร้อน มดตัวเล็กๆ ทำงานเก็บอาหารทุกวัน',
        en: 'In summer, the ants worked every day and gathered food.',
      },
      {
        jp: 'キリギリスは　うたを　うたって、あそんでばかり　いました。',
        th: 'ตั๊กแตนได้แต่ร้องเพลงเล่นสนุกทั้งวัน',
        en: 'The grasshopper sang songs and just played all the time.',
      },
      {
        jp: '「なつは　あそんで、ふゆは　どうするの？」と、アリは　ききました。',
        th: 'มดถามว่า "เล่นทั้งฤดูร้อน แล้วฤดูหนาวจะทำยังไงล่ะ"',
        en: 'The ant asked, "You play all summer — what will you do in winter?"',
      },
      {
        jp: 'キリギリスは　「しんぱいしないで」と　わらいました。',
        th: 'ตั๊กแตนหัวเราะแล้วบอกว่า "ไม่ต้องห่วงหรอก"',
        en: 'The grasshopper laughed and said, "Don\'t worry."',
      },
      { jp: 'ふゆに　なりました。ゆきが　たくさん　ふりました。', th: 'ฤดูหนาวมาถึง หิมะตกลงมามากมาย', en: 'Winter came. A lot of snow fell.' },
      {
        jp: 'キリギリスは　たべものが　なくて、こまりました。',
        th: 'ตั๊กแตนไม่มีอาหารกิน ลำบากใจมาก',
        en: 'The grasshopper had no food and was in trouble.',
      },
      {
        jp: 'アリの　いえへ　いって、たべものを　おねがいしました。',
        th: 'จึงไปที่บ้านมดเพื่อขอแบ่งอาหาร',
        en: "It went to the ants' house and asked for some food.",
      },
      { jp: 'アリたちは　やさしく　たべものを　わけて　あげました。', th: 'มดใจดีแบ่งอาหารให้', en: 'The ants kindly shared their food.' },
    ],
    questions: [
      {
        questionJp: 'なつ、キリギリスは なにを して いましたか。',
        choicesJp: ['はたらいて いました', 'たべものを あつめて いました', 'うたを うたって いました', 'ねむって いました'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'tale-kin-no-tamago',
    title: 'きんの たまごの にわとり',
    category: 'tale',
    sentences: [
      { jp: 'あるところに、まずしい　ふうふが　いました。', th: 'กาลครั้งหนึ่ง มีคู่สามีภรรยาที่ยากจนอยู่คู่หนึ่ง', en: 'Once upon a time, there was a poor couple.' },
      { jp: 'ふたりは　にわとりを　いっぴき　かっていました。', th: 'ทั้งสองเลี้ยงไก่อยู่ตัวหนึ่ง', en: 'The two of them kept one chicken.' },
      { jp: 'ある　あさ、にわとりは　きんの　たまごを　うみました。', th: 'เช้าวันหนึ่ง ไก่ออกไข่เป็นทองคำ', en: 'One morning, the chicken laid a golden egg.' },
      { jp: 'ふうふは　とても　おどろいて、よろこびました。', th: 'ทั้งสองประหลาดใจและดีใจมาก', en: 'The couple was very surprised and happy.' },
      {
        jp: 'まいにち　いちにち　いっこ、きんの　たまごが　うまれました。',
        th: 'ทุกวันไก่จะออกไข่ทองคำวันละหนึ่งฟอง',
        en: 'Every day, one golden egg was born.',
      },
      { jp: '「もっと　たくさん　ほしい」と、おっとは　おもいました。', th: 'สามีคิดว่า "อยากได้เยอะกว่านี้อีก"', en: 'The husband thought, "I want a lot more."' },
      {
        jp: 'おっとは　にわとりの　おなかを　きりました。でも、なかには　なにも　ありませんでした。',
        th: 'สามีจึงผ่าท้องไก่ดู แต่ในท้องกลับไม่มีอะไรเลย',
        en: "The husband cut open the chicken's stomach. But there was nothing inside.",
      },
      {
        jp: 'にわとりは　しんで、きんの　たまごも　もう　もらえませんでした。',
        th: 'ไก่ตายลง และไม่ได้ไข่ทองคำอีกต่อไป',
        en: "The chicken died, and they couldn't get golden eggs anymore.",
      },
    ],
    questions: [
      {
        questionJp: 'にわとりは いちにちに なんこ たまごを うみましたか。',
        choicesJp: ['いっこ', 'にこ', 'さんこ', 'ぜんぜん うみませんでした'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'tale-ookami-ga-kita',
    title: 'おおかみが きた',
    category: 'tale',
    sentences: [
      {
        jp: 'ひつじかいの　こどもは、まいにち　やまで　ひつじを　みていました。',
        th: 'เด็กเลี้ยงแกะเฝ้าดูแกะบนภูเขาทุกวัน',
        en: 'The shepherd boy watched the sheep on the mountain every day.',
      },
      { jp: 'しごとは　たいくつでした。', th: 'งานนี้น่าเบื่อมาก', en: 'The work was boring.' },
      { jp: 'こどもは　「おおかみが　きた！」と　うそを　つきました。', th: 'เด็กจึงโกหกว่า "หมาป่ามาแล้ว!"', en: 'The boy lied, "A wolf came!"' },
      {
        jp: 'むらの　ひとたちは　びっくりして、はしって　きました。でも、おおかみは　いませんでした。',
        th: 'ชาวบ้านตกใจวิ่งมาช่วย แต่ไม่มีหมาป่าจริงๆ',
        en: 'The villagers were surprised and came running. But there was no wolf.',
      },
      { jp: 'こどもは　また　「おおかみが　きた！」と　うそを　つきました。', th: 'เด็กโกหกอีกครั้งว่า "หมาป่ามาแล้ว!"', en: 'The boy lied again, "A wolf came!"' },
      { jp: 'むらの　ひとたちは　また　だまされました。', th: 'ชาวบ้านถูกหลอกอีกครั้ง', en: 'The villagers were fooled again.' },
      { jp: 'ある　ひ、ほんとうに　おおかみが　きました。', th: 'วันหนึ่ง หมาป่าตัวจริงก็มา', en: 'One day, a wolf really came.' },
      {
        jp: 'こどもは　「たすけて！」と　さけびました。でも、だれも　きませんでした。',
        th: 'เด็กร้องขอความช่วยเหลือ แต่ไม่มีใครมาช่วยเลย',
        en: 'The boy shouted, "Help!" But no one came.',
      },
    ],
    questions: [
      {
        questionJp: 'さいごに、むらの ひとたちは きましたか。',
        choicesJp: ['きました', 'きませんでした', 'いぬが きました', 'おおかみが きました'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'tale-sanbiki-no-kobuta',
    title: '三びきの こぶた',
    category: 'tale',
    sentences: [
      { jp: '三びきの　こぶたが、じぶんの　いえを　つくりました。', th: 'ลูกหมูสามตัวสร้างบ้านของตัวเอง', en: 'Three little pigs built their own houses.' },
      { jp: 'いちばんめの　こぶたは、わらで　いえを　つくりました。', th: 'ลูกหมูตัวแรกสร้างบ้านด้วยฟาง', en: 'The first pig built a house of straw.' },
      { jp: 'にばんめの　こぶたは、きで　いえを　つくりました。', th: 'ลูกหมูตัวที่สองสร้างบ้านด้วยไม้', en: 'The second pig built a house of wood.' },
      {
        jp: 'さんばんめの　こぶたは、れんがで　いえを　つくりました。じかんが　かかりました。',
        th: 'ลูกหมูตัวที่สามสร้างบ้านด้วยอิฐ ใช้เวลานาน',
        en: 'The third pig built a house of bricks. It took time.',
      },
      { jp: 'おおかみが　きて、わらの　いえを　ふきとばしました。', th: 'หมาป่ามาเป่าบ้านฟางจนพังทลาย', en: 'The wolf came and blew away the straw house.' },
      { jp: 'おおかみは　きの　いえも　ふきとばしました。', th: 'หมาป่าเป่าบ้านไม้จนพังเช่นกัน', en: 'The wolf also blew away the wooden house.' },
      { jp: '三びきは、れんがの　いえに　にげました。', th: 'ลูกหมูทั้งสามตัวหนีไปที่บ้านอิฐ', en: 'The three pigs ran away to the brick house.' },
      {
        jp: 'おおかみは　れんがの　いえを　こわせませんでした。三びきは　あんしんしました。',
        th: 'หมาป่าไม่สามารถทำลายบ้านอิฐได้ ลูกหมูทั้งสามจึงปลอดภัย',
        en: "The wolf couldn't destroy the brick house. The three pigs felt safe.",
      },
    ],
    questions: [
      {
        questionJp: 'さんばんめの こぶたの いえは なにで できて いましたか。',
        choicesJp: ['わら', 'き', 'れんが', 'かみ'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'tale-nezumi-no-yomeiri',
    title: 'ねずみの よめいり',
    category: 'tale',
    sentences: [
      {
        jp: 'ねずみの　おやは、むすめに　いちばん　つよい　ひとと　けっこんさせたいと　おもいました。',
        th: 'พ่อแม่หนูอยากให้ลูกสาวแต่งงานกับคนที่แข็งแกร่งที่สุด',
        en: 'The mouse parents wanted their daughter to marry the strongest person.',
      },
      {
        jp: '「たいようは　いちばん　つよいですか」と、たいように　ききました。',
        th: 'จึงถามพระอาทิตย์ว่า "คุณแข็งแกร่งที่สุดใช่ไหม"',
        en: 'They asked the sun, "Are you the strongest?"',
      },
      {
        jp: 'たいようは　「くもの　ほうが　つよいです。わたしを　かくします」と　いいました。',
        th: 'พระอาทิตย์ตอบว่า "เมฆแข็งแกร่งกว่า มันบดบังฉันได้"',
        en: 'The sun said, "The cloud is stronger. It can hide me."',
      },
      { jp: 'くもは　「かぜの　ほうが　つよいです」と　いいました。', th: 'เมฆบอกว่า "ลมแข็งแกร่งกว่า"', en: 'The cloud said, "The wind is stronger."' },
      {
        jp: 'かぜは　「かべの　ほうが　つよいです。わたしは　かべを　こえられません」と　いいました。',
        th: 'ลมบอกว่า "กำแพงแข็งแกร่งกว่า ฉันข้ามกำแพงไม่ได้"',
        en: 'The wind said, "The wall is stronger. I cannot cross the wall."',
      },
      {
        jp: 'かべは　「ねずみの　ほうが　つよいです。ねずみは　わたしに　あなを　あけます」と　いいました。',
        th: 'กำแพงบอกว่า "หนูแข็งแกร่งกว่า มันเจาะรูในตัวฉันได้"',
        en: 'The wall said, "The mouse is stronger. A mouse can make a hole in me."',
      },
      {
        jp: 'ねずみの　おやは、けっきょく　ねずみの　おむこさんを　えらびました。',
        th: 'สุดท้ายพ่อแม่หนูก็เลือกเจ้าบ่าวที่เป็นหนูเหมือนเดิม',
        en: 'In the end, the mouse parents chose a mouse groom after all.',
      },
      { jp: 'むすめは　しあわせに　くらしました。', th: 'ลูกสาวใช้ชีวิตอย่างมีความสุข', en: 'The daughter lived happily.' },
    ],
    questions: [
      {
        questionJp: 'かべは だれが いちばん つよいと いいましたか。',
        choicesJp: ['たいよう', 'くも', 'かぜ', 'ねずみ'],
        correctIndex: 3,
      },
    ],
  },
  {
    id: 'tale-shitakiri-suzume',
    title: 'したきり すずめ',
    category: 'tale',
    sentences: [
      { jp: 'やさしい　おじいさんは、すずめを　かわいがっていました。', th: 'คุณปู่ใจดีเลี้ยงนกกระจอกด้วยความรัก', en: 'The kind grandpa loved a sparrow dearly.' },
      { jp: 'いじわるな　おばあさんは、すずめが　きらいでした。', th: 'คุณย่าใจร้ายไม่ชอบนกกระจอกตัวนั้น', en: "The mean grandma didn't like the sparrow." },
      { jp: 'ある　ひ、すずめは　のりを　たべて　しまいました。', th: 'วันหนึ่ง นกกระจอกกินแป้งเปียกของคุณย่าไป', en: "One day, the sparrow ate up grandma's starch paste." },
      {
        jp: 'おばあさんは　おこって、すずめの　したを　きって　しまいました。',
        th: 'คุณย่าโกรธมากจนตัดลิ้นนกกระจอกทิ้ง',
        en: "Grandma got angry and cut off the sparrow's tongue.",
      },
      {
        jp: 'すずめは　やまへ　にげました。おじいさんは　しんぱいしました。',
        th: 'นกกระจอกหนีไปที่ภูเขา คุณปู่เป็นห่วงมาก',
        en: 'The sparrow ran away to the mountain. Grandpa was worried.',
      },
      { jp: 'おじいさんは　やまへ　いって、すずめを　さがしました。', th: 'คุณปู่จึงเดินทางขึ้นภูเขาเพื่อตามหานกกระจอก', en: 'Grandpa went to the mountain to look for the sparrow.' },
      {
        jp: 'すずめの　いえで、おじいさんは　あたたかく　むかえられました。',
        th: 'ที่บ้านนกกระจอก คุณปู่ได้รับการต้อนรับอย่างอบอุ่น',
        en: "At the sparrow's house, grandpa was warmly welcomed.",
      },
      {
        jp: 'おじいさんは　おみやげに、ちいさくて　かるい　はこを　もらいました。',
        th: 'คุณปู่ได้รับกล่องของฝากใบเล็กที่เบามาก',
        en: 'Grandpa received a small, light box as a gift.',
      },
    ],
    questions: [
      {
        questionJp: 'だれが すずめの したを きりましたか。',
        choicesJp: ['おじいさん', 'おばあさん', 'むすめ', 'いぬ'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'tale-urashima-taro',
    title: 'うらしまたろう',
    category: 'tale',
    sentences: [
      {
        jp: 'うらしまたろうは、うみで　こどもたちに　いじめられている　かめを　たすけました。',
        th: 'อุราชิมะทาโร่ช่วยเต่าที่ถูกเด็กๆ รังแกอยู่ที่ชายทะเล',
        en: 'Urashima Taro saved a turtle that children were bullying at the sea.',
      },
      {
        jp: 'かめは　「おれいに、りゅうぐうじょうへ　あんないします」と　いいました。',
        th: 'เต่าบอกว่า "ขอพาไปวังใต้ทะเลเพื่อตอบแทนบุญคุณ"',
        en: 'The turtle said, "As thanks, I will guide you to the Dragon Palace."',
      },
      {
        jp: 'たろうは　かめの　せなかに　のって、うみの　そこへ　いきました。',
        th: 'ทาโร่ขึ้นไปนั่งบนหลังเต่าและดำดิ่งลงไปใต้ทะเล',
        en: "Taro rode on the turtle's back and went to the bottom of the sea.",
      },
      {
        jp: 'りゅうぐうじょうで、おとひめさまが　たろうを　もてなしました。',
        th: 'ที่วังใต้ทะเล เจ้าหญิงโอโตฮิเมะต้อนรับทาโร่อย่างดี',
        en: 'At the Dragon Palace, Princess Otohime welcomed Taro.',
      },
      { jp: 'たろうは　たのしい　じかんを　すごしました。', th: 'ทาโร่ใช้เวลาอย่างมีความสุข', en: 'Taro spent an enjoyable time.' },
      {
        jp: 'でも、いえが　こいしく　なりました。かえる　ことに　しました。',
        th: 'แต่แล้วก็คิดถึงบ้าน จึงตัดสินใจกลับ',
        en: 'But he began to miss home. He decided to go back.',
      },
      {
        jp: 'おとひめさまは、あけては　いけない　はこを　くれました。',
        th: 'เจ้าหญิงมอบกล่องที่ห้ามเปิดให้',
        en: 'The princess gave him a box that must not be opened.',
      },
      {
        jp: 'たろうが　はこを　あけると、けむりが　でて、おじいさんに　なりました。',
        th: 'พอทาโร่เปิดกล่อง ควันก็พวยพุ่งออกมา และเขาก็กลายเป็นชายชรา',
        en: 'When Taro opened the box, smoke came out, and he became an old man.',
      },
    ],
    questions: [
      {
        questionJp: 'たろうは うみの そこで だれに あいましたか。',
        choicesJp: ['かめ', 'おとひめさま', 'おじいさん', 'いぬ'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'daily-tanaka-no-ichinichi',
    title: 'たなかさんの いちにち',
    category: 'daily',
    sentences: [
      { jp: 'たなかさんは　まいあさ　六時に　おきます。', th: 'คุณทานากะตื่นนอนตอนหกโมงเช้าทุกวัน', en: 'Mr. Tanaka wakes up at six oʼclock every morning.' },
      { jp: 'かおを　あらって、あさごはんを　たべます。', th: 'ล้างหน้าแล้วกินข้าวเช้า', en: 'He washes his face and eats breakfast.' },
      { jp: '七時半に　いえを　でて、かいしゃへ　いきます。', th: 'ออกจากบ้านตอนเจ็ดโมงครึ่ง ไปทำงานที่บริษัท', en: 'He leaves home at 7:30 and goes to the company.' },
      {
        jp: 'かいしゃで　しごとを　して、じゅうにじに　ひるごはんを　たべます。',
        th: 'ทำงานที่บริษัทแล้วกินข้าวเที่ยงตอนเที่ยงวัน',
        en: 'He works at the company and eats lunch at twelve oʼclock.',
      },
      { jp: 'ごごも　しごとを　して、ごじに　おわります。', th: 'ตอนบ่ายก็ทำงานต่อ และเลิกงานตอนห้าโมงเย็น', en: 'He works in the afternoon too, and finishes at five oʼclock.' },
      { jp: 'かえりに、スーパーで　かいものを　します。', th: 'ระหว่างทางกลับบ้าน แวะซื้อของที่ซูเปอร์มาร์เก็ต', en: 'On the way home, he shops at the supermarket.' },
      { jp: 'いえで　ばんごはんを　たべて、テレビを　みます。', th: 'กินข้าวเย็นที่บ้านแล้วดูโทรทัศน์', en: 'He eats dinner at home and watches TV.' },
      { jp: 'じゅういちじに　ねます。', th: 'เข้านอนตอนสี่ทุ่ม', en: 'He goes to sleep at eleven oʼclock.' },
    ],
    questions: [
      {
        questionJp: 'たなかさんは なんじに おきますか。',
        choicesJp: ['六じ', '七じはん', '十二じ', '五じ'],
        correctIndex: 0,
      },
      {
        questionJp: 'たなかさんは かえりに どこで かいものを しますか。',
        choicesJp: ['かいしゃ', 'がっこう', 'スーパー', 'としょかん'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'daily-ame-no-hi',
    title: 'あめの ひ',
    category: 'daily',
    sentences: [
      { jp: 'きょうは　あさから　あめでした。', th: 'วันนี้ฝนตกตั้งแต่เช้า', en: 'Today it rained from the morning.' },
      { jp: 'わたしは　かさを　もって、がっこうへ　いきました。', th: 'ฉันถือร่มไปโรงเรียน', en: 'I took an umbrella and went to school.' },
      { jp: 'みちで　ともだちに　あいました。', th: 'ระหว่างทางเจอเพื่อน', en: 'I met a friend on the way.' },
      {
        jp: 'ともだちは　かさを　わすれました。だから、いっしょに　はいりました。',
        th: 'เพื่อนลืมเอาร่มมา เลยเข้าร่มด้วยกัน',
        en: 'My friend forgot their umbrella. So we went in together.',
      },
      { jp: 'がっこうに　ついたとき、くつが　ぬれていました。', th: 'พอถึงโรงเรียน รองเท้าก็เปียกไปหมด', en: 'When I arrived at school, my shoes were wet.' },
      { jp: 'ごごに　なると、あめは　やみました。', th: 'พอถึงตอนบ่าย ฝนก็หยุดตก', en: 'In the afternoon, the rain stopped.' },
      { jp: 'そらに　にじが　でました。とても　きれいでした。', th: 'มีสายรุ้งปรากฏบนท้องฟ้า สวยงามมาก', en: 'A rainbow appeared in the sky. It was very beautiful.' },
    ],
    questions: [
      {
        questionJp: 'ともだちは なにを わすれましたか。',
        choicesJp: ['かさ', 'くつ', 'ほん', 'かばん'],
        correctIndex: 0,
      },
      {
        questionJp: 'あめは いつ やみましたか。',
        choicesJp: ['あさ', 'ひるまえ', 'ごご', 'よる'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'daily-shuumatsu-no-sugoshikata',
    title: 'しゅうまつの すごしかた',
    category: 'daily',
    sentences: [
      { jp: 'どようびの　あさ、わたしは　おそくまで　ねます。', th: 'เช้าวันเสาร์ ฉันนอนตื่นสาย', en: 'On Saturday morning, I sleep in late.' },
      { jp: '十じに　おきて、ゆっくり　あさごはんを　たべます。', th: 'ตื่นตอนสิบโมงแล้วกินข้าวเช้าอย่างสบายๆ', en: 'I wake up at ten and eat breakfast slowly.' },
      { jp: 'ごごは、こうえんで　さんぽを　します。', th: 'ตอนบ่ายไปเดินเล่นที่สวนสาธารณะ', en: 'In the afternoon, I take a walk in the park.' },
      { jp: 'ときどき、ともだちと　えいがを　みに　いきます。', th: 'บางครั้งก็ไปดูหนังกับเพื่อน', en: 'Sometimes I go to watch a movie with a friend.' },
      { jp: 'にちようびは、へやを　そうじして、せんたくを　します。', th: 'วันอาทิตย์ทำความสะอาดห้องและซักผ้า', en: 'On Sunday, I clean my room and do laundry.' },
      { jp: 'よるは、ほんを　よんで、はやく　ねます。', th: 'ตอนกลางคืนอ่านหนังสือแล้วเข้านอนแต่หัว', en: 'At night, I read a book and go to bed early.' },
      { jp: 'しゅうまつは、いつも　たのしいです。', th: 'วันหยุดสุดสัปดาห์มีความสุขเสมอ', en: 'Weekends are always fun.' },
    ],
    questions: [
      {
        questionJp: 'どようびの あさ、なんじに おきますか。',
        choicesJp: ['七じ', '八じ', '九じ', '十じ'],
        correctIndex: 3,
      },
      {
        questionJp: 'にちようびは なにを しますか。',
        choicesJp: ['えいがを みます', 'そうじと せんたくを します', 'こうえんで あそびます', 'かいものを します'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'daily-super-de-kaimono',
    title: 'スーパーで かいもの',
    category: 'daily',
    sentences: [
      { jp: 'ゆうがた、わたしは　スーパーへ　いきました。', th: 'ตอนเย็น ฉันไปที่ซูเปอร์มาร์เก็ต', en: 'In the evening, I went to the supermarket.' },
      { jp: 'やさいと　にくと　たまごを　かいました。', th: 'ซื้อผัก เนื้อ และไข่', en: 'I bought vegetables, meat, and eggs.' },
      { jp: 'くだものも　かいたかったですが、たかかったです。', th: 'อยากซื้อผลไม้ด้วย แต่ราคาแพงไป', en: 'I wanted to buy fruit too, but it was expensive.' },
      { jp: 'レジで、ながい　れつが　できていました。', th: 'ที่จุดชำระเงินมีคิวยาวมาก', en: 'There was a long line at the register.' },
      { jp: '二十ぷん　まちました。', th: 'รอไปประมาณยี่สิบนาที', en: 'I waited about twenty minutes.' },
      { jp: 'おかねを　はらって、ふくろに　いれました。', th: 'จ่ายเงินแล้วใส่ของลงถุง', en: 'I paid and put the things in a bag.' },
      { jp: 'いえに　かえって、りょうりを　つくりました。', th: 'กลับบ้านแล้วทำอาหาร', en: 'I went home and cooked.' },
    ],
    questions: [
      {
        questionJp: 'なぜ くだものを かいませんでしたか。',
        choicesJp: ['おいしくなかったから', 'たかかったから', 'なかったから', 'きらいだから'],
        correctIndex: 1,
      },
      {
        questionJp: 'レジで どのくらい まちましたか。',
        choicesJp: ['十ぷん', 'に十ぷん', '三十ぷん', 'いちじかん'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'daily-byouin-e-ikimashita',
    title: 'びょういんへ いきました',
    category: 'daily',
    sentences: [
      { jp: 'きのう、あたまが　いたかったです。', th: 'เมื่อวานปวดหัวมาก', en: 'Yesterday, I had a bad headache.' },
      { jp: 'ねつも　すこし　ありました。', th: 'มีไข้เล็กน้อยด้วย', en: 'I also had a slight fever.' },
      { jp: 'だから、びょういんへ　いきました。', th: 'เลยไปโรงพยาบาล', en: 'So I went to the hospital.' },
      { jp: 'いしゃは、かぜですと　いいました。', th: 'หมอบอกว่าเป็นหวัด', en: 'The doctor said it was a cold.' },
      { jp: 'くすりを　もらって、いえで　やすみました。', th: 'ได้ยามาแล้วก็พักผ่อนที่บ้าน', en: 'I got medicine and rested at home.' },
      { jp: '三日　やすんで、げんきに　なりました。', th: 'พักสามวันก็หายเป็นปกติ', en: 'After resting for three days, I felt fine.' },
      { jp: 'きょうから　また　がっこうへ　いきます。', th: 'ตั้งแต่วันนี้กลับไปโรงเรียนได้แล้ว', en: "From today, I'm going back to school again." },
    ],
    questions: [
      {
        questionJp: 'いしゃは なんと いいましたか。',
        choicesJp: ['かぜです', 'びょうきじゃないです', 'たいへんです', 'げんきです'],
        correctIndex: 0,
      },
      {
        questionJp: 'なんにち やすみましたか。',
        choicesJp: ['いちにち', 'ふつか', 'みっか', 'よっか'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'daily-tanjoubi-party',
    title: 'たんじょうびパーティー',
    category: 'daily',
    sentences: [
      { jp: 'きょうは、ともだちの　たんじょうびです。', th: 'วันนี้เป็นวันเกิดของเพื่อน', en: "Today is my friend's birthday." },
      { jp: 'わたしたちは、いえで　パーティーを　しました。', th: 'พวกเราจัดปาร์ตี้ที่บ้าน', en: 'We had a party at home.' },
      { jp: 'ケーキと　ジュースを　よういしました。', th: 'เตรียมเค้กและน้ำผลไม้ไว้', en: 'We prepared cake and juice.' },
      { jp: 'みんなで　「おめでとう」と　いいました。', th: 'ทุกคนพูดว่า "สุขสันต์วันเกิด" พร้อมกัน', en: 'Everyone said "Happy birthday!" together.' },
      { jp: 'ともだちは、プレゼントを　もらって　よろこびました。', th: 'เพื่อนได้รับของขวัญแล้วดีใจมาก', en: 'My friend received a present and was happy.' },
      { jp: 'おんがくを　きいて、たくさん　わらいました。', th: 'ฟังเพลงและหัวเราะกันเยอะมาก', en: 'We listened to music and laughed a lot.' },
      { jp: 'とても　たのしい　よるでした。', th: 'เป็นคืนที่สนุกมาก', en: 'It was a very fun night.' },
    ],
    questions: [
      {
        questionJp: 'みんなで なにを よういしましたか。',
        choicesJp: ['プレゼントと ほん', 'ケーキと ジュース', 'りょうりと おちゃ', 'はなと しゃしん'],
        correctIndex: 1,
      },
      {
        questionJp: 'ともだちは なにを もらって よろこびましたか。',
        choicesJp: ['ケーキ', 'おんがく', 'プレゼント', 'ジュース'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'daily-gakkou-no-ichinichi',
    title: 'がっこうの いちにち',
    category: 'daily',
    sentences: [
      { jp: 'わたしは　まいあさ　八じに　がっこうへ　いきます。', th: 'ฉันไปโรงเรียนตอนแปดโมงเช้าทุกวัน', en: 'I go to school at eight oʼclock every morning.' },
      { jp: '一じかんめは、にほんごの　じゅぎょうです。', th: 'คาบแรกเป็นวิชาภาษาญี่ปุ่น', en: "The first period is Japanese class." },
      { jp: 'ひるやすみに、ともだちと　おべんとうを　たべます。', th: 'พักเที่ยงกินข้าวกล่องกับเพื่อน', en: 'At lunch break, I eat a boxed lunch with a friend.' },
      { jp: 'ごごは、すうがくと　たいいくが　あります。', th: 'ตอนบ่ายมีวิชาคณิตศาสตร์และพลศึกษา', en: 'In the afternoon, there is math and P.E.' },
      { jp: 'じゅぎょうの　あとで、としょかんで　べんきょうします。', th: 'หลังเลิกเรียนอ่านหนังสือที่ห้องสมุด', en: 'After class, I study at the library.' },
      { jp: '三じに、いえへ　かえります。', th: 'กลับบ้านตอนบ่ายสามโมง', en: 'I go home at three oʼclock.' },
      { jp: 'まいにち　いそがしいですが、たのしいです。', th: 'ทุกวันยุ่งมาก แต่ก็สนุกดี', en: 'Every day is busy, but fun.' },
    ],
    questions: [
      {
        questionJp: '一じかんめは なんの じゅぎょうですか。',
        choicesJp: ['すうがく', 'たいいく', 'にほんご', 'としょかん'],
        correctIndex: 2,
      },
      {
        questionJp: 'なんじに いえへ かえりますか。',
        choicesJp: ['一じ', '二じ', '三じ', '四じ'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'daily-ryokou-no-keikaku',
    title: 'りょこうの けいかく',
    category: 'daily',
    sentences: [
      { jp: 'らいげつ、かぞくで　りょこうに　いきます。', th: 'เดือนหน้าจะไปเที่ยวกับครอบครัว', en: "Next month, I'm going on a trip with my family." },
      { jp: 'ばしょは、うみの　ちかくの　まちです。', th: 'สถานที่คือเมืองใกล้ทะเล', en: 'The place is a town near the sea.' },
      { jp: 'でんしゃで　三じかん　かかります。', th: 'นั่งรถไฟใช้เวลาสามชั่วโมง', en: 'It takes three hours by train.' },
      { jp: 'ホテルは、もう　よやくしました。', th: 'จองโรงแรมไว้เรียบร้อยแล้ว', en: 'We already booked the hotel.' },
      {
        jp: 'うみで　およいだり、さかなを　たべたり　したいです。',
        th: 'อยากว่ายน้ำทะเลและกินปลาสดๆ',
        en: 'I want to swim in the sea and eat fresh fish.',
      },
      { jp: 'かぞく　みんな、とても　たのしみに　しています。', th: 'ทุกคนในครอบครัวตั้งตารอกันมาก', en: 'Everyone in the family is really looking forward to it.' },
      { jp: 'はやく　らいげつに　ならないかなと　おもいます。', th: 'อยากให้ถึงเดือนหน้าเร็วๆ จัง', en: 'I wish next month would come soon.' },
    ],
    questions: [
      {
        questionJp: 'でんしゃで どのくらい かかりますか。',
        choicesJp: ['一じかん', '二じかん', '三じかん', '四じかん'],
        correctIndex: 2,
      },
      {
        questionJp: 'ホテルは もう よやくしましたか。',
        choicesJp: ['よやくしました', 'よやくしませんでした', 'よやくする よていです', 'わかりません'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'daily-atarashii-tomodachi',
    title: 'あたらしい ともだち',
    category: 'daily',
    sentences: [
      { jp: '新学期、クラスに　あたらしい　がくせいが　きました。', th: 'เปิดเทอมใหม่ มีนักเรียนใหม่เข้ามาในห้อง', en: 'At the start of the new term, a new student came to class.' },
      { jp: 'なまえは　ゆきさんです。すこし　はずかしそうでした。', th: 'ชื่อยูกิ ดูเขินอายเล็กน้อย', en: 'Her name is Yuki. She looked a little shy.' },
      {
        jp: 'わたしは　「いっしょに　たべませんか」と　こえを　かけました。',
        th: 'ฉันชวนว่า "ทานข้าวด้วยกันไหม"',
        en: 'I called out, "Won\'t you eat with me?"',
      },
      { jp: 'ゆきさんは、うれしそうに　「はい」と　こたえました。', th: 'ยูกิตอบอย่างดีใจว่า "ค่ะ"', en: 'Yuki answered happily, "Yes."' },
      {
        jp: 'ふたりで　はなしたら、おなじ　おんがくが　すきでした。',
        th: 'พอได้คุยกันก็พบว่าชอบเพลงแนวเดียวกัน',
        en: 'When we talked, we found we liked the same music.',
      },
      { jp: 'いまでは、まいにち　いっしょに　がっこうへ　いきます。', th: 'ตอนนี้ไปโรงเรียนด้วยกันทุกวัน', en: 'Now, we go to school together every day.' },
      { jp: 'あたらしい　ともだちが　できて、うれしいです。', th: 'ดีใจที่ได้เพื่อนใหม่', en: "I'm happy to have made a new friend." },
    ],
    questions: [
      {
        questionJp: 'あたらしい がくせいの なまえは なんですか。',
        choicesJp: ['もも', 'ゆき', 'たなか', 'たろう'],
        correctIndex: 1,
      },
      {
        questionJp: 'ふたりは なにが おなじでしたか。',
        choicesJp: ['たべもの', 'おんがく', 'がっこう', 'たんじょうび'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'daily-toshokan-de-benkyou',
    title: 'としょかんで べんきょう',
    category: 'daily',
    sentences: [
      { jp: 'テストの　まえ、わたしは　としょかんへ　いきます。', th: 'ก่อนสอบฉันมักไปห้องสมุด', en: 'Before a test, I usually go to the library.' },
      { jp: 'としょかんは、しずかで　べんきょうしやすいです。', th: 'ห้องสมุดเงียบสงบเหมาะกับการอ่านหนังสือ', en: 'The library is quiet and easy to study in.' },
      {
        jp: '三じかん、にほんごの　ぶんぽうを　べんきょうしました。',
        th: 'อ่านไวยากรณ์ภาษาญี่ปุ่นอยู่สามชั่วโมง',
        en: 'I studied Japanese grammar for three hours.',
      },
      { jp: 'つかれたので、すこし　やすみました。', th: 'พอเหนื่อยก็พักสักครู่', en: 'Since I got tired, I rested a little.' },
      { jp: 'としょかんで、おもしろい　ほんも　みつけました。', th: 'ระหว่างนั้นก็เจอหนังสือที่น่าสนใจเล่มหนึ่ง', en: 'At the library, I also found an interesting book.' },
      { jp: 'かえるまえに、ほんを　二さつ　かりました。', th: 'ก่อนกลับยืมหนังสือมาสองเล่ม', en: 'Before going home, I borrowed two books.' },
      { jp: 'あした、また　としょかんへ　いくつもりです。', th: 'พรุ่งนี้ตั้งใจว่าจะไปห้องสมุดอีก', en: 'Tomorrow, I plan to go to the library again.' },
    ],
    questions: [
      {
        questionJp: 'としょかんで なんじかん べんきょうしましたか。',
        choicesJp: ['一じかん', '二じかん', '三じかん', '四じかん'],
        correctIndex: 2,
      },
      {
        questionJp: 'ほんを なんさつ かりましたか。',
        choicesJp: ['一さつ', '二さつ', '三さつ', 'かりませんでした'],
        correctIndex: 1,
      },
    ],
  },
];
