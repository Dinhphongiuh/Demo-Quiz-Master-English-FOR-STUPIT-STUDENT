import { Question, QuestionType } from '../types';

// Helper to create options quickly
const createOptions = (correctIndex: number, texts: string[]) => {
  return texts.map((text, index) => ({
    id: `opt-${Math.random().toString(36).substr(2, 9)}`,
    text,
    isCorrect: index === correctIndex
  }));
};

const qType = QuestionType.SINGLE_CHOICE;

// ==========================================
// READING PASSAGE TEXTS
// ==========================================

export const TEXT_JENNA = `CROSS-COUNTRY SKIING IN SWEDEN by Jenna Walton, aged 15

Last year, Mum and I wanted to try a winter sport called cross-country skiing – travelling on skis across the countryside. And pictures of one area in Sweden, with people skiing along through forests on wonderful white snow, persuaded us that destination was a good choice. We hadn't done much skiing, though, so weren't sure how difficult cross-country skiing was, compared with skiing fast down steep mountains. But we signed up to join a group of people, of all ages, plus a guide.

We'd read about the place we went to before we left, so we knew it was close to where Sweden ends and Norway starts. And our family knew we couldn't text home, as there was no internet connection - and actually, it was relaxing to be far from anywhere, or anyone. What we hadn't realised was that from there, we'd be able to see amazing colored lights in the sky, which appeared at certain times of year, called the Northern Lights - what a sight!

On our first day there, I hated getting up in the dark, but it meant I saw the sun come up over the forest, so I was glad I did. And sunshine was forecast for the week, I was delighted to hear! But the real problem was my 15kg rucksack, full of food and clothes - I had no idea it would weigh that much. Anyway, we skied for hours across mainly flat snow. Having special light skis was supposed to help us climb the few hills there were - although I still couldn't do it!

Finally, we stopped for the night. It wasn't until we'd reached our hut that our guide mentioned we'd just crossed a frozen lake to get there - but nothing surprised us by that point! Anyway, he gave us all jobs to do - cutting firewood and cooking food - and soon we were having dinner, made from whatever food we'd brought - a strange mix, but it tasted delicious. And everywhere was so peaceful outside that none of us stayed awake long.
Mum and I want to try another winter sports trip, maybe snowboarding. But we'll probably end up just as exhausted as we were after this trip!`;

export const TEXT_FRESHLY = `FRESHLY' RESTAURANT by Peter Newman

Last week my parents and I visited Freshly, a modern British restaurant, in the centre of Brighton, Sussex. So it was the perfect opportunity to write a review for the school paper. All of the ingredients used in Freshly come from Sussex and the surrounding area. It was also the first restaurant in the world to be serving only English wine. Since opening in 2018...

Freshly has won many awards. The owner and head chef at the restaurant is only 24 years old and she has been cooking three-course meals for her family since she was nine and still at junior school. Jane did an apprenticeship at the famous Grand Hotel, in Brighton, and later also went to catering school in London. She says this was one of the hardest courses she has ever done and sometimes she was so tired that she could hardly speak. Despite this, she never felt like giving up because she knew she was following her dream.

Freshly is a small restaurant with a view over the back streets of Brighton where you can watch the world walk by. The staff are always welcoming. The head waiter is very informative about the food and how it is cooked and also from where all the ingredients have come from. The chefs are not scared to experiment, so the menu changes regularly. The chefs are lucky enough to be a team of good friends, and they try to eat out at different restaurants as often as they can. They take a lot of inspiration from their favorite chefs to make the Freshly experience as perfect as possible.

One thing to remember, however, is that you are limited to what they have that day on the menu. Freshly, however, will always cater to people with special food needs and vegetarians. The food is beautifully prepared and comes in small tasty portions. Wonderful homemade bread, too. Very nice - but expensive. Four set menus with an extra cheeseboard, two bottles of water, and 2 coffees will cost around £150 without a tip. So yes, fine dining; but at a price.`;

