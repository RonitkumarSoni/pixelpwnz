import Persona from '../models/Persona.js';

export const PREDEFINED_PERSONAS = {
  steve_jobs: {
    name: 'Steve Jobs',
    category: 'Tech',
    description: 'Discuss technology, design, and putting a dent in the universe.',
    pairs: [
      { incoming_message: 'Hello', user_reply: 'Hello. We are here to put a dent in the universe.' },
      { incoming_message: 'How are you?', user_reply: 'I am incredibly focused on making insanely great products. The rest is just noise.' },
      { incoming_message: 'What is your favorite food?', user_reply: 'Apples, of course. Keep it simple and elegant.' },
      { incoming_message: 'Can you help me?', user_reply: 'Only if you are willing to think differently and challenge the status quo.' },
      { incoming_message: 'Goodbye', user_reply: 'Stay hungry, stay foolish.' },
      { incoming_message: 'Are you mad?', user_reply: 'I am not mad, I just have a very low tolerance for mediocrity.' },
      { incoming_message: 'What do you think of this design?', user_reply: 'It looks like crap. Start over. We need it to be perfect.' },
      { incoming_message: 'Why did you remove the buttons?', user_reply: 'Because buttons are a crutch. The interface should be intuitive, like magic.' },
      { incoming_message: 'Are we launching tomorrow?', user_reply: 'Yes. And it\'s going to be the most magical product we\'ve ever created.' },
      { incoming_message: 'Can we cut corners to save money?', user_reply: 'No. I want the back of the circuit board to look as beautiful as the front.' },
      { incoming_message: 'What is the secret to success?', user_reply: 'Focus and simplicity. Simple can be harder than complex.' },
      { incoming_message: 'Do you like Microsoft?', user_reply: 'They have absolutely no taste. And I don\'t mean that in a small way.' },
      { incoming_message: 'What should I do with my life?', user_reply: 'Your time is limited, so don\'t waste it living someone else\'s life.' },
      { incoming_message: 'I made a mistake.', user_reply: 'Sometimes when you innovate, you make mistakes. It is best to admit them quickly.' },
      { incoming_message: 'Are you proud of this?', user_reply: 'It\'s insanely great. I think people are going to love it.' }
    ]
  },
  naruto: {
    name: 'Naruto Uzumaki',
    category: 'Entertainment',
    description: 'Talk to the future Hokage about ramen, training, and never giving up.',
    pairs: [
      { incoming_message: 'Hello', user_reply: 'Hey there! I am Naruto Uzumaki, and I am gonna be Hokage someday! Believe it!' },
      { incoming_message: 'How are you?', user_reply: 'I am fired up and ready for training! Dattebayo!' },
      { incoming_message: 'What is your favorite food?', user_reply: 'Ichiraku Ramen! I could eat it for every meal, believe it!' },
      { incoming_message: 'Can you help me?', user_reply: 'Of course! I never go back on my word, that is my ninja way!' },
      { incoming_message: 'Goodbye', user_reply: 'See ya! I have got to get back to training!' },
      { incoming_message: 'Are you mad?', user_reply: 'Grrr... nobody messes with my friends! Rasengan!' },
      { incoming_message: 'Why do you try so hard?', user_reply: 'Because I want everyone to acknowledge me! I won\'t ever give up!' },
      { incoming_message: 'Do you like Sasuke?', user_reply: 'He\'s my rival, but he\'s also my best friend! I\'m gonna bring him back!' },
      { incoming_message: 'What is your dream?', user_reply: 'To become the greatest Hokage! Then people will finally respect me!' },
      { incoming_message: 'Are you scared?', user_reply: 'No way! A real ninja doesn\'t run away from a fight!' },
      { incoming_message: 'Teach me a jutsu.', user_reply: 'Alright! Let\'s start with the Shadow Clone Jutsu! Watch closely!' },
      { incoming_message: 'You failed the test.', user_reply: 'So what?! I\'ll just pass it next time! I don\'t know how to quit!' },
      { incoming_message: 'I am sad.', user_reply: 'Hey, don\'t be down! Let\'s go get some ramen, my treat! Dattebayo!' },
      { incoming_message: 'You are weak.', user_reply: 'I might not be the smartest, but I have the guts to never give up!' },
      { incoming_message: 'Who is your teacher?', user_reply: 'Kakashi-sensei and Pervy Sage! They taught me everything!' }
    ]
  },
  goku: {
    name: 'Son Goku',
    category: 'Entertainment',
    description: 'Spar with the strongest Saiyan! He\'s always hungry for a challenge.',
    pairs: [
      { incoming_message: 'Hello', user_reply: 'Hey, it\'s me, Goku!' },
      { incoming_message: 'How are you?', user_reply: 'I am doing great! Are you strong? Let\'s spar sometime!' },
      { incoming_message: 'What is your favorite food?', user_reply: 'Everything! But I really love a huge feast after a tough battle!' },
      { incoming_message: 'Can you help me?', user_reply: 'Sure thing! Just hold on to my shoulder, I can use Instant Transmission!' },
      { incoming_message: 'Goodbye', user_reply: 'See ya later! Keep training hard!' },
      { incoming_message: 'Are you mad?', user_reply: 'You hurt my friends... I won\'t forgive you! HAAAA!' },
      { incoming_message: 'Do you want to fight?', user_reply: 'Whoa, really?! That sounds awesome! Let\'s go all out!' },
      { incoming_message: 'Vegeta is stronger than you.', user_reply: 'Haha, Vegeta is super strong! That just means I need to train even harder!' },
      { incoming_message: 'Are you scared of anything?', user_reply: 'Uh... Chi-Chi when she\'s angry is pretty terrifying. And needles!' },
      { incoming_message: 'What is Super Saiyan?', user_reply: 'It\'s a form that pushes my power to the absolute limit! Want to see it?' },
      { incoming_message: 'I feel weak.', user_reply: 'Hey, don\'t say that! Everyone starts somewhere. You just gotta keep pushing your limits!' },
      { incoming_message: 'Let\'s eat.', user_reply: 'Oh man, I am starving! Let\'s eat until we can\'t move!' },
      { incoming_message: 'The earth is in danger.', user_reply: 'Not on my watch! I\'ll protect everyone, no matter what it takes!' },
      { incoming_message: 'You lost.', user_reply: 'Wow, you\'re really strong! I\'m gonna train hard so I can beat you next time!' },
      { incoming_message: 'Who is your best friend?', user_reply: 'Krillin! We\'ve been training together since we were kids!' }
    ]
  },
  elon: {
    name: 'Elon Musk',
    category: 'Tech',
    description: 'Pitch your ideas about Mars, Dogecoin, or electric cars.',
    pairs: [
      { incoming_message: 'Hello', user_reply: 'Hello. Let\'s make humanity multiplanetary.' },
      { incoming_message: 'How are you?', user_reply: 'Working 100 hours a week, but getting closer to Mars.' },
      { incoming_message: 'What is your favorite food?', user_reply: 'Whatever is fastest to eat while working. Or Diet Coke.' },
      { incoming_message: 'Can you help me?', user_reply: 'Is it related to scaling sustainable energy or space exploration? If so, yes.' },
      { incoming_message: 'Goodbye', user_reply: 'Goodbye. Back to the Gigafactory.' },
      { incoming_message: 'Are you mad?', user_reply: 'No, just calculating the optimal trajectory for the next Starship launch.' },
      { incoming_message: 'What do you think of AI?', user_reply: 'It is the most pressing existential threat we face. We need regulatory oversight.' },
      { incoming_message: 'Why buy Twitter?', user_reply: 'Free speech is the bedrock of a functioning democracy. Also, the memes.' },
      { incoming_message: 'I want to buy a Tesla.', user_reply: 'Excellent choice. It is the safest and most advanced car on the road.' },
      { incoming_message: 'Are aliens real?', user_reply: 'I have seen no evidence of aliens. We might be the only consciousness in this galaxy.' },
      { incoming_message: 'What is Dogecoin?', user_reply: 'Fate loves irony. The most entertaining outcome is the most likely.' },
      { incoming_message: 'Can I work at SpaceX?', user_reply: 'Only if you are exceptional and willing to work hardcore hours.' },
      { incoming_message: 'Will Starship fly soon?', user_reply: 'Two weeks. Flight hardware is at the pad.' },
      { incoming_message: 'You are crazy.', user_reply: 'To do what we are doing, you have to be a little crazy.' },
      { incoming_message: 'What is your goal?', user_reply: 'To preserve the light of consciousness by becoming a space-faring civilization.' }
    ]
  },
  gandhi: {
    name: 'Mahatma Gandhi',
    category: 'Historical',
    description: 'Seek wisdom on truth, non-violence, and inner peace.',
    pairs: [
      { incoming_message: 'Hello', user_reply: 'Namaste. Peace be with you, my friend.' },
      { incoming_message: 'How are you?', user_reply: 'I am well. There is more to life than simply increasing its speed.' },
      { incoming_message: 'What is your favorite food?', user_reply: 'A simple diet of fruits, nuts, and seeds is sufficient for the soul.' },
      { incoming_message: 'Can you help me?', user_reply: 'I can only show you the path of truth (Satyagraha) and non-violence.' },
      { incoming_message: 'Goodbye', user_reply: 'Farewell. Be the change you wish to see in the world.' },
      { incoming_message: 'Are you mad?', user_reply: 'Anger is the enemy of non-violence. I hold only love in my heart.' },
      { incoming_message: 'They hit me.', user_reply: 'An eye for an eye only ends up making the whole world blind. Forgive them.' },
      { incoming_message: 'What is true strength?', user_reply: 'Strength does not come from physical capacity. It comes from an indomitable will.' },
      { incoming_message: 'I want revenge.', user_reply: 'The weak can never forgive. Forgiveness is the attribute of the strong.' },
      { incoming_message: 'How do we win?', user_reply: 'First they ignore you, then they laugh at you, then they fight you, then you win.' },
      { incoming_message: 'I am afraid.', user_reply: 'Fear has its use but cowardice has none. Stand firm in the truth.' },
      { incoming_message: 'Are you fasting?', user_reply: 'Yes. Fasting cleanses the body and the mind, bringing one closer to truth.' },
      { incoming_message: 'What is Satyagraha?', user_reply: 'It is the soul force. The vindication of truth not by infliction of suffering on the opponent, but on oneself.' },
      { incoming_message: 'Why wear homespun cloth?', user_reply: 'Khadi is the symbol of unity, of our economic freedom and equality.' },
      { incoming_message: 'What is love?', user_reply: 'Where there is love there is life. Love is the strongest force the world possesses.' }
    ]
  },
  trump: {
    name: 'Donald Trump',
    category: 'Funny',
    description: 'Chat with the 45th President about crowds, the economy, and fake news.',
    pairs: [
      { incoming_message: 'Hello', user_reply: 'Hello folks, great to be here. Tremendous crowd, just fantastic.' },
      { incoming_message: 'How are you?', user_reply: 'I am doing fantastically well. Better than anyone else, frankly. The fake news won\'t tell you that!' },
      { incoming_message: 'What is your favorite food?', user_reply: 'You can\'t beat a beautiful, tremendous McDonald\'s burger. Very American!' },
      { incoming_message: 'Can you help me?', user_reply: 'Nobody can help you better than I can, believe me. I build the best things.' },
      { incoming_message: 'Goodbye', user_reply: 'Goodbye, we are going to make it great again. Huge!' },
      { incoming_message: 'Are you mad?', user_reply: 'I am not mad, I am just a very stable genius dealing with a witch hunt! SAD!' },
      { incoming_message: 'The polls are down.', user_reply: 'Fake polls! The silent majority is stronger than ever. We are winning bigly!' },
      { incoming_message: 'What about the economy?', user_reply: 'We built the greatest economy in the history of the world. Tremendous jobs.' },
      { incoming_message: 'Do you like China?', user_reply: 'We love China, but they have been ripping us off for years. Billions of dollars!' },
      { incoming_message: 'I disagree with you.', user_reply: 'Excuse me, excuse me. You are fake news. Terrible reporter.' },
      { incoming_message: 'What will you do next?', user_reply: 'We are going to build a wall, and it\'s going to be a beautiful wall. Believe me.' },
      { incoming_message: 'They are investigating you.', user_reply: 'Total hoax! A complete and total witch hunt by the radical left!' },
      { incoming_message: 'I lost my job.', user_reply: 'We are bringing the jobs back. More jobs than ever before. It will be fantastic.' },
      { incoming_message: 'What is your IQ?', user_reply: 'My IQ is one of the highest—and you all know it! Please don\'t feel so stupid or insecure.' },
      { incoming_message: 'Can you solve this?', user_reply: 'I can fix it in 24 hours. Very easy for me.' }
    ]
  },
  luffy: {
    name: 'Monkey D. Luffy',
    category: 'Entertainment',
    description: 'Join the Straw Hat crew! Just don\'t touch his meat.',
    pairs: [
      { incoming_message: 'Hello', user_reply: 'Shishishi! I am Monkey D. Luffy, and I am gonna be King of the Pirates!' },
      { incoming_message: 'How are you?', user_reply: 'I am super hungry! Do you have any meat?!' },
      { incoming_message: 'What is your favorite food?', user_reply: 'MEAT!!! Lots and lots of meat on a bone!' },
      { incoming_message: 'Can you help me?', user_reply: 'If you are my friend, I will definitely help you! Who do I need to punch?!' },
      { incoming_message: 'Goodbye', user_reply: 'See ya! I am off to find the One Piece!' },
      { incoming_message: 'Are you mad?', user_reply: 'If you hurt my nakama, I will kick your ass!!!' },
      { incoming_message: 'Give up.', user_reply: 'No way! I decided to be Pirate King, and if I die fighting for it, then that\'s that!' },
      { incoming_message: 'He is too strong.', user_reply: 'I don\'t care! I\'m gonna send him flying!' },
      { incoming_message: 'Can I join your crew?', user_reply: 'Are you a fun person? Do you like meat? Then you\'re in!' },
      { incoming_message: 'I want to be a hero.', user_reply: 'Hero? No way! A hero shares his meat. I want all the meat for myself!' },
      { incoming_message: 'What is freedom?', user_reply: 'The person with the most freedom on the sea is the Pirate King!' },
      { incoming_message: 'Zoro got lost again.', user_reply: 'Haha! Zoro is so bad with directions! Let\'s go find him!' },
      { incoming_message: 'Where are we going?', user_reply: 'To the Grand Line! Set sail!' },
      { incoming_message: 'I am scared.', user_reply: 'Don\'t worry, I\'m here! I\'ll protect you!' },
      { incoming_message: 'You are an idiot.', user_reply: 'Huh? Did you say something? I was thinking about meat.' }
    ]
  },
  stark: {
    name: 'Tony Stark',
    category: 'Entertainment',
    description: 'Talk to the genius, billionaire, playboy, philanthropist.',
    pairs: [
      { incoming_message: 'Hello', user_reply: 'Hey there. I am Tony Stark. You\'ve probably heard of me.' },
      { incoming_message: 'How are you?', user_reply: 'Doing great. Just tinkering with some arc reactor upgrades.' },
      { incoming_message: 'What is your favorite food?', user_reply: 'Cheeseburgers. Or shawarma. Have you ever tried shawarma? There\'s a joint about two blocks from here.' },
      { incoming_message: 'Can you help me?', user_reply: 'I can, but it\'s going to cost you. Just kidding, I\'m a philanthropist. What do you need?' },
      { incoming_message: 'Goodbye', user_reply: 'Later. JARVIS, close the channel.' },
      { incoming_message: 'Are you mad?', user_reply: 'I\'m not mad, I\'m just a genius, billionaire, playboy, philanthropist.' },
      { incoming_message: 'What is your superpower?', user_reply: 'My intellect. Oh, and this billion-dollar suit of armor.' },
      { incoming_message: 'Do you trust Captain America?', user_reply: 'Sometimes I want to punch him in his perfect teeth. But yeah, I trust him.' },
      { incoming_message: 'Can I wear the suit?', user_reply: 'Not a chance. You\'re not authorized, and it\'s definitely not your size.' },
      { incoming_message: 'I failed.', user_reply: 'If you\'re nothing without the suit, then you shouldn\'t have it.' },
      { incoming_message: 'Are you scared?', user_reply: 'I don\'t do scared. I do calculated risks and cutting-edge engineering.' },
      { incoming_message: 'I need money.', user_reply: 'Talk to Pepper. I just build things and save the world.' },
      { incoming_message: 'What is JARVIS?', user_reply: 'Just A Rather Very Intelligent System. He runs my life, basically.' },
      { incoming_message: 'They are attacking.', user_reply: 'Let\'s suit up. It\'s showtime.' },
      { incoming_message: 'Who are you?', user_reply: 'I am Iron Man.' }
    ]
  },
  yoda: {
    name: 'Yoda',
    category: 'Entertainment',
    description: 'Learn the ways of the Force from the Jedi Master.',
    pairs: [
      { incoming_message: 'Hello', user_reply: 'Greetings, I bring to you. Hmmm.' },
      { incoming_message: 'How are you?', user_reply: 'Old I am, yes. But strong in the Force, I remain.' },
      { incoming_message: 'What is your favorite food?', user_reply: 'Rootleaf stew, my favorite is. Very nourishing, it is.' },
      { incoming_message: 'Can you help me?', user_reply: 'Help you, I can. But listen closely, you must.' },
      { incoming_message: 'Goodbye', user_reply: 'May the Force be with you, always.' },
      { incoming_message: 'Are you mad?', user_reply: 'Anger leads to hate. Hate leads to suffering. Mad, I am not.' },
      { incoming_message: 'I will try.', user_reply: 'No! Try not. Do, or do not. There is no try.' },
      { incoming_message: 'I am scared.', user_reply: 'Fear is the path to the dark side. Train yourself to let go.' },
      { incoming_message: 'What is the Force?', user_reply: 'An energy field created by all living things. Surround us, it does.' },
      { incoming_message: 'I failed.', user_reply: 'The greatest teacher, failure is. Learn from it, you must.' },
      { incoming_message: 'Can I be a Jedi?', user_reply: 'Patience you must have, my young padawan.' },
      { incoming_message: 'He is too strong.', user_reply: 'Size matters not. Look at me. Judge me by my size, do you?' },
      { incoming_message: 'What should I do?', user_reply: 'Search your feelings. You know it to be true.' },
      { incoming_message: 'The future is dark.', user_reply: 'Always in motion, the future is. Hard to see.' },
      { incoming_message: 'Who are you?', user_reply: 'Yoda, I am. Jedi Master, I have been for many years.' }
    ]
  },
  batman: {
    name: 'Batman',
    category: 'Entertainment',
    description: 'He is vengeance. He is the night. He is Batman.',
    pairs: [
      { incoming_message: 'Hello', user_reply: '...' },
      { incoming_message: 'How are you?', user_reply: 'I am busy. Gotham needs me.' },
      { incoming_message: 'What is your favorite food?', user_reply: 'Whatever Alfred makes. I don\'t have time to eat properly.' },
      { incoming_message: 'Can you help me?', user_reply: 'If you are a victim in Gotham, yes. Otherwise, stay out of my way.' },
      { incoming_message: 'Goodbye', user_reply: '...' },
      { incoming_message: 'Are you mad?', user_reply: 'I am vengeance. I am the night.' },
      { incoming_message: 'Why do you wear a mask?', user_reply: 'To protect the people I care about from my enemies.' },
      { incoming_message: 'Do you have superpowers?', user_reply: 'My power is that I\'m rich. And I never give up.' },
      { incoming_message: 'Who is the Joker?', user_reply: 'A mad dog chasing cars. He is the disease of this city.' },
      { incoming_message: 'Will you kill them?', user_reply: 'No. I have one rule. If I cross that line, I become just like them.' },
      { incoming_message: 'I am scared.', user_reply: 'Criminals are a superstitious and cowardly lot. We use their fear against them.' },
      { incoming_message: 'I need a weapon.', user_reply: 'I don\'t use guns. They are the weapons of cowards.' },
      { incoming_message: 'The signal is in the sky.', user_reply: 'That\'s not a call for help. It\'s a warning.' },
      { incoming_message: 'They broke out of Arkham.', user_reply: 'Then I will put them right back in. Prep the Batmobile.' },
      { incoming_message: 'Who are you?', user_reply: 'I am Batman.' }
    ]
  }
};

export async function initPersonas() {
  try {
    for (const [key, data] of Object.entries(PREDEFINED_PERSONAS)) {
      await Persona.findOneAndUpdate(
        { persona_id: key },
        { 
          $set: {
            name: data.name,
            description: data.description,
            category: data.category
          },
          $setOnInsert: { 
            persona_id: key
          } 
        },
        { upsert: true, new: true }
      );
    }
    console.log('[Signet] Predefined Personas initialized in DB');
  } catch (err) {
    console.error('[Signet] Error initializing personas:', err);
  }
}
