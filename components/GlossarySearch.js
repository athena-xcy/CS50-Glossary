import React, { Component } from 'react';
import { Input, AutoComplete, message } from 'antd';
import _ from 'lodash';
import { inject, observer } from 'mobx-react';
import { capitalizeWord } from '../stores/GlossaryStore'

const { Search } = Input;
const { Option } = AutoComplete;

@inject('glossaryStore')
@observer
export default class GlossarySearch extends Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.inputChange = this.inputChange.bind(this);
    };

    state = {
        dataSource: [],
    };

    componentDidMount() {
        const { glossaryStore } = this.props;
        if (_.isEmpty(glossaryStore.allGlossaries)) {
            glossaryStore.getAllGlossaries();
        }
    }

    inputChange = value => {
        const len = value.length;
        const { glossaryStore } = this.props;
        const glossaries = glossaryStore.allGlossaries;
        this.setState({
            dataSource: !value ? [] : _.filter(_.keys(glossaries), key => key.slice(0, len).toLowerCase() === value.toLowerCase())
        });
    };

    onSearch = (value, event) => {
        // 回车，先触发onSearch，后触发补全
        if (event.type == 'keydown' || !value) {
            return;
        }
        const { glossaryStore } = this.props;
        glossaryStore.setWord(value).then(response => {
            if (!response.result) {
                message.info('该术语不存在，请添加');
            }
        })
    }

    render() {
        const { glossaryStore } = this.props;
        const { dataSource } = this.state;
        const glossaries = glossaryStore.allGlossaries;
        
        const renderOption = (word) => (
            <Option key={word}  value={word}>
                {capitalizeWord(word)}
                <span style={{ position: 'absolute', right: 16}}>{glossaries[word]}</span>
            </Option>
        );

        return (
            <AutoComplete
            size="large"
            dataSource={dataSource.map(renderOption)}
            onSearch={this.inputChange}
            style={{ width: '100%'}}
            optionLabelProp="value"
            >
                <Search 
                placeholder="查找术语表" 
                size="large"
                enterButton="搜索 / 新增"
                onSearch={this.onSearch}
                />
            </AutoComplete>
        );
    }
}