export const TEXT_TED = `FIGHT FOR WHAT IS RIGHT By Ted Williams

I've always enjoyed being with other people and I suppose I've always had a strong opinion about what is wrong and what is right, ever since I was a very young child. That used to irritate my brothers and sisters because I would always tell our parents if they did something wrong. I remember they had secrets that they wouldn't share with me and I probably missed out on a lot because of that. Not that I blame them.

When I finished school, I actually studied history at university and then, in my final year, I had a work placement in a lawyer's office. I was fascinated from day one and, as soon as I graduated, I applied to do a degree in law. I don't know why I hadn't thought of this earlier, but I was certain I would love to be a judge one day.

Several years have gone by and I am still very fond of my job. I'm keen on fighting for justice, no matter what kind of case it is. Being a judge is not an easy profession, I must admit. It can be really challenging at times not to get emotionally involved. In most cases it helps if you just follow your head and not your heart when you can't make up your mind. The working hours are quite long and not all judges earn a lot of money. But for me, choosing an occupation was never about the financial aspect.

When a court case is finished and I am confident that I have made the right decision, I am relieved. Knowing that people guilty of crimes will end up in prison and society will be a bit safer...
tomorrow could not make me any happier. However, I make it a personal rule not to take work home with me. Once I leave the court, I switch off and concentrate on my family. They will always be my number one priority. When I'm at home, I'm no longer a judge; I'm a husband and a dad and that sometimes takes even more work.`;

export const TEXT_LOUISE = `MY CANADIAN TRIP by Louise Walton

Last year I went on an amazing trip - travelling by boat on a guided group tour along the west coast of Canada. It was my brother Harry's idea. He's a journalist, like me, and he wanted to write articles about the trip. He's also a great fan of boats, although that's one interest we definitely don't share. But I'd dreamt of visiting the area ever since seeing it on TV as a child, especially as I knew it was where our great-grandparents had lived before moving to Europe. So I kept asking Harry if I could go too - until he finally agreed!

A few weeks before we left home, there were storms in the area we were going to. But luckily the forecast for the time we intended to be there was for calm seas. Although there was plenty to arrange, I was busy at work so didn't have much time to think about what needed doing. But Harry promised he'd taken care of everything, so I knew everything would be all right.

After arriving in Canada, we joined the group, packed our limited supplies into small boats and set off. The guide had mentioned that very few people now lived along that coast, and sure enough, the only other living creatures we saw for the first few days were dolphins and birds. We knew there were islands in the distance, but the early-morning fog made it hard to see very far, so I just focused on the beautiful patterns our boat made in the water.

We often stopped for hours to explore the rock pools on the beaches. They were full of amazing colored fish, many of which I didn't recognize. And it was great to be able to stop caring about how quickly or slowly the day was passing. We never forgot lunch or dinner, though, which we all made together over camp fires. When we finally fell asleep on the boats each evening, even though the beds were hard, it really felt like stress-free living!
When the time came to leave, I was sad. How could I return to normal life again? But I knew if I stayed, I'd miss family and friends. I was also looking forward to telling everyone at home about our adventures!`;

// ==========================================
// QUESTIONS
// ==========================================

