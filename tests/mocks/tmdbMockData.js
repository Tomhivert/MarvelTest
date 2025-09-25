const mockMovieWithCredits = {
  id: 1726,
  title: 'Iron Man',
  overview: 'After being held captive in an Afghan cave...',
  release_date: '2008-05-02',
  credits: {
    id: 1726,
    cast: [
      {
        id: 3223,
        name: 'Robert Downey Jr.',
        character: 'Tony Stark / Iron Man',
        order: 0
      },
      {
        id: 12835,
        name: 'Gwyneth Paltrow',
        character: 'Pepper Potts',
        order: 1
      }
    ]
  }
};

const mockMovieWithMultipleCharacters = {
  id: 99861,
  title: 'Avengers: Age of Ultron',
  overview: 'When Tony Stark tries to jumpstart...',
  release_date: '2015-05-01',
  credits: {
    id: 99861,
    cast: [
      {
        id: 3223,
        name: 'Robert Downey Jr.',
        character: 'Tony Stark / Iron Man',
        order: 0
      },
      {
        id: 3223,
        name: 'Robert Downey Jr.',
        character: 'The Vision', // Different character
        order: 10
      },
      {
        id: 1896,
        name: 'Chris Evans',
        character: 'Steve Rogers / Captain America',
        order: 1
      }
    ]
  }
};

const mockActorWithSameCharacterMultipleMovies = [
  {
    id: 1726,
    title: 'Iron Man',
    credits: {
      id: 1726,
      cast: [
        {
          id: 1269,
          name: 'Chris Hemsworth',
          character: 'Thor',
          order: 0
        }
      ]
    }
  },
  {
    id: 10195,
    title: 'Thor',
    credits: {
      id: 10195,
      cast: [
        {
          id: 1269,
          name: 'Chris Hemsworth',
          character: 'Thor',
          order: 0
        }
      ]
    }
  }
];

const mockCharacterWithMultipleActors = {
  id: 271110,
  title: 'Captain America: Civil War',
  overview: 'Following the events of Age of Ultron...',
  release_date: '2016-05-06',
  credits: {
    id: 271110,
    cast: [
      {
        id: 1896,
        name: 'Chris Evans',
        character: 'Spider-Man',
        order: 0
      },
      {
        id: 1136406,
        name: 'Tom Holland',
        character: 'Spider-Man', // Same character, different actor
        order: 1
      }
    ]
  }
};

module.exports = {
  mockMovieWithCredits,
  mockMovieWithMultipleCharacters,
  mockActorWithSameCharacterMultipleMovies,
  mockCharacterWithMultipleActors
};
