// https://the-trivia-api.com/search/

// array of 15 arrays for 15 levels and 10 objects per array, total 150 questions
const questionsList = [
  // question 1 - Society & Culture
  [
    {
      question: "What do the letters 'NSFW' mean on internet chats?",
      optionA: "Not Safe For Work",
      optionB: "Nice Suckers Finish Worst",
      optionC: "Now, Salt For Weeks",
      optionD: "No Situation For Wheels",
      key: "A",
    },
    {
      question: "On internet chats, what do the letters 'TIL' mean?",
      optionA: "Total Internet Legend",
      optionB: "Today I Learned",
      optionC: "Totally In Love",
      optionD: "To Invoke Laughter",
      key: "B",
    },
    {
      question:
        "What do people mean when type the letters 'IRL' in a message on the internet?",
      optionA: "I Remember Losing",
      optionB: "Idiots Receive Laughter",
      optionC: "In Real Life",
      optionD: "I Really Love",
      key: "C",
    },
    {
      question: "What do the letters 'TLDR' mean on internet chats?",
      optionA: "Top Level Domain Redirect",
      optionB: "Tomorrow Let's Damn Remember",
      optionC: "Trying Little Does Revolutions",
      optionD: "Too Long Didn't Read",
      key: "D",
    },
    {
      question: "What do the letters 'IIRC' mean on internet chats?",
      optionA: "If I Remember Correctly",
      optionB: "Incidentally, I Really Care",
      optionC: "Ignore It, Real Crap",
      optionD: "Internet Is Random Crap",
      key: "A",
    },
    {
      question: "On internet chats, what do the letters 'YMMV' mean?",
      optionA: "You're Meeting My Villain",
      optionB: "Your Mileage May Vary",
      optionC: "You Must Meet Voters",
      optionD: "You Make Me Vomit",
      key: "B",
    },
    {
      question: "What do the letters 'FWIW' mean on internet chats?",
      optionA: "For while I'm waiting",
      optionB: "Fantastic when it works",
      optionC: "For what it's worth",
      optionD: "Friend who is wise",
      key: "C",
    },
    {
      question: "On internet chats, what do the letters 'AFAIR' mean?",
      optionA: "As For All Intelligent Readers",
      optionB: "A Free And Indisputable Right",
      optionC: "All For An Interesting Read",
      optionD: "As Far As I Remember",
      key: "D",
    },
    {
      question:
        "What do people mean when type the letters 'SMH' in a message on the internet?",
      optionA: "Shaking My Head",
      optionB: "Sometimes Men Hate",
      optionC: "Special Man, Him",
      optionD: "Soothe Me Honey",
      key: "A",
    },
    {
      question:
        "If someone typed the letters 'ASL' in a message, what would they mean?",
      optionA: "Anybody Seen Lately?",
      optionB: "Age Sex Location",
      optionC: "Any Souls Loggedin?",
      optionD: "Awesome Situation Logged",
      key: "B",
    },
  ],
  // question 2 - Society & Culture
  [
    {
      question:
        "Which motoring brand is associated with the marketing slogan 'Engineered to Move the Human Spirit'?",
      optionA: "Mercedez-Benz",
      optionB: "Ford",
      optionC: "Jaguar",
      optionD: "Audi",
      key: "A",
    },
    {
      question:
        "Which beer brand is associated with the marketing slogan 'Good things come to those who wait'?",
      optionA: "Stella Artois",
      optionB: "Guinness",
      optionC: "Budweiser",
      optionD: "Fosters",
      key: "B",
    },
    {
      question:
        "'Probably the best lager in the world' is a slogan associated with which beer brand?",
      optionA: "Heineken",
      optionB: "Fosters",
      optionC: "Carlsberg",
      optionD: "Budweiser",
      key: "C",
    },
    {
      question:
        "Which technology brand is associated with the marketing slogan 'Don't Be Evil'?",
      optionA: "Nokia",
      optionB: "Playstation",
      optionC: "Panasonic",
      optionD: "Google",
      key: "D",
    },
    {
      question:
        "Which motoring brand is associated with the marketing slogan 'Let's go places'?",
      optionA: "Toyota",
      optionB: "Greyhound",
      optionC: "Jaguar",
      optionD: "Ford",
      key: "A",
    },
    {
      question: "Which marketing slogan would you associate with Sprite?",
      optionA: "Twist the cap to refreshment",
      optionB: "Obey your thirst",
      optionC: "It's the real thing",
      optionD: "Open Happiness",
      key: "B",
    },
    {
      question: "What is the marketing slogan of Mastercard?",
      optionA: "Everywhere you want to be",
      optionB: "Because Change Happens",
      optionC: "There are some things money can't buy",
      optionD: "The World's Local Bank",
      key: "C",
    },
    {
      question: "What is the marketing slogan of Apple?",
      optionA: "Don't Be Evil",
      optionB: "Challenge everything",
      optionC: "Make believe",
      optionD: "Think different",
      key: "D",
    },
    {
      question:
        "'It's the real thing' is a slogan associated with which drink brand?",
      optionA: "Gatorade",
      optionB: "Dr. Pepper",
      optionC: "Coca Cola",
      optionD: "Sunny Delight",
      key: "C",
    },
    {
      question:
        "'Think big' is a slogan associated with which technology brand?",
      optionA: "Motorola",
      optionB: "Nokia",
      optionC: "Sony",
      optionD: "IMAX",
      key: "D",
    },
  ],
  // question 3 - General knowledge
  [
    {
      question:
        "What is the name given to the art of miniaturising trees and maintaining their small size?",
      optionA: "Bonsai",
      optionB: "Ornamental Shrubbery",
      optionC: "Decorage",
      optionD: "Topiary",
      key: "A",
    },
    {
      question:
        "What word is used in the NATO Phonetic Alphabet for the letter B?",
      optionA: "Boot",
      optionB: "Bravo",
      optionC: "Ball",
      optionD: "Baby",
      key: "B",
    },
    {
      question: "What Is A Female Goat Called?",
      optionA: "A Billy",
      optionB: "A Gertie",
      optionC: "A Nanny",
      optionD: "A Hattie",
      key: "C",
    },
    {
      question:
        "What word is used in the NATO Phonetic Alphabet for the letter D?",
      optionA: "Dog",
      optionB: "Danube",
      optionC: "Dig",
      optionD: "Delta",
      key: "D",
    },
    {
      question:
        "Which computer company was set up by Steven Jobs and Stephen Wozniak?",
      optionA: "Apple",
      optionB: "Blackberry",
      optionC: "Microsoft",
      optionD: "Google",
      key: "A",
    },
    {
      question: "In the field of psychiatry, which term means self-love?",
      optionA: "Greed",
      optionB: "Narcissism",
      optionC: "Ego",
      optionD: "Obsession",
      key: "B",
    },
    {
      question:
        "What Does The XP In The Operating System 'Windows XP' Actually Stand For?",
      optionA: "Expertise",
      optionB: "Extra Power",
      optionC: "Experience",
      optionD: "Express",
      key: "C",
    },
    {
      question: "What constellation is represented by scales?",
      optionA: "Aries",
      optionB: "Gemini",
      optionC: "Scorpio",
      optionD: "Libra",
      key: "D",
    },
    {
      question: "Who Make Macintosh Computers?",
      optionA: "Apple",
      optionB: "Microsoft",
      optionC: "Google",
      optionD: "Linux",
      key: "A",
    },
    {
      question:
        "Gangster Al Capone, boss of the Chicago underworld, was finally jailed for 11 years for what crime?",
      optionA: "Murder",
      optionB: "Tax evasion",
      optionC: "Fraud",
      optionD: "Bribery",
      key: "B",
    },
  ],
  // question 4 - General knowledge
  [
    {
      question: "What Is A Male Witch Known As?",
      optionA: "Warlock",
      optionB: "Mage",
      optionC: "Magus",
      optionD: "Magician",
      key: "A",
    },
    {
      question: "What were 'Little Boy' and 'Fat Man'?",
      optionA: "Race Horses",
      optionB: "Atom Bombs",
      optionC: "World War 2 Agents",
      optionD: "Intel CPU Names",
      key: "B",
    },
    {
      question:
        "What toy was released in 1957, creating an instant craze among children?",
      optionA: "Rubix Cube",
      optionB: "Slinky",
      optionC: "The Hula Hoop",
      optionD: "Pog",
      key: "C",
    },
    {
      question:
        "Who was the man convicted of masterminding the 1969 LaBianca-Tate murders?",
      optionA: "Ed Gein",
      optionB: "Ted Bundy",
      optionC: "Jim Jones",
      optionD: "Charles Manson",
      key: "D",
    },
    {
      question: "Where is Capitol Hill?",
      optionA: "Washington DC",
      optionB: "New York City",
      optionC: "Brussels",
      optionD: "Geneva",
      key: "A",
    },
    {
      question: "What is the basic unit of currency for Afghanistan?",
      optionA: "Dinar",
      optionB: "Afghani",
      optionC: "Rial",
      optionD: "Derum",
      key: "B",
    },
    {
      question:
        "Which word is defined as 'unintelligible or meaningless speech'?",
      optionA: "Gobbledygook",
      optionB: "Blatherskite",
      optionC: "Gibberish",
      optionD: "Flummox",
      key: "C",
    },
    {
      question:
        "Neil Armstrong And Buzz Aldrin Landed On The Moon But Who Stayed Behind In The Command Capsule?",
      optionA: "David Beckett",
      optionB: "Sam Norman",
      optionC: "Phillip Normandy",
      optionD: "Michael Collins",
      key: "D",
    },
    {
      question:
        "Who proclaimed Thanksgiving a national holiday in the USA in 1863?",
      optionA: "George Washington",
      optionB: "Ronald Regan",
      optionC: "Abraham Lincoln",
      optionD: "Thomas Jefferson",
      key: "C",
    },
    {
      question:
        "What word is used in the NATO Phonetic Alphabet for the letter L?",
      optionA: "Lame",
      optionB: "Loan",
      optionC: "Love",
      optionD: "Lima",
      key: "D",
    },
  ],
  // question 5 - Arts & Literature
  [
    {
      question: "Who was the author of 'A Christmas Carol'?",
      optionA: "Charles Dickens",
      optionB: "Thomas Hardy",
      optionC: "Jane Austen",
      optionD: "Edgar Allen Poe",
      key: "A",
    },
    {
      question:
        "Which 1950's art movement presented a challenge to traditions of fine art by including imagery from popular and mass culture?",
      optionA: "Dadaism",
      optionB: "Pop art",
      optionC: "Surrealism",
      optionD: "Cubism",
      key: "B",
    },
    {
      question: "What word describes a painting executed in a single color?",
      optionA: "Magenta",
      optionB: "Unicolor",
      optionC: "Monochrome",
      optionD: "Solohue",
      key: "C",
    },
    {
      question:
        "Which design style prevalent during the 1920s and 1930s was characterized by a sleek use of straight lines and slender forms?",
      optionA: "Cubism",
      optionB: "Surrealism",
      optionC: "Dadaism",
      optionD: "Art deco",
      key: "D",
    },
    {
      question:
        "What is the word for a composition made of cut and pasted pieces of materials?",
      optionA: "Collage",
      optionB: "Watercolor",
      optionC: "Sculpture",
      optionD: "Pointilism",
      key: "A",
    },
    {
      question:
        "Which artistic movement of the late eighteenth to mid-nineteenth century focused on emotion over reason, and on spontaneous expression?",
      optionA: "Realism",
      optionB: "Romanticism",
      optionC: "Nostalgia",
      optionD: "Kunboism",
      key: "B",
    },
    {
      question: "Which author wrote 'canon of Sherlock Holmes'?",
      optionA: "Agatha Christie",
      optionB: "Oscar Wilde",
      optionC: "Arthur Conan Doyle",
      optionD: "George Orwell",
      key: "C",
    },
    {
      question: "Which author wrote 'It'?",
      optionA: "H. P. Lovecraft",
      optionB: "Edgar Allan Poe",
      optionC: "Jack Vance",
      optionD: "Stephen King",
      key: "D",
    },
    {
      question: "Which author wrote 'The Lord of the Rings'?",
      optionA: "J. R. R. Tolkien",
      optionB: "G. K. Chesterton",
      optionC: "Philip Pullman",
      optionD: "C. S. Lewis",
      key: "A",
    },
    {
      question: "Which author wrote 'Romeo and Juliet'?",
      optionA: "Arthur C. Clarke",
      optionB: "William Shakespeare",
      optionC: "Isaac Newton",
      optionD: "Enid Blyton",
      key: "B",
    },
  ],
  // question 6 - Arts & Literature
  [
    {
      question: "In which book series does 'Edward Cullen' appear?",
      optionA: "Twilight",
      optionB: "Harry Potter",
      optionC: "The Hunger Games",
      optionD: "The Chronicles of Narnia",
      key: "A",
    },
    {
      question: "In which book series does 'Bella Swan' appear?",
      optionA: "Voyages Extraordinaires",
      optionB: "Twilight",
      optionC: "Harry Potter",
      optionD: "Percy Jackson & the Olympians",
      key: "B",
    },
    {
      question: "In which book series does 'Katniss Everdeen' appear?",
      optionA: "Voyages Extraordinaires",
      optionB: "Harry Potter",
      optionC: "The Hunger Games",
      optionD: "Mortal Engines Quartet",
      key: "C",
    },
    {
      question: "In which book series does Lord Voldemort appear?",
      optionA: "Voyages Extraordinaires",
      optionB: "Percy Jackson & the Olympians",
      optionC: "Twilight",
      optionD: "Harry Potter",
      key: "D",
    },
    {
      question: "In which book series does 'Frodo Baggins' appear?",
      optionA: "The Lord of the Rings",
      optionB: "The Godfather",
      optionC: "Harry Potter",
      optionD: "The Hunger Games",
      key: "A",
    },
    {
      question: "In which book series does 'Peter Pettigrew' appear?",
      optionA: "Voyages Extraordinaires",
      optionB: "Harry Potter",
      optionC: "Percy Jackson & the Olympians",
      optionD: "Twilight",
      key: "B",
    },
    {
      question: "In which book does 'Ali Baba' appear?",
      optionA: "Charlotte's Web",
      optionB: "Alice's Adventures in Wonderland",
      optionC: "One Thousand and One Nights",
      optionD: "The Snow Queen",
      key: "C",
    },
    {
      question: "In which book does the White Rabbit appear?",
      optionA: "Charlotte's Web",
      optionB: "The Hobbit",
      optionC: "Taras Bulba",
      optionD: "Alice's Adventures in Wonderland",
      key: "D",
    },
    {
      question: "In which book series does 'Lucy Pevensie' appear?",
      optionA: "Harry Potter",
      optionB: "The Neverending Story",
      optionC: "The Chronicles of Narnia",
      optionD: "Divergent",
      key: "C",
    },
    {
      question: "In which book does 'The Hatter' appear?",
      optionA: "Mio, My Son",
      optionB: "Jonathan Strange & Mr Norrell",
      optionC: "The Stand",
      optionD: "Through the Looking-Glass",
      key: "D",
    },
  ],
  // question 7 - Film & TV
  [
    {
      question: "Blade Runner was released in which year?",
      optionA: "1982",
      optionB: "1985",
      optionC: "1987",
      optionD: "1992",
      key: "A",
    },
    {
      question:
        "In which year was Pirates of the Caribbean: The Curse of the Black Pearl first released in the cinema?",
      optionA: "2002",
      optionB: "2003",
      optionC: "2004",
      optionD: "2005",
      key: "B",
    },
    {
      question: "In which year was The Usual Suspects released?",
      optionA: "1993",
      optionB: "1994",
      optionC: "1995",
      optionD: "1996",
      key: "C",
    },
    {
      question: "Raging Bull was released in which year?",
      optionA: "1965",
      optionB: "1970",
      optionC: "1975",
      optionD: "1980",
      key: "D",
    },
    {
      question: "In which year was Jurassic Park released?",
      optionA: "1993",
      optionB: "1994",
      optionC: "1995",
      optionD: "1996",
      key: "A",
    },
    {
      question: "Taxi Driver was released in which year?",
      optionA: "1975",
      optionB: "1976",
      optionC: "1977",
      optionD: "1978",
      key: "B",
    },
    {
      question: "In which year was Scarface released?",
      optionA: "1981",
      optionB: "1982",
      optionC: "1983",
      optionD: "1984",
      key: "C",
    },
    {
      question: "In which year was Toy Story first released in the cinema?",
      optionA: "1992",
      optionB: "1993",
      optionC: "1994",
      optionD: "1995",
      key: "D",
    },
    {
      question:
        "In which year was Back to the Future first released in the cinema?",
      optionA: "1985",
      optionB: "1986",
      optionC: "1987",
      optionD: "1988",
      key: "A",
    },
    {
      question: "In which year was Star Wars first released?",
      optionA: "1976",
      optionB: "1977",
      optionC: "1978",
      optionD: "1979",
      key: "B",
    },
  ],
  // question 8 - Film & TV
  [
    {
      question:
        "Name the movie that matches the following plot summary: 'A rat makes an unusual alliance with a young kitchen worker at a famous restaurant.'",
      optionA: "Ratatouille",
      optionB: "Amélie",
      optionC: "Eternal Sunshine of the Spotless Mind",
      optionD: "Aladdin",
      key: "A",
    },
    {
      question:
        "Name the movie that matches the following plot summary: 'A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.'",
      optionA: "Das Boot",
      optionB: "Dune",
      optionC: "Eternal Sunshine of the Spotless Mind",
      optionD: "Vertigo",
      key: "B",
    },
    {
      question:
        "Name the movie that matches the following plot summary: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler.'",
      optionA: "Warrior",
      optionB: "City Lights",
      optionC: "Mad Max: Fury Road",
      optionD: "Casino",
      key: "C",
    },
    {
      question:
        "Name the movie that matches the following plot summary: 'The story of how the scandal of child molestation within the Boston Catholic church was uncovered.'",
      optionA: "Django Unchained",
      optionB: "Trainspotting",
      optionC: "Catch Me If You Can",
      optionD: "Spotlight",
      key: "D",
    },
    {
      question:
        "Name the movie that matches the following plot summary: 'A family of undercover superheroes are forced into action to save the world.'",
      optionA: "The Incredibles",
      optionB: "The Sound of Music",
      optionC: "Gandhi",
      optionD: "12 Angry Men",
      key: "A",
    },
    {
      question:
        "Name the movie that matches the following plot summary: 'A small-time boxer gets a chance to fight the world heavyweight champion.'",
      optionA: "Amélie",
      optionB: "Rocky",
      optionC: "The Deer Hunter",
      optionD: "Schindler's List",
      key: "B",
    },
    {
      question:
        "Name the movie that matches the following plot summary: 'A killer shark unleashes chaos on a beach community.'",
      optionA: "The Silence of the Lambs",
      optionB: "The Good, the Bad and the Ugly",
      optionC: "Jaws",
      optionD: "Platoon",
      key: "C",
    },
    {
      question:
        "Name the movie that matches the following plot summary: 'A skilled forger and conman is pursued by an FBI agent.'",
      optionA: "American History X",
      optionB: "Logan",
      optionC: "American Beauty",
      optionD: "Catch Me If You Can",
      key: "D",
    },
    {
      question:
        "Name the movie that matches the following plot summary: 'When a serial killer murders key political figures, a vigilante is forced to intervene.'",
      optionA: "Rocky",
      optionB: "Die Hard",
      optionC: "The Batman",
      optionD: "The Good, the Bad and the Ugly",
      key: "C",
    },
    {
      question:
        "Name the movie that matches the following plot summary: 'After his father goes missing, a professor finds himself in a search for the Holy Grail.'",
      optionA: "The Godfather",
      optionB: "Spotlight",
      optionC: "The Green Mile",
      optionD: "Indiana Jones and the Last Crusade",
      key: "D",
    },
  ],
  // question 9 - Science
  [
    {
      question:
        "Which system of counting uses the numbers 0-9 and the letters a-f?",
      optionA: "Hexadecimal",
      optionB: "Numerolettering",
      optionC: "Binary",
      optionD: "Ternary",
      key: "A",
    },
    {
      question: "What chemical has the formula NaCI?",
      optionA: "Calcium magnesium carbonate",
      optionB: "Sodium chloride",
      optionC: "Trichloromethane",
      optionD: "Iron Oxide",
      key: "B",
    },
    {
      question: "What chemical has the formula CH4?",
      optionA: "Potassium nitrate",
      optionB: "Iron Oxide",
      optionC: "Methane",
      optionD: "Calcium sulphate dihydrate",
      key: "C",
    },
    {
      question: "What is the common name for nitrous oxide?",
      optionA: "Cream of tartar",
      optionB: "Chloroform",
      optionC: "Limestone",
      optionD: "Laughing gas",
      key: "D",
    },
    {
      question: "What is solid carbon dioxide commonly known as?",
      optionA: "Dry Ice",
      optionB: "Chloroform",
      optionC: "Baking Soda",
      optionD: "Epsom salt",
      key: "A",
    },
    {
      question: "What is trichloromethane commonly known as?",
      optionA: "Table Salt",
      optionB: "Chloroform",
      optionC: "Saltpetre",
      optionD: "Heavy water",
      key: "B",
    },
    {
      question: "What would you call a baby wombat?",
      optionA: "A Cygnet",
      optionB: "A Farrow",
      optionC: "A Joey",
      optionD: "A Caterpillar",
      key: "C",
    },
    {
      question: "What is a baby spider known as?",
      optionA: "A Joey",
      optionB: "A Leveret",
      optionC: "A Codling",
      optionD: "A Spiderling",
      key: "D",
    },
    {
      question: "What is the word for a male horse?",
      optionA: "A Stallion",
      optionB: "A Jack",
      optionC: "A Boar",
      optionD: "A Cob",
      key: "A",
    },
    {
      question: "A female cat is known as what?",
      optionA: "A Worker",
      optionB: "A Queen",
      optionC: "A Soar",
      optionD: "A Pen",
      key: "B",
    },
  ],
  // question 10 - Society & Culture
  [
    {
      question: "Which of these brands has a swan on its logo?",
      optionA: "Swarovski",
      optionB: "Mustang",
      optionC: "Ferrari",
      optionD: "Bacardi",
      key: "A",
    },
    {
      question:
        "Which animal would you associate with the American Airlines logo?",
      optionA: "Bat",
      optionB: "Eagle",
      optionC: "Bull",
      optionD: "Elephant",
      key: "B",
    },
    {
      question: "Which of these brands has a penguin on its logo?",
      optionA: "Qantas",
      optionB: "Playboy",
      optionC: "Linux",
      optionD: "Bacardi",
      key: "C",
    },
    {
      question: "Which of these brands has a horse on its logo?",
      optionA: "Smirnoff",
      optionB: "ING Group",
      optionC: "Swarovski",
      optionD: "Mustang",
      key: "D",
    },
    {
      question: "Which animal would you associate with the Twitter logo?",
      optionA: "Bird",
      optionB: "Kangaroo",
      optionC: "Lion",
      optionD: "Elephant",
      key: "A",
    },
    {
      question: "Which of these brands has a panda on its logo?",
      optionA: "Duolingo",
      optionB: "World Wildlife Fund",
      optionC: "NBC",
      optionD: "Mustang",
      key: "B",
    },
    {
      question: "The Model 3 is a model of car made by which manufacturer?",
      optionA: "Ford",
      optionB: "Aston Martin",
      optionC: "Tesla",
      optionD: "Bugatti",
      key: "C",
    },
    {
      question: "Which car manufacturer made the DB5?",
      optionA: "Toyota",
      optionB: "Austin",
      optionC: "Volkswagen",
      optionD: "Aston Martin",
      key: "D",
    },
    {
      question: "The Phantom is a model of car made by which manufacturer?",
      optionA: "AC",
      optionB: "Aston Martin",
      optionC: "Rolls-Royce",
      optionD: "Fiat",
      key: "C",
    },
    {
      question: "Which of these is a model of car made by Toyota?",
      optionA: "Giulietta",
      optionB: "Escalade",
      optionC: "Veyron",
      optionD: "Camry",
      key: "D",
    },
  ],
  // question 11 - Society & Culture
  [
    {
      question:
        "Which influential historical person was an industrialist who revolutionised mass-production techniques?",
      optionA: "Henry Ford",
      optionB: "Joseph Stalin",
      optionC: "St. Augustine",
      optionD: "Christopher Columbus",
      key: "A",
    },
    {
      question:
        "Which influential historical person was leader of the Russian Revolution and new Communist regime from 1917 to 1924?",
      optionA: "St. Paul",
      optionB: "Lenin",
      optionC: "Stalin",
      optionD: "Gorbachev",
      key: "B",
    },
    {
      question: "Which of the following describes John F. Kennedy?",
      optionA: "Developed the world's first vaccine (for smallpox)",
      optionB: "Italian explorer who landed in America",
      optionC: "38th President of the USA",
      optionD: "Dictator of Nazi Germany",
      key: "C",
    },
    {
      question:
        "Which influential historical person was the author of Tao Te Ching and founder of Taoism?",
      optionA: "Zoroaster",
      optionB: "Mao Zedong",
      optionC: "Sun Tzu",
      optionD: "Lao Tzu",
      key: "D",
    },
    {
      question: "Which influential physicist discovered X-rays?",
      optionA: "Wilhelm Conrad Roentgen",
      optionB: "Menes",
      optionC: "Gregory Pincus",
      optionD: "Max Planck",
      key: "A",
    },
    {
      question:
        "Which influential historical person was the 3rd President of the USA and the principle author of the US Declaration of Independence?",
      optionA: "George Washington",
      optionB: "Thomas Jefferson",
      optionC: "Abraham Lincoln",
      optionD: "Ronald Reagan",
      key: "B",
    },
    {
      question:
        "Which influential scientist and friar founded the modern science of genetics?",
      optionA: "James Clerk Maxwell",
      optionB: "Albert Einstein",
      optionC: "Gregor Mendel",
      optionD: "Enrico Fermi",
      key: "C",
    },
    {
      question:
        "Which influential theoretical physicist was one of the pioneers of Quantum mechanics?",
      optionA: "Stephen Hawking",
      optionB: "Gregor Mendel",
      optionC: "Leonhard Euler",
      optionD: "Werner Heisenberg",
      key: "D",
    },
    {
      question:
        "Which influential philosopher and mathematician famously said “I think, therefore I am.”?",
      optionA: "Rene Descartes",
      optionB: "Menes",
      optionC: "Blaise Pascal",
      optionD: "Leonard Euler",
      key: "A",
    },
    {
      question:
        "Which influential historical person was a French military and political leader in the late 18th and early 19th centuries?",
      optionA: "Vasco da Gama",
      optionB: "Napoleon Bonaparte",
      optionC: "Louis XVI",
      optionD: "Charles de Gaulle",
      key: "B",
    },
  ],
  // question 12 - Geography
  [
    
    {
      question:
        "Lviv is a city in which country?",
      optionA: "Ukraine",
      optionB: "Azerbaijan",
      optionC: "Pakistan",
      optionD: "Kazakhstan",
      key: "A",
    },
    {
      question:
        "Which of these cities is in Bangladesh?",
      optionA: "Busan",
      optionB: "Dhaka",
      optionC: "Petaling Jaya",
      optionD: "Phnom Penh",
      key: "B",
    },
    {
      question:
        "In which country is the city of Alexandria?",
      optionA: "Qatar",
      optionB: "Lebanon",
      optionC: "Egypt",
      optionD: "Saudi Arabia",
      key: "C",
    },
    {
      question:
        "Where would you find the city of Hanoi?",
      optionA: "Bangladesh",
      optionB: "Cambodia",
      optionC: "South Korea",
      optionD: "Vietnam",
      key: "D",
    },
    {
      question:
        "In which country is the city of Guadalajara?",
      optionA: "Mexico",
      optionB: "Cuba",
      optionC: "Paraguay",
      optionD: "Chile",
      key: "A",
    },
    {
      question:
        "In which country is the city of Jeddah?",
      optionA: "Turkey",
      optionB: "Saudi Arabia",
      optionC: "Qatar",
      optionD: "Jordan",
      key: "B",
    },
    {
      question:
        "Which of these cities is in Taiwan?",
      optionA: "Wellington",
      optionB: "Busan",
      optionC: "Taichung",
      optionD: "Kuala Lumpur",
      key: "C",
    },
    {
      question:
        "Which of these cities is in Vietnam?",
      optionA: "Yangon",
      optionB: "Jakarta",
      optionC: "Chittagong",
      optionD: "Ho Chi Minh City",
      key: "D",
    },
    {
      question:
        "Haifa is a city in which country?",
      optionA: "Qatar",
      optionB: "Bahrain",
      optionC: "Israel",
      optionD: "Iran",
      key: "C",
    },
    {
      question:
        "Which of these cities is in India?",
      optionA: "Canberra",
      optionB: "Taipei",
      optionC: "Melbourne",
      optionD: "Chennai",
      key: "D",
    },
  ],
  // question 13 - Sports & Leisure
  [
    {
      question:
        "In a nine-ball pool set what colour is the number 2 ball?",
      optionA: "Blue",
      optionB: "Yellow",
      optionC: "Purple",
      optionD: "Red",
      key: "A",
    },
    {
      question:
        "Which legendary games designer/producer created the Super Mario Brothers franchise for Nintendo?",
      optionA: "Yu Suzuki",
      optionB: "Shigeru Miyamoto",
      optionC: "Satoru Iwata",
      optionD: "Gunpei Yokoi",
      key: "B",
    },
    {
      question:
        "What word is used for a score of 0 in a game of tennis?",
      optionA: "Egg",
      optionB: "Zilch",
      optionC: "Love",
      optionD: "Nil",
      key: "C",
    },
    {
      question:
        "What is the nickname of the English football team Cardiff City?",
      optionA: "Cottagers",
      optionB: "Wolves",
      optionC: "The Tykes",
      optionD: "The Bluebirds",
      key: "D",
    },
    {
      question:
        "Which country developed Tae-Kwan-Do?",
      optionA: "Korea",
      optionB: "Japan",
      optionC: "China",
      optionD: "Russia",
      key: "A",
    },
    {
      question:
        "Which Record Breaking Video Game Character Made It's Debut in May 1980?",
      optionA: "Sonic The Hedgehog",
      optionB: "Pac-Man",
      optionC: "Mario",
      optionD: "Lara Croft",
      key: "B",
    },
    {
      question:
        "If you're killing a goomba, what game are you playing?",
      optionA: "Zelda",
      optionB: "Call of Duty",
      optionC: "Super Mario Bros",
      optionD: "Halo",
      key: "C",
    },
    {
      question:
        `What does the acronym "NES" stand for?`,
      optionA: "Natural Emitting Screen",
      optionB: "Near Energy Source",
      optionC: "Nebulous Endocrine Station",
      optionD: "Nintendo Entertainment System",
      key: "D",
    },
    {
      question:
        "Why was Mike Tyson fined $3 million by the boxing association in 1997?",
      optionA: "He bit off an opponent's ear",
      optionB: "He was found to be doping",
      optionC: "He had cocaine detected during a drugs test",
      optionD: "Match fixing",
      key: "A",
    },
    {
      question:
        "Which weight division in boxing lies between flyweight and featherweight?",
      optionA: "Heavyweight",
      optionB: "Bantamweight",
      optionC: "Lightweight",
      optionD: "Subweight",
      key: "B",
    },
  ],
  // question 14 - Music
  [
    {
      question:
        "Which British rock band released the song 'I Want It All'?",
      optionA: "Queen",
      optionB: "Level 42",
      optionC: "Deep Purple",
      optionD: "Feeder",
      key: "A",
    },
    {
      question:
        "Which of these is a stringed instrument?",
      optionA: "Ocarina",
      optionB: "Ukelele",
      optionC: "Clarinet",
      optionD: "Castanets",
      key: "B",
    },
    {
      question:
        "Who had a hit in 1985 with Take on Me?",
      optionA: "Haddaway",
      optionB: "Biz Markie",
      optionC: "a-ha",
      optionD: "Bobby McFerrin",
      key: "C",
    },
    {
      question:
        "'Mickey' was a one hit wonder in 1982 by which artist?",
      optionA: "Wild Cherry",
      optionB: "Edwyn Collins",
      optionC: "Terry Jacks",
      optionD: "Toni Basil",
      key: "D",
    },
    {
      question:
        "'Is this the real life, is this just fantasy', is the opening line of which hit song?",
      optionA: "Bohemian Rhapsody",
      optionB: "Good Vibrations",
      optionC: "Help!",
      optionD: "Wish You Were Here",
      key: "A",
    },
    {
      question:
        "Which band includes 'Anni-Frid Lyngstad'?",
      optionA: "In Flames",
      optionB: "ABBA",
      optionC: "HammerFall",
      optionD: "Katatonia",
      key: "B",
    },
    {
      question:
        "Which band includes 'John Lennon'?",
      optionA: "Deep Purple",
      optionB: "Feeder",
      optionC: "The Beatles",
      optionD: "Uriah Heep",
      key: "C",
    },
    {
      question:
        "Which English rock band released the song 'Come Together'?",
      optionA: "Deep Purple",
      optionB: "Feeder",
      optionC: "Uriah Heep",
      optionD: "The Beatles",
      key: "D",
    },
    {
      question:
        "Which band includes 'Lemmy'?",
      optionA: "Deep Purple",
      optionB: "Feeder",
      optionC: "Motörhead",
      optionD: "Cheap Trick",
      key: "C",
    },
    {
      question:
        "Which American rock band released the song 'God Only Knows'?",
      optionA: "Swans",
      optionB: "Three 6 Mafia",
      optionC: "The Velvet Underground",
      optionD: "The Beach Boys",
      key: "D",
    },
  ],
  // question 15 - History
  [
    {
      question:
        "In which year was the first video uploaded to YouTube?",
      optionA: "2005",
      optionB: "2004",
      optionC: "2003",
      optionD: "2002",
      key: "A",
    },
    {
      question:
        "In which year was the Compact Disc invented?",
      optionA: "1975",
      optionB: "1980",
      optionC: "1985",
      optionD: "1988",
      key: "B",
    },
    {
      question:
        "When was the first movie with sound?",
      optionA: "1918",
      optionB: "1923",
      optionC: "1927",
      optionD: "1930",
      key: "C",
    },
    {
      question:
        "In which year was the first commercial jet flight?",
      optionA: "1928",
      optionB: "1936",
      optionC: "1944",
      optionD: "1952",
      key: "D",
    },
    {
      question:
        "When was the Live Aid concert?",
      optionA: "1985",
      optionB: "1986",
      optionC: "1987",
      optionD: "1988",
      key: "A",
    },
    {
      question:
        "In which year was the digital camera invented?",
      optionA: "1957",
      optionB: "1975",
      optionC: "1969",
      optionD: "1963",
      key: "B",
    },
    {
      question:
        "When was the first SMS message sent?",
      optionA: "1987",
      optionB: "1990",
      optionC: "1992",
      optionD: "1994",
      key: "C",
    },
    {
      question:
        "In which year was GPS invented?",
      optionA: "1956",
      optionB: "1962",
      optionC: "1968",
      optionD: "1974",
      key: "D",
    },
    {
      question:
        "When was the first email sent?",
      optionA: "1971",
      optionB: "1964",
      optionC: "1978",
      optionD: "1957",
      key: "A",
    },
    {
      question:
        "When was the first mobile phone conversation?",
      optionA: "1984",
      optionB: "1973",
      optionC: "1963",
      optionD: "1949",
      key: "B",
    },
  ],
];

export default questionsList;