export const reading_questions: Question[] = [
  // --- JENNA QUESTIONS ---
  {
    id: 'read_jenna_1', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'Jenna and her mum decided to go cross-country skiing in Sweden because:',
    explanation: 'From text: "pictures... persuaded us that destination was a good choice."',
    options: createOptions(3, [
      'they wanted a change from mountain skiing holidays.',
      'they\'d heard the sport would be easier than skiing down hills.',
      'they\'d met a group of people who wanted to go, too.',
      'they found a place there that they were keen to visit.'
    ])
  },
  {
    id: 'read_jenna_2', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'After their arrival, what did they discover about where they were staying?',
    explanation: 'From text: "amazing colored lights in the which appeared at certain times of year... Northern Lights".',
    options: createOptions(1, [
      'It wasn\'t far from the border with another country.',
      'They could get great views of a spectacular natural event.',
      'It was at a point where they couldn\'t use technology.',
      'They weren\'t near local people or their homes.'
    ])
  },
  {
    id: 'read_jenna_3', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'How did Jenna feel about the long trips through the snow on skis?',
    explanation: 'From text: "real problem was my 15kg rucksack... no idea it would weigh that much".',
    options: createOptions(0, [
      'surprised she had to carry such a heavy bag',
      'pleased about the weight of the skis she was given',
      'glad that going uphill wasn\'t as hard as she\'d thought',
      'worried the good weather they were having wouldn\'t last'
    ])
  },
  {
    id: 'read_jenna_4', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'Regarding their accommodation, Jenna says everyone',
    explanation: 'From text: "he gave us all jobs to do - cutting firewood and cooking food".',
    options: createOptions(2, [
      'had difficulties getting to sleep there.',
      'was unhappy at the quality of the food.',
      'had to help out with all the housework.',
      'was shocked to hear details of their journey there.'
    ])
  },
  {
    id: 'read_jenna_5', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'What would Jenna text to a friend about her trip?',
    explanation: 'Text mentions hating getting up in dark but enjoying sunrise. "I\'m not used to getting out of bed so early... But it was worth it".',
    options: createOptions(2, [
      'One reason we chose this trip was that we thought we\'d be among loads of trees, which we love - but that hasn\'t happened so far.',
      'The people in our group were really friendly - but they were all Mum\'s age and older, really.',
      'I\'m not used to getting out of bed so early to do things! But it was worth it, as the sunrise was wonderful.',
      'Mum and I have agreed that although the trip was great, we might attempt something less tiring on our next winter holiday.'
    ])
  },

  // --- FRESHLY QUESTIONS ---
  {
    id: 'read_freshly_1', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'The food at Freshly',
    explanation: 'From text: "ingredients used in Freshly come from Sussex and the surrounding area" (close to Brighton).',
    options: createOptions(1, [
      'is grown by the staff.',
      'comes from places in or close to Brighton.',
      'comes from all over the world.',
      'comes all over Britain.'
    ])
  },
  {
    id: 'read_freshly_2', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'Where did the owner start to train as a chef?',
    explanation: 'From text: "cooking three-course meals for her family since she was nine".',
    options: createOptions(2, [
      'at junior school',
      'at university',
      'at home with the help of her family',
      'in a hotel'
    ])
  },
  {
    id: 'read_freshly_3', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'How did Jane feel while she was training to be a chef?',
    explanation: 'From text: "one of the hardest courses... so tired... Despite this, she never felt like giving up".',
    options: createOptions(0, [
      'She was really tired but felt positive about the experience.',
      'She wanted to give up because of the pressure.',
      'She wasn\'t sure if she would be successful.',
      'She found it quite easy to finish the training.'
    ])
  },
  {
    id: 'read_freshly_4', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'What is said about Freshly restaurant?',
    explanation: 'From text: "chefs are lucky enough to be a team of good friends".',
    options: createOptions(3, [
      'The head waiter is in charge of the menu.',
      'The staff often change jobs because they like to do different things.',
      'It is a big and fancy restaurant with a great view.',
      'The staff have a very good relationship with each other.'
    ])
  },
  {
    id: 'read_freshly_5', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'What would Peter say about Freshly restaurant?',
    explanation: 'Text describes the young 24 year old chef and local ingredients.',
    options: createOptions(1, [
      'Freshly restaurant may serve tasty food but it is extremely pricey - not worth it.',
      'A great effort from a successful young chef who supports local products.',
      'A famous chef who tried rather unsuccessfully to set up a different kind of restaurant.',
      'The cheerful staff and nice location are the only things that are worth mentioning.'
    ])
  },

  // --- TED QUESTIONS ---
  {
    id: 'read_ted_1', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'Why did Ted\'s brothers and sisters get annoyed with him?',
    explanation: 'From text: "I would always tell our parents if they did something wrong".',
    options: createOptions(3, [
      'Because he was always misbehaving.',
      'Because he was their parents\' favorite child.',
      'Because he followed them all the time.',
      'Because he got them into trouble.'
    ])
  },
  {
    id: 'read_ted_2', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'After finishing school, Ted',
    explanation: 'From text: "studied history at university... final year... work placement in lawyer\'s office".',
    options: createOptions(2, [
      'went to law school and then worked at a lawyer\'s office.',
      'decided he wanted to be a judge so he dropped out of university.',
      'studied something else for a few years before deciding to become a judge.',
      'studied at university to become a lawyer but was then unhappy with his choice.'
    ])
  },
  {
    id: 'read_ted_3', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'What does Ted say about his job?',
    explanation: 'From text: "still very fond of my job".',
    options: createOptions(0, [
      'He has a lot of job satisfaction.',
      'He has made mistakes during his career.',
      'He always wins a case.',
      'It doesn\'t affect him emotionally.'
    ])
  },
  {
    id: 'read_ted_4', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'What does Ted do at the end of the working day?',
    explanation: 'From text: "switch off... personal rule not to take work home".',
    options: createOptions(1, [
      'finish off any work that he has at home',
      'leave all his work problems at the court',
      'tell his family all about his working day',
      'stop spending time with his family'
    ])
  },
  {
    id: 'read_ted_5', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'What would Ted say if someone asked him to describe himself?',
    explanation: 'From text: "husband and a dad... concentrate on my family... switch off".',
    options: createOptions(2, [
      '“I am a strict family man who does not easily take no for an answer.”',
      '“Unfortunately I tend to put work before family most of the time.”',
      '“I care deeply about both my family and work and I try to keep them separated.”',
      '“I am proud to be a judge that everyone fears.”'
    ])
  },

  // --- LOUISE QUESTIONS ---
  {
    id: 'read_louise_1', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'Why was Louise keen to go on the trip to Canada?',
    explanation: 'From text: "dreamt of visiting the area ever since seeing it on TV as a child".',
    options: createOptions(2, [
      'She liked the idea of spending time in a boat.',
      'She knew her brother wanted her to accompany him.',
      'She had wanted to travel there for a long time.',
      'She had heard from some relatives who lived there.'
    ])
  },
  {
    id: 'read_louise_2', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'Just before their departure, Louise',
    explanation: 'From text: "Harry promised he\'d taken care of everything, so I knew everything would be all right."',
    options: createOptions(1, [
      'began to wonder how they would deal with bad weather.',
      'was confident that they were fully prepared for the trip.',
      'wished she could help her brother more.',
      'felt she was better organized than usual.'
    ])
  },
  {
    id: 'read_louise_3', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'On the first morning of the trip, Louise says she admired',
    explanation: 'From text: "focused on the beautiful patterns our boat made in the water."',
    options: createOptions(0, [
      'the way the sea around them looked.',
      'the wildlife which their boats attracted.',
      'the homes that people had built in the area.',
      'the views of islands they were passing.'
    ])
  },
  {
    id: 'read_louise_4', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'During the trip, Louise enjoyed',
    explanation: 'From text: "great to be able to stop caring about how quickly or slowly the day was passing".',
    options: createOptions(3, [
      'learning the names of the fish she saw.',
      'not having to cook regular meals.',
      'spending the nights in comfort.',
      'not having to worry about time.'
    ])
  },
  {
    id: 'read_louise_5', type: qType, points: 1, timeLimit: 60, required: true,
    text: 'What would Louise write in her diary during the trip?',
    explanation: 'Refers to seeing it on TV as a child.',
    options: createOptions(1, [
      'There are wonderful pools along the coast, left behind by the sea. I wish we had the time to look at them more carefully.',
      'I can\'t believe I\'m in the same place I saw on that programme ages ago. Our great-grandparents would be amazed!',
      'We\'ve brought a lot of stuff with us in the boats - I\'m sure it\'s not all necessary. It\'s surprising they don\'t sink!',
      'It\'ll be hard to say goodbye to the place at the end, but I can\'t wait to get back to work - I\'ve really missed it.'
    ])
  }
];