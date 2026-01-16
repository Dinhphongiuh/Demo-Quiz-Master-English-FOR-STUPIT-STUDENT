import { Question, QuestionType } from '../types';

// Helper to create options quickly
const createOptions = (correctIndex: number, texts: string[]) => {
  return texts.map((text, index) => ({
    id: `opt-${Math.random().toString(36).substr(2, 9)}`,
    text,
    isCorrect: index === correctIndex
  }));
};

const createShortAnswer = (correctText: string) => {
  return [{
    id: `opt-${Math.random().toString(36).substr(2, 9)}`,
    text: correctText,
    isCorrect: true
  }];
};

const qType = QuestionType.SINGLE_CHOICE;
const tfType = QuestionType.TRUE_FALSE;
const saType = QuestionType.SHORT_ANSWER;

export const listening_questions: Question[] = [
  // ==========================================
  // TEXT 10: Alicia, Ryan, Mitch (MCQ)
  // ==========================================
  { id: 'lis_t10_1', type: qType, points: 1, timeLimit: 45, required: true, text: '1. Who are Alicia and Ryan?', options: createOptions(2, ['They are the callers.', 'They are the audience.', 'They are the consultants.', 'They are the viewers.']), explanation: 'They are giving advice.' },
  { id: 'lis_t10_2', type: qType, points: 1, timeLimit: 45, required: true, text: '2. Who is the first caller?', options: createOptions(1, ['Cassie', 'Larry', 'Ryan', 'Mitch']), explanation: 'Larry is identified as the first caller.' },
  { id: 'lis_t10_3', type: qType, points: 1, timeLimit: 45, required: true, text: '3. What is the first question about?', options: createOptions(0, ['Personal e-mail at work', 'Personal computer at home', 'Personal computer at work', 'Personal problem with the boss']), explanation: 'Topic is email usage at work.' },
  { id: 'lis_t10_4', type: qType, points: 1, timeLimit: 45, required: true, text: '4. The first problem is that ______.', options: createOptions(3, ['one friend doesn\'t have enough work to do', 'bosses don\'t allow sending e-mail at work', 'no friends send e-mail at work', 'one friend keeps sending e-mail at work']), explanation: 'A friend keeps sending emails.' },
  { id: 'lis_t10_5', type: qType, points: 1, timeLimit: 45, required: true, text: '5. Where does Cassie work?', options: createOptions(0, ['In a big office', 'In a big shop', 'In a big store', 'In a big hotel']), explanation: 'Big office.' },
  { id: 'lis_t10_6', type: qType, points: 1, timeLimit: 45, required: true, text: '6. What makes Cassie uncomfortable?', options: createOptions(1, ['The atmosphere at work', 'The gossip at work', 'The relationship at work', 'Her job']), explanation: 'Gossip.' },
  { id: 'lis_t10_7', type: qType, points: 1, timeLimit: 45, required: true, text: '7. What does Alicia advise Cassie to do to solve the problem?', options: createOptions(3, ['To keep quiet', 'To stay out of it', 'To leave the office', 'To try to do something about the problem']), explanation: 'Do something about it.' },
  { id: 'lis_t10_8', type: qType, points: 1, timeLimit: 45, required: true, text: '8. Why is Mitch frustrated?', options: createOptions(1, ['Because of his own son', 'Because of his owner\'s son', 'Because of his friend\'s son', 'Because of his job']), explanation: 'Owner\'s son.' },
  { id: 'lis_t10_9', type: qType, points: 1, timeLimit: 45, required: true, text: '9. What does Alicia advise Mitch to do?', options: createOptions(3, ['To do what he wants', 'To leave his job', 'To look for another job', 'To face it']), explanation: 'Face it.' },
  { id: 'lis_t10_10', type: qType, points: 1, timeLimit: 45, required: true, text: '10. What does Ryan think about Alicia\'s idea?', options: createOptions(0, ['He agrees with her.', 'He asks Mitch to leave his job.', 'He thinks the boss is right.', 'He doesn\'t agree with her.']), explanation: 'He agrees.' },

  // ==========================================
  // TEXT: Anne-Marie Boucher vs Lien Xiaohong (Gap Fill)
  // ==========================================
  { id: 'lis_gap_1', type: saType, points: 1, timeLimit: 45, required: true, text: 'Anne-Marie Boucher... situated near two (1) ______ parks.', options: createShortAnswer('National'), explanation: 'National parks.' },
  { id: 'lis_gap_2', type: saType, points: 1, timeLimit: 45, required: true, text: 'I\'m studying Italian, which is very (2) ______.', options: createShortAnswer('useful'), explanation: 'Useful.' },
  { id: 'lis_gap_3', type: saType, points: 1, timeLimit: 45, required: true, text: 'And I love (3) ______ new guests.', options: createShortAnswer('meeting'), explanation: 'Meeting.' },
  { id: 'lis_gap_4', type: saType, points: 1, timeLimit: 45, required: true, text: 'It is very cold, (4) ______ ten degrees Celsius.', options: createShortAnswer('minus'), explanation: 'Minus.' },
  { id: 'lis_gap_5', type: saType, points: 1, timeLimit: 45, required: true, text: 'Next year I want to race in a dogsled (5) ______.', options: createShortAnswer('competition'), explanation: 'Competition.' },
  { id: 'lis_gap_6', type: saType, points: 1, timeLimit: 45, required: true, text: 'She lives in a room with 14 other women in the factory (6) ______.', options: createShortAnswer('dormitory'), explanation: 'Dormitory.' },
  { id: 'lis_gap_7', type: saType, points: 1, timeLimit: 45, required: true, text: 'She says, "I\'m working the dogs very hard right now... their (7) ______."', options: createShortAnswer('twenties'), explanation: 'Twenties.' },
  { id: 'lis_gap_8', type: saType, points: 1, timeLimit: 45, required: true, text: 'She has just an hour for lunch... (8) ______ a day.', options: createShortAnswer('half'), explanation: 'Half.' },
  { id: 'lis_gap_9', type: saType, points: 1, timeLimit: 45, required: true, text: 'Her monthly salary is about $65, (9) ______ to send a little back home.', options: createShortAnswer('enough'), explanation: 'Enough.' },
  { id: 'lis_gap_10', type: saType, points: 1, timeLimit: 45, required: true, text: 'There are two skills that are (10) ______ these days.', options: createShortAnswer('essential'), explanation: 'Essential.' },

  // ==========================================
  // TEXT 22: The Thief, His Mother & $2 Billion (Gap Fill)
  // ==========================================
  { id: 'lis_t22_1', type: saType, points: 1, timeLimit: 45, required: true, text: 'Stephane Breitweiser... is the greatest (1) ______ thief in Europe.', options: createShortAnswer('art'), explanation: 'Art thief.' },
  { id: 'lis_t22_2', type: saType, points: 1, timeLimit: 45, required: true, text: 'He stole 239 paintings from museums in France, (2) ______ and...', options: createShortAnswer('Austria'), explanation: 'Austria.' },
  { id: 'lis_t22_3', type: saType, points: 1, timeLimit: 45, required: true, text: '...and (3) ______.', options: createShortAnswer('Denmark'), explanation: 'Denmark.' },
  { id: 'lis_t22_4', type: saType, points: 1, timeLimit: 45, required: true, text: 'He was wearing a security (4) ______ uniform.', options: createShortAnswer('guard\'s'), explanation: 'Guard\'s.' },
  { id: 'lis_t22_5', type: saType, points: 1, timeLimit: 45, required: true, text: 'He filled his bedroom with (5) ______ works of art.', options: createShortAnswer('priceless'), explanation: 'Priceless.' },
  { id: 'lis_t22_6', type: saType, points: 1, timeLimit: 45, required: true, text: 'His mother thought all the paintings were (6) ______.', options: createShortAnswer('copies'), explanation: 'Copies.' },
  { id: 'lis_t22_7', type: saType, points: 1, timeLimit: 45, required: true, text: 'One day (7) ______ they were having dinner...', options: createShortAnswer('While'), explanation: 'While.' },
  { id: 'lis_t22_8', type: saType, points: 1, timeLimit: 45, required: true, text: 'She went to his room, took some paintings from the (8) ______.', options: createShortAnswer('walls'), explanation: 'Walls.' },
  { id: 'lis_t22_9', type: saType, points: 1, timeLimit: 45, required: true, text: '...and cut them into small (9) ______.', options: createShortAnswer('pieces'), explanation: 'Pieces.' },
  { id: 'lis_t22_10', type: saType, points: 1, timeLimit: 45, required: true, text: 'She destroyed art worth two billion dollars (10) ______.', options: createShortAnswer('altogether'), explanation: 'Altogether.' },

  // ==========================================
  // TEXT 23: Bought on Ebay (Gap Fill)
  // ==========================================
  { id: 'lis_t23_1', type: saType, points: 1, timeLimit: 45, required: true, text: 'I bought an (1) ______ stove for the kitchen.', options: createShortAnswer('Italian'), explanation: 'Italian.' },
  { id: 'lis_t23_2', type: saType, points: 1, timeLimit: 45, required: true, text: 'It looks (2) ______ in my new kitchen.', options: createShortAnswer('fantastic'), explanation: 'Fantastic.' },
  { id: 'lis_t23_3', type: saType, points: 1, timeLimit: 45, required: true, text: 'I\'m going to buy a (3) ______ next!', options: createShortAnswer('fridge'), explanation: 'Fridge.' },
  { id: 'lis_t23_4', type: saType, points: 1, timeLimit: 45, required: true, text: '(4) ______ arrive every day, usually with shoes.', options: createShortAnswer('packages'), explanation: 'Packages.' },
  { id: 'lis_t23_5', type: saType, points: 1, timeLimit: 45, required: true, text: 'Yesterday a beautiful pair of green (5) ______ arrived.', options: createShortAnswer('sandals'), explanation: 'Sandals.' },
  { id: 'lis_t23_6', type: saType, points: 1, timeLimit: 45, required: true, text: 'My husband gets worried every time he sees the (6) ______.', options: createShortAnswer('mailman'), explanation: 'Mailman.' },
  { id: 'lis_t23_7', type: saType, points: 1, timeLimit: 45, required: true, text: 'I can\'t believe it! I\'m so (7) ______!', options: createShortAnswer('stupid'), explanation: 'Stupid.' },
  { id: 'lis_t23_8', type: saType, points: 1, timeLimit: 45, required: true, text: 'I\'ve bought (8) ______ of other things on eBay.', options: createShortAnswer('plenty'), explanation: 'Plenty.' },
  { id: 'lis_t23_9', type: saType, points: 1, timeLimit: 45, required: true, text: 'A car sells every two (9) ______ on eBay.', options: createShortAnswer('minutes'), explanation: 'Minutes.' },
  { id: 'lis_t23_10', type: saType, points: 1, timeLimit: 45, required: true, text: 'A (10) ______ told me it was worth less than half.', options: createShortAnswer('mechanic'), explanation: 'Mechanic.' },

  // ==========================================
  // TEXT 36: Steve & Carla (MCQ)
  // ==========================================
  { id: 'lis_t36_1', type: qType, points: 1, timeLimit: 45, required: true, text: '1. What\'s the matter with Steve?', options: createOptions(0, ['He has a cold.', 'He has the flu.', 'He has a stomachache.', 'He has a headache.']), explanation: 'He has a cold.' },
  { id: 'lis_t36_2', type: qType, points: 1, timeLimit: 45, required: true, text: '2. How long has Steve been sick?', options: createOptions(2, ['Since Friday', 'Since Saturday', 'Since Sunday', 'Since Monday']), explanation: 'Since Sunday.' },
  { id: 'lis_t36_3', type: qType, points: 1, timeLimit: 45, required: true, text: '3. How often should Steve take the medicine?', options: createOptions(2, ['Three times a day with meals', 'Four times a day before meals', 'Three times a day after meals', 'Twice a day']), explanation: '3 times after meals.' },
  { id: 'lis_t36_4', type: qType, points: 1, timeLimit: 45, required: true, text: '4. What does Carla suggest he do?', options: createOptions(0, ['Take herbal medicine', 'See another doctor', 'Eat chicken soup', 'Sleep more']), explanation: 'Herbal medicine.' },
  { id: 'lis_t36_5', type: qType, points: 1, timeLimit: 45, required: true, text: '5. What does Steve decide to do?', options: createOptions(1, ['Talk to another friend', 'Listen to Carla\'s suggestion', 'See the same doctor again', 'Go to the hospital']), explanation: 'Listen to Carla.' },

  // ==========================================
  // TEXT 38: Course Info (MCQ)
  // ==========================================
  { id: 'lis_t38_1', type: qType, points: 1, timeLimit: 45, required: true, text: '1. What is the name of the course?', options: createOptions(0, ['Intercultural Communication', 'Interaction in Communication', 'International Cooperation', 'Global Studies']), explanation: 'Intercultural Communication.' },
  { id: 'lis_t38_2', type: qType, points: 1, timeLimit: 45, required: true, text: '2. What time does the class meet?', options: createOptions(1, ['3:05 PM to 4:15 PM', '3:15 PM to 4:50 PM', '3:50 PM to 4:50 PM', '4:00 PM to 5:00 PM']), explanation: '3:15 to 4:50.' },
  { id: 'lis_t38_3', type: qType, points: 1, timeLimit: 45, required: true, text: '3. On average, how often will the class meet in the research lab?', options: createOptions(2, ['Twice a month', 'Three times a month', 'Four times a month', 'Every week']), explanation: 'Four times a month.' },
  { id: 'lis_t38_4', type: qType, points: 1, timeLimit: 45, required: true, text: '4. If today is Tuesday, when should the textbook be available?', options: createOptions(1, ['Today after class', 'On Wednesday', 'On Thursday', 'Next week']), explanation: 'Wednesday.' },
  { id: 'lis_t38_5', type: qType, points: 1, timeLimit: 45, required: true, text: '5. Which item was NOT mentioned as part of determining a student\'s final grade?', options: createOptions(2, ['Quizzes', 'A research project', 'Attendance', 'Exams']), explanation: 'Attendance.' },

  // ==========================================
  // TEXT 40: Weather Presentation (MCQ)
  // ==========================================
  { id: 'lis_t40_1', type: qType, points: 1, timeLimit: 45, required: true, text: '1. This presentation was most likely part of which type of recording?', options: createOptions(2, ['A TV weather program', 'An informal discussion', 'An academic speech at school', 'A radio show']), explanation: 'Academic speech.' },
  { id: 'lis_t40_2', type: qType, points: 1, timeLimit: 45, required: true, text: '2. Based on what you heard, how would you characterize the winter season?', options: createOptions(2, ['January receives 30 inches of snow', 'Winter temperatures hover below freezing', 'Outdoor activities tend to be popular', 'It rains a lot']), explanation: 'Outdoor activities popular.' },
  { id: 'lis_t40_3', type: qType, points: 1, timeLimit: 45, required: true, text: '3. Which statement is NOT true about the spring?', options: createOptions(2, ['Spring usually begins at end of March', 'Plentiful wind currents make outdoor activities possible', 'Nighttime temperatures dip below 50 degrees', 'Flowers bloom']), explanation: 'Nighttime temps < 50.' },
  { id: 'lis_t40_4', type: qType, points: 1, timeLimit: 45, required: true, text: '4. What is the summer season like in this area?', options: createOptions(1, ['Mild and breezy', 'Hot and dry', 'Have a fall picnic', 'Humid']), explanation: 'Hot and dry.' },
  { id: 'lis_t40_5', type: qType, points: 1, timeLimit: 45, required: true, text: '5. What is one activity people like to do in the fall?', options: createOptions(0, ['Go and see the fall colors', 'Clean their houses', 'Warm and humid', 'Skiing']), explanation: 'See fall colors.' },

  // ==========================================
  // TEXT 57: Pueblos (True/False)
  // ==========================================
  { id: 'lis_t57_1', type: tfType, points: 1, timeLimit: 30, required: true, text: '1. The speaker presents major types with examples in the lecture.', options: createOptions(1, ['True', 'False']), explanation: 'False.' },
  { id: 'lis_t57_2', type: tfType, points: 1, timeLimit: 30, required: true, text: '2. The speaker\'s main point is that the Pueblos are good weavers.', options: createOptions(0, ['True', 'False']), explanation: 'True.' },
  { id: 'lis_t57_3', type: tfType, points: 1, timeLimit: 30, required: true, text: '3. The Pueblos started weaving with a loom because it made weaving faster.', options: createOptions(0, ['True', 'False']), explanation: 'True.' },
  { id: 'lis_t57_4', type: tfType, points: 1, timeLimit: 30, required: true, text: '4. In South America, the best weavers are a group of people.', options: createOptions(1, ['True', 'False']), explanation: 'False.' },
  { id: 'lis_t57_5', type: tfType, points: 1, timeLimit: 30, required: true, text: '5. In the second century AD, they began growing cotton.', options: createOptions(1, ['True', 'False']), explanation: 'False.' },

  // ==========================================
  // TEXT 58: Acupuncture (True/False)
  // ==========================================
  { id: 'lis_t58_1', type: tfType, points: 1, timeLimit: 30, required: true, text: '1. The speaker\'s main point is that acupuncture comes from China.', options: createOptions(1, ['True', 'False']), explanation: 'False.' },
  { id: 'lis_t58_2', type: tfType, points: 1, timeLimit: 30, required: true, text: '2. Acupuncture helps people because the needles hurt.', options: createOptions(1, ['True', 'False']), explanation: 'False.' },
  { id: 'lis_t58_3', type: tfType, points: 1, timeLimit: 30, required: true, text: '3. The professor mentions ears to give a general example.', options: createOptions(1, ['True', 'False']), explanation: 'False.' },
  { id: 'lis_t58_4', type: tfType, points: 1, timeLimit: 30, required: true, text: '4. Acupuncture is a way of treating normal people.', options: createOptions(1, ['True', 'False']), explanation: 'False.' },
  { id: 'lis_t58_5', type: tfType, points: 1, timeLimit: 30, required: true, text: '5. There are 787 spots of small metal needles on the human body.', options: createOptions(0, ['True', 'False']), explanation: 'True.' },

  // ==========================================
  // TEXT 60: James (True/False)
  // ==========================================
  { id: 'lis_t60_1', type: tfType, points: 1, timeLimit: 30, required: true, text: '1. James speaks English pretty well.', options: createOptions(1, ['True', 'False']), explanation: 'False.' },
  { id: 'lis_t60_2', type: tfType, points: 1, timeLimit: 30, required: true, text: '2. Before James goes to college, he is going to travel around North America.', options: createOptions(1, ['True', 'False']), explanation: 'False.' },
  { id: 'lis_t60_3', type: tfType, points: 1, timeLimit: 30, required: true, text: '3. He has an old friend from school in Brazil and a pen pal in Chile.', options: createOptions(0, ['True', 'False']), explanation: 'True.' },
  { id: 'lis_t60_4', type: tfType, points: 1, timeLimit: 30, required: true, text: '4. He doesn\'t want to go and see the rainforest.', options: createOptions(1, ['True', 'False']), explanation: 'False.' },
  { id: 'lis_t60_5', type: tfType, points: 1, timeLimit: 30, required: true, text: '5. When he is traveling around, he will call home twice a week.', options: createOptions(0, ['True', 'False']), explanation: 'True.' },

  // ==========================================
  // TEXT 61: Jessie (True/False)
  // ==========================================
  { id: 'lis_t61_1', type: tfType, points: 1, timeLimit: 30, required: true, text: '1. Jessie is going to work in a young people\'s home as soon as she finishes school.', options: createOptions(1, ['True', 'False']), explanation: 'False.' },
  { id: 'lis_t61_2', type: tfType, points: 1, timeLimit: 30, required: true, text: '2. Her job is to work with nurses and help people get dressed.', options: createOptions(0, ['True', 'False']), explanation: 'True.' },
  { id: 'lis_t61_3', type: tfType, points: 1, timeLimit: 30, required: true, text: '3. Jessie needn\'t to go for walks with people.', options: createOptions(1, ['True', 'False']), explanation: 'False.' },
  { id: 'lis_t61_4', type: tfType, points: 1, timeLimit: 30, required: true, text: '4. The job starts in July and it\'s for at least nine months.', options: createOptions(1, ['True', 'False']), explanation: 'False.' },
  { id: 'lis_t61_5', type: tfType, points: 1, timeLimit: 30, required: true, text: '5. She is going to Florida with some friends after the job ends.', options: createOptions(0, ['True', 'False']), explanation: 'True.' }
];