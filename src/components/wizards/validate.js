import validateUtil from '../../util/validate';

const config = {
  immatriculation: {
    types: {
      required: true,
      match: /^[A-Z0-9]+$/,
    },
    message: 'Geben Sie hier die Immatrikulation des Flugzeugs ein. ' +
    'Sie darf nur Grossbuchstaben und Zahlen enthalten.',
  },
  aircraftType: {
    types: {
      required: true,
    },
    message: 'Geben Sie hier den Typ des Flugzeugs ein.',
  },
  mtow: {
    types: {
      required: true,
      integer: true,
    },
    message: 'Geben Sie hier das maximale Abfluggewicht des Flugzeugs ein (in Kilogramm).',
  },
  lastname: {
    types: {
      required: true,
    },
    message: 'Geben Sie hier den Nachnamen des Piloten ein.',
  },
  firstname: {
    types: {
      required: true,
    },
    message: 'Geben Sie hier den Vornamen des Piloten ein.',
  },
  date: {
    types: {
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    message: 'Geben Sie hier das Datum ein.',
  },
  time: {
    types: {
      required: true,
      match: /^\d{2}:\d{2}$/,
    },
    message: 'Geben Sie hier die Startzeit in Stunden und Minuten ein (Lokalzeit).',
  },
  location: {
    types: {
      required: true,
    },
    message: 'Geben Sie hier den Zielflugplatz ein. Wenn der Flugplatz ein ICAO-Kürzel besitzt,' +
    'verwenden Sie dieses.',
  },
  duration: {
    types: {
      required: true,
      match: /^\d{2}:\d{2}$/,
    },
    message: 'Geben Sie hier die Dauer des Fluges in Stunden und Minuten ein.',
  },
  flightType: {
    types: {
      required: true,
      values: ['private', 'commercial', 'instruction'],
    },
    message: 'Wählen Sie hier den Typ des Fluges aus.',
  },
  runway: {
    types: {
      required: true,
      values: ['06', '24'],
    },
    message: 'Wählen Sie hier die Pistenrichtung für den Abflug aus.',
  },
  departureRoute: {
    types: {
      required: true,
      values: ['south', 'matzingen', 'circuits'],
    },
    message: 'Wählen Sie hier die Abflugroute aus.',
  },
  arrivalRoute: {
    types: {
      required: true,
      values: ['north', 'south', 'circuits'],
    },
    message: 'Wählen Sie hier die Ankunftsroute aus.',
  },
  landingCount: {
    types: {
      required: true,
      integer: true,
    },
    message: 'Geben Sie hier die Anzahl Landungen ein.',
  },
};

const getConfig = (fields = []) => Object.keys(config)
  .filter(key => fields.includes(key))
  .reduce((obj, key) => {
    obj[key] = config[key];
    return obj;
  }, {});

const validate = fields => values => {
  const errorArr = validateUtil(values, getConfig(fields));

  const errors = {};

  errorArr.forEach(error => {
    errors[error.key] = error.message;
  });

  return errors;
};

export default validate;
