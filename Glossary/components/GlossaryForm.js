import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Row, Col, Button, Input, Descriptions, Card, Icon, Spin, message } from 'antd';
import moment from 'moment';

@inject('glossaryStore')
@observer
class GlossaryForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    state = {
        isEditing: false,
    }
    onSubmit = e => {
        const { glossaryStore } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                glossaryStore.updateGlossary(glossaryStore.word, values)
                    .then(response => {
                        if (response.errno == 0) {
                            console.log('Success');
                            this.setState({ isEditing: false });
                            message.success('更新成功');
                        }
                    })
            }
        });
    }

    render() {
        const { 
            glossaryStore,
            form: {getFieldDecorator} 
        } = this.props;

        if (!glossaryStore.word) {
            return null;
        } else if (!glossaryStore.glossary) {
            return <Spin />
        }

        const glossary = glossaryStore.glossary;

        const renderFormItem = (title, key, initialValue, Comp, required=true) => (
            <Form.Item label={title}>
                {getFieldDecorator(key, {
                    initialValue,
                    rules: [{ required, message: '请填写' + title }],
                })(Comp)}
            </Form.Item>
        )

        const toggleEdit = () => {
            if (glossary.gid >= 0) { 
                this.setState({ isEditing: !this.state.isEditing })
            }
        }

        console.log('Form' + glossary.updater);

        return (
            <Card 
            loading={this.state.loading}
            extra={<Icon type={ this.state.isEditing ? "table" : "edit" } onClick={toggleEdit} />}
            title={<span>{glossary.word} <span style={{ fontSize: '0.6em'}}>{glossary.gid > 0 ? '#' + glossary.gid : '(未添加)' }</span></span>}
            headStyle={{ fontSize: '1.6em'}}
            bordered={true}
            style={{ borderRadius: 5 }}>
                { this.state.isEditing || glossary.gid <= 0 ? (
                    <Form onSubmit={this.onSubmit}>
                        <Row type="flex" justify="space-between">
                        <Col span={10}>{renderFormItem('译名', 'translation', glossary.translation, <Input/>)}</Col>
                        <Col span={10}>{renderFormItem('修改人', 'author', '', <Input/>)}</Col>
                        <Col span={24}>{renderFormItem('备注', 'remark', glossary.remark, <Input/>, false)}</Col>
                        </Row>
                        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>提交修改</Button>
                    </Form>)
                :
                    (<Descriptions  
                    column={{ md: 2, sm: 1, xs: 1}}
                    bordered>
                        <Descriptions.Item span={2} label="译名">{glossary.translation}</Descriptions.Item>
                        <Descriptions.Item label="添加人">{glossary.creator}</Descriptions.Item>
                        <Descriptions.Item label="添加时间">{moment.unix(glossary.createtime).fromNow()}</Descriptions.Item>
                        <Descriptions.Item label="修改人">{glossary.updater}</Descriptions.Item>
                        <Descriptions.Item label="修改时间">{moment.unix(glossary.updatetime).fromNow()}</Descriptions.Item>
                        <Descriptions.Item span={2} label="备注">{glossary.remark}</Descriptions.Item>
                    </Descriptions>)
                }
            </Card>
        );
    }
}

const WrappedGlossaryForm = Form.create({ name: 'normal_glossary' })(GlossaryForm);
export default WrappedGlossaryForm;