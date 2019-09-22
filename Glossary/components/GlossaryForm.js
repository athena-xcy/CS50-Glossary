import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Row, Col, Button, Input, Descriptions, Card, Icon, Spin, message, Typography } from 'antd';
import moment from 'moment';
import { capitalizeWord } from '../stores/GlossaryStore';

const updateFormResponsive = {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 10 },
    lg: { span: 10 },
    xl: { span: 10 }
};

const { Title, Text } = Typography;

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
                glossaryStore.updateGlossary(glossaryStore.word, values)
                    .then(response => {
                        if (response.errno == 0) {
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
        } else if (glossaryStore.isLoading) {
            return <Spin />;
        } else if (!glossaryStore.glossary) {
            return null;
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
            } else {
                message.error('该术语还未提交');
            }
        }

        const isEditing = this.state.isEditing || glossary.gid <= 0;

        const cardUpperRightButton = isEditing ?
            <span onClick={toggleEdit} style={{ color: "#1084f5"}}><Icon type="table" />  详情</span> :
            <span onClick={toggleEdit} style={{ color: "#1084f5"}} ><Icon type="edit" />  编辑</span>;

        return (
            <Card 
            loading={this.state.loading}
            extra={cardUpperRightButton}
            title={<span>{capitalizeWord(glossary.word)} <span style={{ fontSize: '0.6em'}}>{glossary.gid > 0 ? '#' + glossary.gid : '(未添加)' }</span></span>}
            headStyle={{ fontSize: '1.6em'}}
            bordered={true}
            style={{ borderRadius: 5 }}>
                { isEditing ? (
                    <Form onSubmit={this.onSubmit}>
                        <Row type="flex" justify="space-between">
                        <Col {...updateFormResponsive}>{renderFormItem('译名', 'translation', glossary.translation, <Input/>)}</Col>
                        <Col {...updateFormResponsive}>{renderFormItem('修改人', 'author', '', <Input/>)}</Col>
                        <Col span={24} >{renderFormItem('备注', 'remark', glossary.remark, <Input/>, false)}</Col>
                        </Row>
                        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>提交修改</Button>
                    </Form>)
                :
                    (<div>
                        <Descriptions  
                        column={1}
                        bordered>
                            <Descriptions.Item label="译名">
                                <Text 
                                copyable 
                                style={{ fontSize: '1.2em', fontWeight: 500, width: '100%' }}
                                >
                                {glossary.translation}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="备注"><Text>{glossary.remark}</Text></Descriptions.Item>
                        </Descriptions>
                        <Descriptions 
                        column={{ lg: 4, md: 2, sm: 2, xs: 2}} 
                        layout='horizontal' 
                        size='small' 
                        style={{ textAlign: "center", marginTop: 20, fontSize: '0.8', fontWeight: 300 }}
                        >
                            <Descriptions.Item label="添加人">{glossary.creator}</Descriptions.Item>
                            <Descriptions.Item label="添加时间">{moment.unix(glossary.createtime).fromNow()}</Descriptions.Item>
                            <Descriptions.Item label="上次修改人">{glossary.updater}</Descriptions.Item>
                            <Descriptions.Item label="上次修改时间">{moment.unix(glossary.updatetime).fromNow()}</Descriptions.Item>
                        </Descriptions>
                    </div>)
                }
            </Card>
        );
    }
}

const WrappedGlossaryForm = Form.create({ name: 'normal_glossary' })(GlossaryForm);
export default WrappedGlossaryForm;