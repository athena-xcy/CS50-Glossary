import fetch from '../utils/Fetch';

const Glossary = {
    getAllGlossaries: () => fetch({ method: 'GET', path: '/glossaries' }),
    updateGlossary: params => fetch({method: 'POST', path: '/glossary', params }),
    queryGlossary: word => fetch({method: 'GET', path: '/glossary?word=' + word.toLowerCase()})
};

export default {
    Glossary,
};
