import fetch from '../utils/Fetch';

const Glossary = {
    getAllGlossaries: () => fetch({ method: 'GET', path: '/glossaries' }),
    updateGlossary: (word, params) => fetch({method: 'POST', path: '/glossary/' + word.toLowerCase(), params }),
    queryGlossary: word => fetch({method: 'GET', path: '/glossary/' + word.toLowerCase()})
};

export default {
    Glossary,
};