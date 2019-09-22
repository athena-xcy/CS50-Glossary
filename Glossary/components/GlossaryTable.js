import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table } from 'antd';
import _ from 'lodash';

const columns = [
    {title: '单词', dataIndex: 'word'},
    {title: '译名', dataIndex: 'translation'},
    {title: '添加人', dataIndex: 'creator'},
    {title: '添加时间', dataIndex: 'createtime'},
    {title: '修改人', dataIndex: 'updater'},
    {title: '修改时间', dataIndex: 'updatetime'},
];

@inject('glossaryStore')
@observer
export default class GlossaryTable extends Component {
    constructor(props) {
        super(props);
        this.handleListChange = this.handleListChange.bind(this);
    }
    componentDidMount() {
        console.log(this.props)
        const { glossaryStore } = this.props;
        if (_.isEmpty(glossaryStore.paginatedGlossaries)) {
            glossaryStore.getPaginatedGlossaries();
        }
    }
    handleListChange(page) {
        const { glossaryStore } = this.props;
        glossaryStore.setCurrentPage(page);
        glossaryStore.getPaginatedGlossaries();
    }
    render() {
        const { glossaryStore } = this.props;
        return (
            <Table 
            columns={columns} 
            loading={_.isEmpty(glossaryStore.paginatedGlossaries) || glossaryStore.isloading}
            dataSource={glossaryStore.paginatedGlossaries}
            pagination={{ onChange: this.handleListChange, ...glossaryStore.pagination }}
            />
        )
    }
}