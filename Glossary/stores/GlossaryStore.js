import { observable, action } from 'mobx';
import { BaseStore, getOrCreateStore } from 'next-mobx-wrapper';
import agent from './Agent'

class GlossaryStore extends BaseStore {
    @observable allGlossaries = {};
    @observable word = null;
    @observable glossary = {};
    @observable isloading = false;

    @action async getAllGlossaries() {
        return await agent.Glossary.getAllGlossaries()
            .then(action(response => {
                console.log(response);
                this.allGlossaries = response.result;
                return response;
            }));
    }

    @action async updateGlossary(word, params) {
        this.isloading = true;
        return await agent.Glossary.updateGlossary(word, params)
            .then(action((response) => {
                this.isloading = false;
                if (response.errno == 0) {
                    this.glossary = response.result;
                    this.getAllGlossaries();
                }
                return response;
            }));
    }

    @action async setWord(word) {
        this.word = word;
        this.isloading = true;
        return await agent.Glossary.queryGlossary(word)
            .then(action(response => {
                console.log(response);
                this.isloading = false;
                if (response.result) {
                    this.glossary = response.result;
                } else {
                    this.glossary = {
                        gid: -1,
                        word: word,
                        translation: '',
                        author: '',
                        remark: '',
                    }
                }
                return response;
            })); 
    }
}

export const getGlossaryStore = getOrCreateStore('glossaryStore', GlossaryStore);