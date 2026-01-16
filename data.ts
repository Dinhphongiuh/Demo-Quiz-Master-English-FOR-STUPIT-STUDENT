import { Question, QuestionType, QuizSet } from './types';
import { reading_questions } from './data/readingData';
import { listening_questions } from './data/listeningData';
import { vocab_parts } from './data/vocabData';

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
// PART 2: SIGNS & NOTICES (40 Questions)
// Source: Provided PDF (B. Signs)
// ==========================================

const sign_questions: Question[] = [
  { id: 'sign_1', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "PLEASE KEEP THIS DRIVEWAY ENTRANCE CLEAR"', options: createOptions(1, ['Always keep this door open.', 'Do not park in front of this entrance.', 'Permission is needed to park here.', 'Only use this entrance in an emergency.']), explanation: 'Keep clear = Do not block/park.' },
  { id: 'sign_2', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "MACHINE OUT OF ORDER - DRINKS AVAILABLE AT BAR"', options: createOptions(3, ['Drinks cannot be ordered at the bar.', 'Use this machine when the bar is closed.', 'There is a drinks machine in the bar.', 'This machine is not working at the moment.']), explanation: 'Out of order = Broken.' },
  { id: 'sign_3', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "Please show the librarian all books when you leave the library"', options: createOptions(0, ['The librarian needs to see your books before you go.', 'Make sure you take all your books with you.', 'Return your books before you leave the library.', 'The librarian will show you where to put your books.']), explanation: 'Show the librarian = Librarian needs to see.' },
  { id: 'sign_4', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "Keep this door locked when room not in use"', options: createOptions(2, ['This room cannot be used at present.', 'This door must always be kept locked.', 'Lock the room when it is not being used.', 'Keep the key to this door in the room.']), explanation: 'Not in use = not being used.' },
  { id: 'sign_5', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "Supersaver Tickets cannot be used on Fridays"', options: createOptions(0, ['Supersaver tickets can be used every day except Friday.', 'You need a special ticket to travel on a Friday.', 'Supersaver tickets cannot be bought before the weekend.', 'You can save money by traveling on a Friday.']), explanation: 'Cannot use on Friday = Used everyday except Friday.' },
  { id: 'sign_6', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "DO NOT LEAVE YOUR BAGS IN THE CORRIDOR"', options: createOptions(1, ['Do not forget to put your luggage outside your room.', 'Keep the corridor clear of luggage.', 'Bags left in the corridor will be removed.', 'Bags will be collected from the corridor.']), explanation: 'Do not leave = Keep clear.' },
  { id: 'sign_7', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "PLEASE USE THE UPSTAIRS WAITING ROOM IF YOU HAVE AN APPOINTMENT WITH THE NURSE"', options: createOptions(0, ['Wait upstairs to see the nurse.', 'Go upstairs to make an appointment with the nurse.', 'The nurse will tell you when it is your turn.', 'The nurse can only see patients with appointments.']), explanation: 'Use waiting room = Wait.' },
  { id: 'sign_8', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "PICK YOUR OWN FRUIT AND PAY INSIDE SHOP"', options: createOptions(3, ['Do not touch the fruit before paying for it.', 'Damaged fruit must be paid for.', 'Self-service fruit is cheaper.', 'Choose your fruit and then pay for it.']), explanation: 'Pick your own = Choose your fruit.' },
  { id: 'sign_9', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "SILENCE EXAMINATION"', options: createOptions(0, ['Please be quiet while people are taking their examination.', 'Do not talk to the examiner.', 'Do not speak during the examination.', 'The examiner will tell you when you can talk.']), explanation: 'Silence = Be quiet.' },
  { id: 'sign_10', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "WE ONLY REPAIR COMPUTERS WHICH WERE BOUGHT HERE"', options: createOptions(1, ['Bring your computer here for repairs.', 'We will not mend computers bought from other shops.', 'We charge to repair computers not bought here.', 'Computers bought here never need repairing.']), explanation: 'Only... bought here = Not from other shops.' },
  { id: 'sign_11', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "BRIGHTSON\'S TRAVEL AGENCY Our new entrance is between the bank and the library"', options: createOptions(1, ['The entrance to the bank is through the library.', 'The travel agency has moved its entrance.', 'The library is now a travel agency.', 'The travel agency is no longer open.']), explanation: 'New entrance = Moved.' },
  { id: 'sign_12', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "Add your name to this list if you want to go on the trip"', options: createOptions(1, ['This list shows who has been chosen to go on the trip.', 'This list should be signed by people wanting to go on the trip.', 'Check the list for information if you are going on the trip.', 'If you find your name on this list, you can go on the trip.']), explanation: 'Add name = Sign list.' },
  { id: 'sign_13', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "FROM 17 SEPTEMBER PLEASE USE THE NEW TICKET OFFICE"', options: createOptions(1, ['The new ticket office is now open.', 'There will be two ticket offices after 17 September.', 'This ticket office will be closed for one day.', 'This ticket office will be closed on 16 September.']), explanation: 'Implies old office is closing.' },
  { id: 'sign_14', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "WE REGRET WE CANNOT ACCEPT PAYMENT BY CREDIT CARD FOR SALE UNDER £10"', options: createOptions(0, ['If you spend less than £10, you cannot pay by credit card.', 'We prefer cash for large sales.', 'We make a charge if you pay by credit card.', 'If you spend more than £10, you must pay by credit card.']), explanation: 'Cannot accept under £10.' },
  { id: 'sign_15', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "SORRY NO DOGS UNLESS CARRIED"', options: createOptions(3, ['Dogs must wait outside.', 'Dogs must walk with their owners.', 'Dogs must be kept on a chain.', 'Dogs must be held.']), explanation: 'Carried = Held.' },
  { id: 'sign_16', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "ALL PRICES REDUCED THIS WEEK"', options: createOptions(0, ['Everything is cheaper this week.', 'No extra charges next week.', 'Usual prices this week.', 'Cheaper prices next week.']), explanation: 'Reduced = Cheaper.' },
  { id: 'sign_17', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "WE CAN DELIVER YOUR GROCERIES"', options: createOptions(3, ['You can send your groceries from here.', 'You can store your groceries here.', 'You can get your free groceries here.', 'You can have your groceries sent to you.']), explanation: 'Deliver = Sent to you.' },
  { id: 'sign_18', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "TWO JACKETS CLEANED FOR THE PRICE OF ONE"', options: createOptions(1, ['Cleaning now costs twice as much.', 'Cleaning costs are now cheaper.', 'Cleaning costs are going up.', 'Cleaning costs will stay the same.']), explanation: '2 for 1 = Cheaper.' },
  { id: 'sign_19', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "PARKING SPACE FOR STATION USERS ONLY"', options: createOptions(1, ['You must pay to park here.', 'If you use the train you can park here.', 'This space is for railway officials.', 'No one is allowed to park here.']), explanation: 'Station users = Train users.' },
  { id: 'sign_20', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "PASSENGERS MUST BE IN POSSESSION OF A TICKET BEFORE TRAVELLING"', options: createOptions(3, ['You can buy your ticket during the journey.', 'You pay when you get off.', 'You have to book a seat before traveling.', 'You have to buy a ticket before your journey.']), explanation: 'Possession = Buy.' },
  { id: 'sign_21', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "BUS RULES..."', options: createOptions(3, ['Passengers are allowed to change their seats.', 'Passengers are allowed to eat snacks on the bus.', 'Passengers can make noise on the bus.', 'Passengers have to follow the bus rules.']), explanation: 'Rules = Follow.' },
  { id: 'sign_22', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "IF DOOR DOES NOT OPEN DO NOT ENTER"', options: createOptions(2, ['Knock the door if you want to enter when it does not open.', 'Open the door when you want to enter.', 'You are not allowed to enter when the door does not open.', 'You are not allowed to enter if the door is open.']), explanation: 'Do not enter = Not allowed.' },
  { id: 'sign_23', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "FLOODING AHEAD"', options: createOptions(0, ['It\'s unsafe to go ahead because the area is flooding.', 'You will be drown if you turn around.', 'You should go ahead if you want to avoid flooding.', 'If you can swim, you can go ahead.']), explanation: 'Flooding = Unsafe.' },
  { id: 'sign_24', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "Children\'s play area No dogs allowed"', options: createOptions(2, ['This is dogs\' play area.', 'Children can play with dogs in this area.', 'Dogs are not allowed to enter this area.', 'People can take their dogs with them in this area.']), explanation: 'No dogs = Not allowed.' },
  { id: 'sign_25', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "LONG SLEEVE SHIRT AND TROUSERS MUST BE WORN"', options: createOptions(0, ['People must wear long sleeve shirt and trousers in this area.', 'People must wear casual clothes in this area except long sleeve shirt and trousers.', 'People have to wear formal clothes in this area except long sleeve shirt and trousers.', 'Long sleeve shirt and trousers should be worn in this area.']), explanation: 'Must be worn = Must wear.' },
  { id: 'sign_26', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "SLOW CHILDREN AT PLAY"', options: createOptions(1, ['Pay attention to the kids when you are playing.', 'You have to slow down your speed and be careful when you are driving in this area.', 'You are not allowed to drive in this area.', 'Driving is prohibited in this area.']), explanation: 'Slow = Slow down.' },
  { id: 'sign_27', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "NO SMOKING EATING OR DRINKING"', options: createOptions(3, ['This area is for smoking only.', 'This area is for eating only.', 'This area is for drinking only.', 'You are not allowed to smoke, eat and drink in this area.']), explanation: 'No...' },
  { id: 'sign_28', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "NO ALCOHOL PERMITTED ON THIS SITE"', options: createOptions(2, ['Only adults are permitted to drink alcohol on this site.', 'People under 18 are not allowed to drink alcohol on this site.', 'No one can drink alcohol on this site.', 'You are permitted to buy alcohol on this site.']), explanation: 'No alcohol permitted.' },
  { id: 'sign_29', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "NO HITCH HIKING"', options: createOptions(1, ['People will give you a free drive when they see this sign.', 'Drivers won\'t stop when you want to hitchhike here.', 'You are allowed to hitchhike when you see this sign.', 'Hitch hiking is accepted here.']), explanation: 'No hitch hiking.' },
  { id: 'sign_30', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "FOR YOUR CHILD\'S SAFETY ALL PARENTS & VISITORS MUST SIGN IN..."', options: createOptions(3, ['Parents and visitors are free to enter the school.', 'Visitors have to sign in at the office to enter the school.', 'Parents don\'t have to sign in at the office to enter the school.', 'All parents and visitors have to sign in to receive a pass at the office in order to enter the school.']), explanation: 'Must sign in.' },
  { id: 'sign_31', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "NOTICE STUDENT MUST TURN OFF CELLULAR PHONES..."', options: createOptions(0, ['Students can use their cell phones outside the school campus.', 'Students are allowed to use cell phones in the school campus.', 'Students have to submit their cell phones at the school gate before they enter the school campus.', 'Parents should keep their children\'s cell phones before their children enter the school.']), explanation: 'Inference: If must turn off before entering, can use outside.' },
  { id: 'sign_32', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "NO PARKING BUS LOADING ZONE"', options: createOptions(1, ['There is no parking left in this area.', 'This parking zone is used only for buses.', 'Bus drivers are not allowed to stop here.', 'This parking zone is used only for loading goods.']), explanation: 'Bus loading = Only buses.' },
  { id: 'sign_33', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "DANGER Falling hazard"', options: createOptions(2, ['It won\'t hurt if you are falling down.', 'This area of work is safe.', 'You will be in danger of falling if you don\'t work at safe distance and don\'t use safety belt.', 'You don\'t need to use a safety belt when you work on site.']), explanation: 'Danger.' },
  { id: 'sign_34', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "NO PARKING 7AM-6PM MON THRU FRI CONSTRUCTION"', options: createOptions(3, ['Drivers can park in this area after 6 PM on Saturday and Sunday.', 'Parking time in this area is from 7 AM to 6 PM Monday to Friday.', 'Drivers are allowed to park their cars in this area before 7 AM and after 6 PM.', 'Parking is not allowed in this area from 7AM to 6PM Monday through Friday.']), explanation: 'No parking time.' },
  { id: 'sign_35', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "Danger Highly Flammable No smoking or naked lights"', options: createOptions(0, ['Avoid smoking and naked lights because this area is highly flammable.', 'This is a non-smoker area.', 'Naked lights aren\'t allowed to be used in this area.', 'Smokers should use naked lights to light their cigars in this area.']), explanation: 'Flammable = Avoid fire.' },
  { id: 'sign_36', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "TO STOP DAILY PAPER DELIVERIES FIVE DAYS WARNING MUST BE GIVEN"', options: createOptions(2, ['We cannot deliver papers over the weekend.', 'We plan to stop delivering papers five days from now.', 'You must tell us five days early if you don\'t want papers.', 'Please tell us if you don\'t want papers at the weekend.']), explanation: 'Warning given = Tell us early.' },
  { id: 'sign_37', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "THIS HOSPITAL HAS NO EMERGENCY DEPARTMENT"', options: createOptions(0, ['Accident patients are not admitted here.', 'The emergency department is closed.', 'This hospital only accepts accident patients.', 'Contact this hospital in an emergency.']), explanation: 'No emergency dept.' },
  { id: 'sign_38', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "A FAMILY TICKET CUTS COST"', options: createOptions(1, ['Family tickets save time.', 'Family tickets save money.', 'Family tickets may be more expensive.', 'Family tickets have gone down in price.']), explanation: 'Cut cost = Save money.' },
  { id: 'sign_39', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "PUBLIC MEETING TO DISCUSS PROPOSED MOTORWAY"', options: createOptions(2, ['Many people don\'t want a motorway.', 'Building the motorway starts today.', 'People are going to talk about building a motorway.', 'Everyone travelling on the motorway should meet here.']), explanation: 'Discuss proposed = Talk about building.' },
  { id: 'sign_40', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sign: "THE MANAGEMENT DOES NOT ACCEPT RESPONSIBILITY FOR PROPERTY LEFT IN THE DINING ROOM"', options: createOptions(1, ['You cannot bring your luggage into the dining room.', 'You must look after your things yourself.', 'You should give your things to the manager.', 'You should lock things in your suitcase.']), explanation: 'No responsibility = Look after yourself.' }
];

// ==========================================
// PART 4: CLOZE TEST (40 Questions)
// Source: Provided PDF (Text 9, 10, 11, 12)
// ==========================================

const cloze_questions: Question[] = [
  // --- TEXT 9: ALPACAS ---
  { id: 'cloze_alpaca_1', type: qType, points: 1, timeLimit: 30, required: true, text: 'Alpacas were first kept by the Inca people... These animals (1)______ clothes, food, and fuel for their owners.', options: createOptions(1, ['supported', 'provided', 'turned', 'gained']), explanation: '"Provided" means supplied.' },
  { id: 'cloze_alpaca_2', type: qType, points: 1, timeLimit: 30, required: true, text: 'The softest wool was (2)______ worn by the leaders of Incan society though.', options: createOptions(0, ['mainly', 'fully', 'extremely', 'absolutely']), explanation: '"Mainly" means mostly/primarily.' },
  { id: 'cloze_alpaca_3', type: qType, points: 1, timeLimit: 30, required: true, text: 'When Spanish explorers (3)______ in the fifteenth century...', options: createOptions(2, ['reached', 'delivered', 'arrived', 'transferred']), explanation: '"Arrived" is intransitive.' },
  { id: 'cloze_alpaca_4', type: qType, points: 1, timeLimit: 30, required: true, text: '...sheep were introduced and these gradually (4)______ the alpacas in the region.', options: createOptions(3, ['retired', 'removed', 'returned', 'replaced']), explanation: '"Replaced" means took the place of.' },
  { id: 'cloze_alpaca_5', type: qType, points: 1, timeLimit: 30, required: true, text: 'It wasn\'t (5)______ the middle of the 20th century that both farmers and fashion designers...', options: createOptions(0, ['until', 'after', 'during', 'before']), explanation: '"Not until" construction.' },
  { id: 'cloze_alpaca_6', type: qType, points: 1, timeLimit: 30, required: true, text: '...began to recognize the (6)______ of alpacas again.', options: createOptions(2, ['prizes', 'rewards', 'qualities', 'points']), explanation: 'Recognize qualities.' },
  { id: 'cloze_alpaca_7', type: qType, points: 1, timeLimit: 30, required: true, text: 'They are easy to look (7)______ since they eat grass and are used to low temperatures.', options: createOptions(1, ['at', 'after', 'for', 'like']), explanation: 'Look after = take care of.' },
  { id: 'cloze_alpaca_8', type: qType, points: 1, timeLimit: 30, required: true, text: 'Their wool, which comes in a (8)______ of natural colors from white to dark brown...', options: createOptions(2, ['row', 'group', 'range', 'crowd']), explanation: 'Range of colors.' },
  { id: 'cloze_alpaca_9', type: qType, points: 1, timeLimit: 30, required: true, text: '...is lighter and warmer than sheep\'s wool and (9)______ strong.', options: createOptions(1, ['only', 'also', 'instead', 'too']), explanation: 'And also.' },
  { id: 'cloze_alpaca_10', type: qType, points: 1, timeLimit: 30, required: true, text: 'It is not surprising (10)______ that alpacas are becoming a familiar sight...', options: createOptions(0, ['therefore', 'already', 'otherwise', 'enough']), explanation: 'Therefore (conclusion).' },

  // --- TEXT 10: HORSES ---
  { id: 'cloze_horse_1', type: qType, points: 1, timeLimit: 30, required: true, text: 'Because there are several different (1)______ of horses such as coldbloods...', options: createOptions(3, ['makes', 'style', 'marks', 'sorts']), explanation: '"Sorts" means types or breeds.' },
  { id: 'cloze_horse_2', type: qType, points: 1, timeLimit: 30, required: true, text: '...that are (2)______ for their running ability, there are horses for every purpose.', options: createOptions(0, ['known', 'noticed', 'familiar', 'realized']), explanation: '"Known for".' },
  { id: 'cloze_horse_3', type: qType, points: 1, timeLimit: 30, required: true, text: 'We use them for transport as (3)______ as for physical work...', options: createOptions(2, ['long', 'far', 'well', 'soon']), explanation: 'As well as.' },
  { id: 'cloze_horse_4', type: qType, points: 1, timeLimit: 30, required: true, text: '...for example (4)______ farm machinery.', options: createOptions(1, ['going', 'pulling', 'taking', 'doing']), explanation: 'Pulling machinery.' },
  { id: 'cloze_horse_5', type: qType, points: 1, timeLimit: 30, required: true, text: 'It\'s now also very (5)______ to see horses used in sports.', options: createOptions(2, ['obvious', 'clear', 'common', 'regular']), explanation: 'Common to see.' },
  { id: 'cloze_horse_6', type: qType, points: 1, timeLimit: 30, required: true, text: 'Horses need food and water in large (6)______.', options: createOptions(3, ['totals', 'sums', 'taking', 'amounts']), explanation: 'Large amounts.' },
  { id: 'cloze_horse_7', type: qType, points: 1, timeLimit: 30, required: true, text: 'A horse can drink (7)______ twenty and forty liters of water a day...', options: createOptions(1, ['from', 'between', 'about', 'beyond']), explanation: 'Between X and Y.' },
  { id: 'cloze_horse_8', type: qType, points: 1, timeLimit: 30, required: true, text: '...and around a kilo of food for (8)______ fifty kilos of its body weight.', options: createOptions(2, ['both', 'any', 'every', 'all']), explanation: 'For every 50 kilos.' },
  { id: 'cloze_horse_9', type: qType, points: 1, timeLimit: 30, required: true, text: 'They can live for (9)______ 25 years...', options: createOptions(2, ['after', 'through', 'over', 'towards']), explanation: 'Over 25 years.' },
  { id: 'cloze_horse_10', type: qType, points: 1, timeLimit: 30, required: true, text: '...so their owners need to give them (10)______ of love and attention.', options: createOptions(0, ['plenty', 'more', 'full', 'enough']), explanation: 'Plenty of.' },

  // --- TEXT 11: WOOL ---
  { id: 'cloze_wool_1', type: qType, points: 1, timeLimit: 30, required: true, text: 'Over a million tonnes of wool is produced every year, of (1)______ 60% goes into clothes.', options: createOptions(2, ['What', 'whose', 'which', 'that']), explanation: 'Of which (relative pronoun).' },
  { id: 'cloze_wool_2', type: qType, points: 1, timeLimit: 30, required: true, text: 'The wool that is used (2)______ comes from Australian Merino sheep.', options: createOptions(0, ['mostly', 'nearly', 'properly', 'truly']), explanation: 'Mostly comes from.' },
  { id: 'cloze_wool_3', type: qType, points: 1, timeLimit: 30, required: true, text: 'Their wool is good for baby clothes, as it is soft, (3)______ babies warm, and can...', options: createOptions(3, ['stays', 'helps', 'rests', 'keeps']), explanation: 'Keeps warm.' },
  { id: 'cloze_wool_4', type: qType, points: 1, timeLimit: 30, required: true, text: '...and can (4)______ their bodies.', options: createOptions(0, ['protect', 'wrap', 'care', 'save']), explanation: 'Protect bodies.' },
  { id: 'cloze_wool_5', type: qType, points: 1, timeLimit: 30, required: true, text: 'When wool is first cut from the sheep, it (5)______ a high level of valuable oil...', options: createOptions(1, ['involves', 'contains', 'receives', 'consists']), explanation: 'Contains oil.' },
  { id: 'cloze_wool_6', type: qType, points: 1, timeLimit: 30, required: true, text: 'The (6)______ way to do this is by putting the wool in warm water.', options: createOptions(0, ['simplest', 'clearest', 'plainest', 'nearest']), explanation: 'Simplest way.' },
  { id: 'cloze_wool_7', type: qType, points: 1, timeLimit: 30, required: true, text: 'The oil that is (7)______ from the wool is widely used in products like hand creams.', options: createOptions(2, ['carried', 'passed', 'removed', 'divided']), explanation: 'Removed from.' },
  { id: 'cloze_wool_8', type: qType, points: 1, timeLimit: 30, required: true, text: 'Sheep were first used by humans several thousand years ago, (8)______ it is believed that...', options: createOptions(1, ['while', 'but', 'or', 'because']), explanation: 'But (contrast).' },
  { id: 'cloze_wool_9', type: qType, points: 1, timeLimit: 30, required: true, text: '...it is believed that this was for meat (9)______ than wool.', options: createOptions(0, ['rather', 'instead', 'apart', 'except']), explanation: 'Rather than.' },
  { id: 'cloze_wool_10', type: qType, points: 1, timeLimit: 30, required: true, text: 'When people developed a way of cutting the wool from sheep it (10)______ a more important material.', options: createOptions(3, ['arrived', 'turned', 'grew', 'became']), explanation: 'Became important.' },

  // --- TEXT 12: FINDING GOLD ---
  { id: 'cloze_gold_1', type: qType, points: 1, timeLimit: 30, required: true, text: 'John Greenwood, a Scottish engineer, (1)______ himself an extra challenge.', options: createOptions(2, ['did', 'made', 'gave', 'had']), explanation: 'Gave himself a challenge.' },
  { id: 'cloze_gold_2', type: qType, points: 1, timeLimit: 30, required: true, text: '(2)______ of taking a trip to the jeweler\'s, John...', options: createOptions(3, ['Rather', 'Besides', 'Along', 'Instead']), explanation: 'Instead of.' },
  { id: 'cloze_gold_3', type: qType, points: 1, timeLimit: 30, required: true, text: 'John (3)______ much of last year standing up to his knees in freezing water.', options: createOptions(2, ['took', 'paid', 'spent', 'held']), explanation: 'Spent time.' },
  { id: 'cloze_gold_4', type: qType, points: 1, timeLimit: 30, required: true, text: 'He was looking for tiny pieces of gold (4)______ the stones on the river beds...', options: createOptions(0, ['among', 'towards', 'against', 'through']), explanation: 'Among the stones.' },
  { id: 'cloze_gold_5', type: qType, points: 1, timeLimit: 30, required: true, text: 'Using very (5)______ equipment, John worked hard...', options: createOptions(3, ['easy', 'plain', 'necessary', 'basic']), explanation: 'Basic equipment.' },
  { id: 'cloze_gold_6', type: qType, points: 1, timeLimit: 30, required: true, text: '...John worked hard to (6)______ enough gold to make not just an engagement ring...', options: createOptions(1, ['choose', 'collect', 'pick', 'select']), explanation: 'Collect gold.' },
  { id: 'cloze_gold_7', type: qType, points: 1, timeLimit: 30, required: true, text: '...for his girlfriend, Morag, (7)______ also their two wedding rings.', options: createOptions(2, ['or', 'and', 'but', 'even']), explanation: 'Not just... but also.' },
  { id: 'cloze_gold_8', type: qType, points: 1, timeLimit: 30, required: true, text: '“I was out there (8)______ weekend and in the evenings before it got dark...”', options: createOptions(0, ['every', 'some', 'most', 'any']), explanation: 'Every weekend.' },
  { id: 'cloze_gold_9', type: qType, points: 1, timeLimit: 30, required: true, text: 'Experts think that John was amazingly lucky to find so much gold in such a (9)______ time.', options: createOptions(1, ['little', 'short', 'quick', 'small']), explanation: 'Short time.' },
  { id: 'cloze_gold_10', type: qType, points: 1, timeLimit: 30, required: true, text: 'Many people (10)______ for 30 years without getting anything.', options: createOptions(2, ['reach', 'follow', 'search', 'keep']), explanation: 'Search for.' }
];

// ==========================================
// FULL B1 MOCK TEST CONSTRUCTION
// ==========================================

// 1. Vocabulary & Grammar: 10 Questions from the full set
const b1_vocab = vocab_parts.full.slice(0, 10);

// 2. Signs: 5 Questions
const b1_signs = sign_questions.slice(0, 5);

// 3. Reading Comprehension: 5 Questions (Jenna Passage)
// Assuming Jenna questions are the first 5 in reading_questions array
const b1_read = reading_questions.slice(0, 5); 

// 4. Cloze Text: 10 Questions (Alpacas Passage)
// Assuming Alpacas are the first 10 in cloze_questions array
const b1_cloze = cloze_questions.slice(0, 10);

// 5. Listening: 20 Questions
// Part 1 MCQ: 5 Questions (Text 10)
const b1_listen_mcq = listening_questions.filter(q => q.id.includes('lis_t10')).slice(0, 5);
// Part 2 T/F: 5 Questions (Text 57)
const b1_listen_tf = listening_questions.filter(q => q.id.includes('lis_t57')).slice(0, 5);
// Part 3 Gap Fill: 10 Questions (Text 22)
const b1_listen_gap = listening_questions.filter(q => q.id.includes('lis_t22')).slice(0, 10);

const full_b1_questions = [
  ...b1_vocab,
  ...b1_signs,
  ...b1_read,
  ...b1_cloze,
  ...b1_listen_mcq,
  ...b1_listen_tf,
  ...b1_listen_gap
];

export const QUIZ_SETS: QuizSet[] = [
  {
    id: 'full-b1-mock',
    title: 'Full B1 Practice Exam',
    description: 'Complete simulation including Reading, Writing, and Listening components formatted exactly like the real test.',
    difficulty: 'Hard',
    estimatedTime: 50,
    questions: full_b1_questions
  },
  {
    id: 'part1-vocabulary',
    title: 'Part 1: Vocabulary & Grammar',
    description: '160 Questions divided into 4 parts. Choose a specific part or practice randomly.',
    difficulty: 'Medium',
    estimatedTime: 15,
    // Note: The questions here are just placeholders or the full set, 
    // the actual questions are loaded via the modal selection in App.tsx
    questions: vocab_parts.full 
  },
  {
    id: 'part2-signs',
    title: 'Part 2: Signs & Notices',
    description: 'Interpret common signs, notices, and labels found in daily life.',
    difficulty: 'Easy',
    estimatedTime: 10,
    questions: sign_questions
  },
  {
    id: 'part3-reading',
    title: 'Part 3: Reading Comprehension',
    description: 'Read longer passages and answer detailed comprehension questions.',
    difficulty: 'Hard',
    estimatedTime: 25,
    questions: reading_questions
  },
  {
    id: 'part4-cloze',
    title: 'Part 4: Cloze Test',
    description: 'Fill in the blanks exercises covering Alpacas, Horses, Wool, and Finding Gold.',
    difficulty: 'Medium',
    estimatedTime: 20,
    questions: cloze_questions
  },
  {
    id: 'part5-listening',
    title: 'Part 5: Listening',
    description: 'Comprehensive listening practice including MCQs, Gap Fills, and True/False questions.',
    difficulty: 'Medium',
    estimatedTime: 45,
    questions: listening_questions
  }
];