import fetch from '../utils/Fetch';

const Glossary = {
    getAllGlossaries: () => fetch({ method: 'GET', path: '/glossary_complete' }),
    getPaginatedGlossries: (pageSize, currentPage) => fetch({method: 'GET', path: `/glossaries?ps=${pageSize}&pg=${currentPage}`}),
    updateGlossary: params => fetch({method: 'POST', path: '/glossary', params }),
    queryGlossary: word => fetch({method: 'GET', path: '/glossary?word=' + word.toLowerCase()})
};

export default {
    Glossary,
};
