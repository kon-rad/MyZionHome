// The guest library. Each collection maps to a shelf photo in public/media/books/.
// `year` is the first publication year of the work, not of the edition on the shelf.

export type Book = {
  title: string;
  author: string;
  year: number | null; // null when not yet confirmed
  summary: string; // three sentences
};

export type Collection = {
  id: string;
  name: string;
  blurb: string;
  photo: string;
  books: Book[];
};

export const LIBRARY: Collection[] = [
  {
    id: "code",
    name: "Code & Computer Science",
    blurb: "The programming shelf: languages, craft, and the ideas underneath them.",
    photo: "/media/books/DSCF0224.jpg",
    books: [
      {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        year: 2011,
        summary:
          "A ground-up tour of JavaScript that treats programming as a way of thinking, not a list of syntax. It moves from values and functions through data structures and asynchronous code to building real projects. The later editions add modern language features and exercises you can run in the browser.",
      },
      {
        title: "The C Programming Language",
        author: "Brian Kernighan & Dennis Ritchie",
        year: 1978,
        summary:
          "The definitive introduction to C, written by the language's creator and his colleague at Bell Labs. Its tight prose and small worked examples became the model for programming books. It still teaches how memory, pointers, and the machine really behave.",
      },
      {
        title: "Structure and Interpretation of Computer Programs",
        author: "Harold Abelson & Gerald Jay Sussman",
        year: 1985,
        summary:
          "MIT's legendary introductory text, taught in Scheme, that uses abstraction as the organizing idea of all programming. It builds interpreters, simulators, and a register machine from first principles. Readers come away thinking about programs as things that describe processes.",
      },
      {
        title: "Gödel, Escher, Bach",
        author: "Douglas Hofstadter",
        year: 1979,
        summary:
          "A playful, sprawling book that weaves together logic, music, and art to explain how self-reference can give rise to meaning. Dialogues between Achilles and the Tortoise introduce each idea before the essays dig in. It won the 1980 Pulitzer Prize and remains a touchstone for thinking about minds and machines.",
      },
      {
        title: "Hacker's Delight",
        author: "Henry S. Warren Jr.",
        year: 2002,
        summary:
          "A collection of low-level tricks for arithmetic, bit manipulation, and clever machine-level shortcuts. Each trick comes with its derivation, so it doubles as a lesson in how computers represent numbers. It is a favorite of compiler writers and anyone who enjoys squeezing out a few instructions.",
      },
      {
        title: "Coders at Work",
        author: "Peter Seibel",
        year: 2009,
        summary:
          "Seibel interviews fifteen accomplished programmers, including Jamie Zawinski, Donald Knuth, and Ken Thompson. He asks each how they learned, debug, read code, and decide what makes a good programmer. The result is an oral history of the craft rather than a technical manual.",
      },
      {
        title: "The Secret Life of Programs",
        author: "Jonathan E. Steinhart",
        year: 2019,
        summary:
          "A guided look beneath the hood, from binary numbers and logic gates to compilers, networks, and operating systems. It is aimed at people who write software but were never taught how the hardware actually works. Each chapter ties everyday devices back to the fundamentals.",
      },
      {
        title: "Programming iOS 14",
        author: "Matt Neuburg",
        year: 2020,
        summary:
          "A comprehensive O'Reilly guide to building iPhone and iPad apps in Swift with UIKit. It covers views, controllers, animation, networking, and the app lifecycle in depth. It is the reference to reach for when an iOS API behaves in a way you did not expect.",
      },
      {
        title: "The Code Book",
        author: "Simon Singh",
        year: 1999,
        summary:
          "A history of secret writing, from Mary Queen of Scots' doomed cipher to the Enigma machine and modern public-key cryptography. Singh explains each breakthrough through the people who made and broke the codes. It ends with quantum cryptography and the ongoing contest between privacy and surveillance.",
      },
    ],
  },
  {
    id: "ai",
    name: "AI & Machine Learning",
    blurb: "How machines learn, and what happens when they get very good at it.",
    photo: "/media/books/DSCF0225.jpg",
    books: [
      {
        title: "Deep Learning with Python",
        author: "François Chollet",
        year: 2017,
        summary:
          "Written by the creator of Keras, this book teaches deep learning through hands-on code rather than heavy math. It covers computer vision, text, and generative models with clear intuitions for why each technique works. It is one of the most readable on-ramps to neural networks.",
      },
      {
        title: "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow",
        author: "Aurélien Géron",
        year: 2017,
        summary:
          "A practical, project-driven guide that starts with classic machine learning and works up to deep neural networks. Every chapter pairs concepts with runnable code and exercises on real datasets. It is widely used as both a course text and a working reference.",
      },
      {
        title: "The Master Algorithm",
        author: "Pedro Domingos",
        year: 2015,
        summary:
          "Domingos surveys the five main schools of machine learning: symbolists, connectionists, evolutionaries, Bayesians, and analogizers. He argues that a single unifying learning algorithm may exist and would change every field it touches. It is written for general readers who want the big picture without the math.",
      },
      {
        title: "Superintelligence",
        author: "Nick Bostrom",
        year: 2014,
        summary:
          "Bostrom examines the ways a machine intelligence could surpass humans and the paths by which that might happen. He focuses on the control problem: how to make sure such a system's goals stay aligned with ours. It helped bring AI safety into mainstream conversation.",
      },
    ],
  },
  {
    id: "lives",
    name: "Inventors, Founders & Ideas",
    blurb: "Biographies and histories of the people and companies that built the modern world.",
    photo: "/media/books/DSCF0227.jpg",
    books: [
      {
        title: "The Innovators",
        author: "Walter Isaacson",
        year: 2014,
        summary:
          "A history of the digital revolution told through the collaborations of Ada Lovelace, Alan Turing, the ENIAC team, and the founders of the internet and Silicon Valley. Isaacson argues that innovation comes from teams more than lone geniuses. It runs from the first computers to the modern web.",
      },
      {
        title: "Einstein: His Life and Universe",
        author: "Walter Isaacson",
        year: 2007,
        summary:
          "A biography that follows Einstein from a rebellious student to the physicist who reshaped our understanding of space and time. Isaacson draws on newly opened letters to show his personal life alongside the science. It explains why his curiosity and nonconformity mattered as much as his math.",
      },
      {
        title: "Benjamin Franklin: An American Life",
        author: "Walter Isaacson",
        year: 2003,
        summary:
          "A portrait of Franklin as printer, scientist, inventor, diplomat, and founding father. The book follows his rise from a Boston apprenticeship to helping shape a new nation. Isaacson pays particular attention to his pragmatism and his habit of constant self-improvement.",
      },
      {
        title: "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
        author: "Ashlee Vance",
        year: 2015,
        summary:
          "The first major biography of Musk, based on extensive interviews with him, his family, and his colleagues. It traces his path from South Africa through PayPal to Tesla and SpaceX. Vance shows both the ambition and the toll it takes on the people around him.",
      },
      {
        title: "Facebook: The Inside Story",
        author: "Steven Levy",
        year: 2020,
        summary:
          "Levy had unusual access to Mark Zuckerberg and other executives for this account of how Facebook grew from a dorm-room project into a global platform. It covers the product decisions, the privacy failures, and the political fallout. The book is a detailed look at how a company can scale faster than its judgment.",
      },
      {
        title: "Creativity, Inc.",
        author: "Ed Catmull",
        year: 2014,
        summary:
          "Pixar's co-founder describes how the studio built a culture that protects creative work from fear and bureaucracy. He shares specific practices, such as the Braintrust, that helped the company recover from failures. The lessons apply well beyond animation.",
      },
      {
        title: "Out of Control",
        author: "Kevin Kelly",
        year: 1994,
        summary:
          "Kelly explores how biology, machines, and economies increasingly share the same logic of decentralized, self-organizing systems. He draws on swarms, ecosystems, and early networks to argue that bottom-up control beats top-down design. It was an early and influential map of ideas that later shaped internet culture.",
      },
      {
        title: "The Ascent of Man",
        author: "Jacob Bronowski",
        year: 1973,
        summary:
          "Based on the BBC television series, it traces human progress through science, art, and invention, from early tools to modern physics. Bronowski writes with a humanist's eye, linking discoveries to the people who made them. It argues that knowledge is a shared human achievement.",
      },
    ],
  },
  {
    id: "work",
    name: "Work, Teams & Systems",
    blurb: "How software organizations actually ship, and how to build a working life.",
    photo: "/media/books/DSCF0226.jpg",
    books: [
      {
        title: "The Phoenix Project",
        author: "Gene Kim, Kevin Behr & George Spafford",
        year: 2013,
        summary:
          "A novel about an IT manager handed a failing, high-stakes software project and given a short time to rescue it. Through the story it introduces the principles of DevOps: flow, feedback, and continual learning. It is often given to new managers because it makes operations problems feel human.",
      },
      {
        title: "The Unicorn Project",
        author: "Gene Kim",
        year: 2019,
        summary:
          "A companion novel to The Phoenix Project, told from the point of view of a senior developer sent into exile after a corporate disaster. It follows her as she rebuilds trust and technical practice across a struggling company. The story lays out five ideals for productive engineering work.",
      },
      {
        title: "Accelerate",
        author: "Nicole Forsgren, Jez Humble & Gene Kim",
        year: 2018,
        summary:
          "The authors present multi-year research showing which practices separate high-performing software teams from the rest. They identify measurable capabilities, such as deployment frequency and lead time, that predict both delivery and business outcomes. It gives managers evidence rather than opinion.",
      },
      {
        title: "The 4-Hour Work Week",
        author: "Timothy Ferriss",
        year: 2007,
        summary:
          "Ferriss argues that people can escape the standard career by automating income, cutting low-value work, and designing life around freedom rather than retirement. He offers tactics for outsourcing, negotiating remote work, and building small businesses. It became a defining book for the lifestyle-design movement.",
      },
      {
        title: "Critical Path",
        author: "R. Buckminster Fuller",
        year: 1981,
        summary:
          "Fuller lays out his view of humanity's history and its future, arguing that resources are sufficient if used with design intelligence. He connects shipping, energy, and technology to the long arc of social change. It is dense and idiosyncratic, and a good look at his systems thinking.",
      },
    ],
  },
  {
    id: "classics",
    name: "Classics & Languages",
    blurb: "Old questions and a few phrases for the road.",
    photo: "/media/books/DSCF0223.jpg",
    books: [
      {
        title: "Plato: Complete Works",
        author: "Plato, edited by John M. Cooper",
        year: 1997,
        summary:
          "The full surviving corpus of Plato's dialogues and letters in a single volume, from the Republic and the Symposium to the Apology. Socrates and his interlocutors take on justice, love, knowledge, and the good life through argument. The Hackett edition gathers the standard English translations under one cover.",
      },
      {
        title: "The Odyssey",
        author: "Homer",
        year: -700,
        summary:
          "The epic of Odysseus's ten-year journey home from the Trojan War, facing monsters, temptations, and the gods' anger. Back in Ithaca, his wife Penelope and son Telemachus hold off suitors who have overrun the household. It is one of the oldest and most influential stories in Western literature.",
      },
      {
        title: "Lonely Planet Mandarin Phrasebook",
        author: "Lonely Planet",
        year: null,
        summary:
          "A pocket phrasebook with essential Mandarin for travelers, including greetings, directions, food, and emergencies. Phrases are given in characters and pinyin, with pronunciation guides. Check the copyright page on the shelf copy for the edition year.",
      },
    ],
  },
];

export const formatYear = (y: number | null) =>
  y === null ? "Year TBC" : y < 0 ? `c. ${Math.abs(y)} BCE` : String(y);
