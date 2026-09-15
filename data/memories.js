// PUBLIC CONTENT FILE — keep private photos, videos and intimate details in Notion Private Space.
// Photos: assets/images/   Videos: assets/videos/   Music: assets/audio/

const memories = [];

const videos = [];

const timeline = [
 {date:"17 FEB 2026 · 12:00 AM",title:"The moment I asked you to be mine.",text:"At midnight, on your chats, I asked you to be mine. I still love thinking about how our story officially began with those late-night messages."},
 {date:"17 FEB 2026 · AFTERNOON",title:"Our first date.",text:"Later that same day, we went to Mantri Square Mall for our first date. Our first proper day together — and one I will always remember."},
 {date:"THE FIRST MEETING",title:"I almost forgot you.",text:"One day after college, I met you through a common friend who introduced us. I didn't notice anything that day, and somehow I even forgot your name. Then I went back to my hometown for a week."},
 {date:"15–20 DAYS LATER",title:"Then I started noticing you.",text:"When I came back, I started seeing you frequently around college. We kept making eye contact, and I had this strange feeling that I knew you. One day I finally walked up and asked, 'Do I know you?' — and somehow I even told you the wrong name."},
 {date:"AFTER THAT",title:"And then there was us.",text:"That awkward question became the beginning of our conversations. We started texting, slowly became each other's comfortable person, and began making little memories together — ISKCON, random ice cream trips, Corner House and all the ordinary moments that became special because they were with you."},
 {date:"FIRST WEEK OF MARCH",title:"The calls got longer.",text:"After your exams, you went home and somehow we ended up spending almost 12 hours on call. That was also when we started video calling for the first time."},
 {date:"09 MAR 2026",title:"The first photo.",text:"The first time you sent me a photo of yourself. You were wearing that grey T-shirt, and I remember thinking just how cute you looked."},
 {date:"13 MAR 2026",title:"Our first kiss.",text:"I came to your hostel and we went somewhere together. Then you gently gave me a little kiss on my cheek. I was completely surprised and ridiculously happy. After that, I just couldn't stop wanting to kiss you."},
 {date:"25 MAR 2026",title:"The first flowers.",text:"The first time I gave you flowers. You were so happy, and I love seeing you happy — especially when I know I helped put that smile there."},
 {date:"01 APR 2026",title:"A little park date.",text:"We met at a park near your hostel. Nothing complicated — just time together, which has always been enough for me."},
 {date:"03 APR 2026",title:"The bookstore café.",text:"We went to that bookstore café, and you loved the place. I loved watching you read. There is something about seeing you lost in a book that I find incredibly beautiful."},
 {date:"07 APR 2026",title:"Olivia Café.",text:"You took me to Olivia Café in BTM. Another little place that became a memory simply because we were there together."},
 {date:"09 APR 2026",title:"A college lift memory.",text:"The first time we kissed in the college lift. Another tiny moment that somehow became a permanent part of our story."},
 {date:"22 APR 2026",title:"Ethnic Day.",text:"You bought me that matching kurta for your saree. You wore that blue saree and looked absolutely mesmerizing. We clicked lots of photos, went to McDonald's on MG Road with your friends, and somehow the same day ended with you scolding me before I dropped you back at your hostel. Somehow, even the chaotic days are memories I treasure."},
 {date:"25 APR 2026",title:"A day at my house.",text:"There was a college fest and I was home alone, so you came to my house. We spent so much time together, went to DJ night, talked late into the night, shared things we don't always say out loud, and ended up cuddling. I loved simply being there with you."},
 {date:"TODAY",title:"Every moment with you matters.",text:"Every moment I spend with you is important to me. From a forgotten name to eye contact, from a wrong introduction to a midnight proposal, from our first date to everything that followed — I love our story because it is ours. And I want this little world of ours to keep growing with us."}
];

const letters = [
 {tag:"LETTER 01",title:"Things I love about you",text:"Neha, I love your cuteness, your eyes, your honesty, your caring nature, your innocence and your smile. But honestly, the more time I spend with you, the more reasons I find. There are many more things I could list, but if you ask me for the biggest reason, it is simply everything about you."},
 {tag:"LETTER 02",title:"Thank you for being you",text:"Thank you for becoming my comfortable person. Thank you for every conversation, every laugh, every random plan, every ice cream, every date and every little moment that somehow stays with me. I don't need every moment to be extraordinary. I just want more ordinary moments with you."},
 {tag:"LETTER 03",title:"To my favourite girl",text:"My princess. My motu. My penguin. My butterfly. My honey bunny. My baby girl. My moon. You have so many names because one name never feels enough for everything you mean to me."},
 {tag:"LETTER 04",title:"To future us",text:"I hope one day we look back at this little website and smile at how it started — one random introduction, a forgotten name, a wrong name, some eye contact, a midnight proposal and a first date at Mantri Square. And I hope we have a thousand more memories by then."}
];

const openWhen = [
 {tag:"OPEN WHEN...",title:"you miss me",text:"Close your eyes for a second. Imagine me beside you, annoying you exactly as I normally would. Now smile, baby. That's an order. And remember — your baby boy is thinking about you too."},
 {tag:"OPEN WHEN...",title:"you're having a bad day",text:"One bad day doesn't get to decide how beautiful your life is. Breathe. Take a moment. And remember that somewhere, your baby boy is always cheering for his girl."},
 {tag:"OPEN WHEN...",title:"you need a smile",text:"Hello, honey bunny. Emergency reminder: you are ridiculously cute, your eyes are unfairly pretty, and I am ridiculously lucky to call you mine."},
 {tag:"OPEN WHEN...",title:"you want to know how much",text:"You are my world, my life, my everything. My princess, my butterfly, my moon, my bacha. I love you — more than this tiny website could ever explain."}
];

const things = [
"Your cuteness — especially when you don't even realise how cute you are.",
"Your eyes. I could probably write an entire section about them.",
"Your honesty. I love that I can believe what comes from you.",
"Your caring nature. The little ways you make people feel looked after.",
"Your innocence — one of the things that makes you, you.",
"Your smile. Somehow it can make an ordinary moment feel completely different.",
"The fact that being with you makes even ordinary places and random moments feel worth remembering.",
"Your cute chaos. Yes, motu, I'm talking about you.",
"Every version of you — princess, penguin, butterfly, honey bunny, baby girl and my moon.",
"Simply because you're you. And somehow, that's my favourite reason."
];
